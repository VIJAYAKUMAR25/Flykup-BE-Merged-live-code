import ProductInteraction from '../models/ProductInteraction.model.js';
import Product from '../models/productListing.model.js';
import { parseUserAgent, getLocationFromIP } from '../utils/deviceUtils.js';
import mongoose from 'mongoose';
// Track a product view
// controllers/productInteraction.controller.js
const viewLocks = new Map();

export const trackProductView = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user?._id;
    const ip = req.clientIp;
    const lockKey = userId ? `${userId}-${productId}` : `${req.clientIp}-${productId}`;
    
    if (viewLocks.has(lockKey)) {
        return res.status(202).json({ 
            status: 'processing', 
            message: 'View tracking in progress' 
        });
    }

    try {
        viewLocks.set(lockKey, true);
        console.log(`[Tracker] Client IP: ${req.clientIp}`);
        
        // Only declare product once here
        const product = await Product.findById(productId).select('sellerId');
        if (!product) {
            viewLocks.delete(lockKey);
            return res.status(404).json({ message: 'Product not found' });
        }

        // Get location and device info
        const location = getLocationFromIP(ip) || { 
            city: 'Unknown', 
            region: 'Unknown', 
            country: 'Unknown' 
        };
        const { device, browser, os } = parseUserAgent(req.headers['user-agent']);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Create new interaction
            await ProductInteraction.create([{
                product: productId,
                user: userId,
                seller: product.sellerId,
                type: 'view',
                location,
                device,
                browser,
                os
            }], { session });

            // Update product counters
            const update = { $inc: { viewCount: 1 } };
            if (userId) update.$inc.uniqueViewCount = 1;
            
            await Product.findByIdAndUpdate(
                productId, 
                update,
                { session, new: true }
            );

            await session.commitTransaction();
            session.endSession();
            
            return res.status(201).json({ success: true });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        console.error('Error tracking view:', error);
        return res.status(500).json({
            message: 'Failed to track view',
            error: error.message
        });
    } finally {
        viewLocks.delete(lockKey);
    }
};

// Submit a product review
export const submitProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    // Get product
    const product = await Product.findById(productId).select('sellerId');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check for existing review
    const existingReview = await ProductInteraction.findOne({
      product: productId,
      user: userId,
      type: 'review'
    });

    if (existingReview) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already reviewed this product' 
      });
    }

    // Create review
    const newReview = await ProductInteraction.create({
      product: productId,
      user: userId,
      seller: product.sellerId,
      type: 'review',
      rating,
      review
    });

    // Update product review stats
    const [result] = await Promise.all([
      ProductInteraction.aggregate([
        { $match: { product: productId, type: 'review' } },
        { $group: {
            _id: null,
            averageRating: { $avg: '$rating' },
            reviewCount: { $sum: 1 }
        }}
      ]),
      Product.findByIdAndUpdate(productId, {
        $inc: { reviewCount: 1 }
      })
    ]);

    const { averageRating, reviewCount } = result[0] || {
      averageRating: rating,
      reviewCount: 1
    };

    await Product.findByIdAndUpdate(productId, {
      averageRating: parseFloat(averageRating.toFixed(1)),
      reviewCount
    });

    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit review',
      error: error.message 
    });
  }
};

// Get analytics data
export const getAnalyticsData = async (req, res) => {
  try {
    const { productId } = req.params;
    const now = new Date();
    const last7Days = new Date(now.setDate(now.getDate() - 7));
    const last30Days = new Date(now.setDate(now.getDate() - 23)); // 7 + 23 = 30

    const [dailyData, viewerStats, reviews] = await Promise.all([
      // Daily views and reviews
      ProductInteraction.aggregate([
        { $match: { 
          product: new mongoose.Types.ObjectId(productId),
          createdAt: { $gte: last30Days } 
        }},
        { $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          views: { 
            $sum: { $cond: [{ $eq: ["$type", "view"] }, 1, 0] } 
          },
          reviews: { 
            $sum: { $cond: [{ $eq: ["$type", "review"] }, 1, 0] } 
          }
        }},
        { $sort: { _id: 1 } },
        { $project: {
          date: "$_id",
          views: 1,
          reviews: 1,
          _id: 0
        }}
      ]),
      
      // Viewer statistics
      ProductInteraction.aggregate([
        { $match: { product: new mongoose.Types.ObjectId(productId), type: 'view' } },
        { $facet: {
          last7Days: [
            { $match: { createdAt: { $gte: last7Days } } },
            { $count: 'count' }
          ],
          last30Days: [
            { $match: { createdAt: { $gte: last30Days } } },
            { $count: 'count' }
          ],
          topViewers: [
            { $group: { 
              _id: "$user", 
              count: { $sum: 1 },
              lastView: { $max: "$createdAt" }
            }},
            { $sort: { count: -1 } },
            { $limit: 10 },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "userDetails"
              }
            },
            { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
            {
              $project: {
                userId: "$_id",
                name: { $ifNull: ["$userDetails.name", "Anonymous"] },
                avatar: "$userDetails.avatar",
                viewCount: "$count",
                lastView: 1
              }
            }
          ],
          deviceBreakdown: [
            { $group: {
              _id: "$device",
              count: { $sum: 1 }
            }},
            { $project: {
              device: { $ifNull: ["$_id", "unknown"] },
              count: 1,
              _id: 0
            }}
          ]
        }}
      ]),
      
      // Recent reviews
      ProductInteraction.find({ 
        product: productId, 
        type: 'review' 
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name avatar')
    ]);

    // Format results
    const result = {
      dailyData,
      last7Days: viewerStats[0].last7Days[0]?.count || 0,
      last30Days: viewerStats[0].last30Days[0]?.count || 0,
      topViewers: viewerStats[0].topViewers,
      deviceBreakdown: viewerStats[0].deviceBreakdown,
      recentReviews: reviews
    };

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message
    });
  }
};

// Get paginated interactions
export const getSellerProductAnalytics = async (req, res) => {
    try {
        const { sellerId } = req.params; // Assuming you'll have a route like '/api/seller/:sellerId/analytics'
        const { productId, period = '30d' } = req.query;

        const dateFilter = {};
        if (period === '7d') {
            dateFilter.$gte = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);
        } else if (period === '30d') {
            dateFilter.$gte = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
        }

        const matchQuery = { seller: new mongoose.Types.ObjectId(sellerId), type: 'view' };
        if(productId) {
            matchQuery.product = new mongoose.Types.ObjectId(productId);
        }
        if (Object.keys(dateFilter).length > 0) {
            matchQuery.createdAt = dateFilter;
        }

        const analytics = await ProductInteraction.aggregate([
            { $match: matchQuery },
            {
                $facet: {
                    "viewsByCountry": [
                        { $group: { _id: "$location.country", count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ],
                    "viewsByState": [
                        { $match: { "location.region": { $ne: "Unknown" } } },
                        { $group: { _id: "$location.region", count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ],
                    "viewsByCity": [
                        { $match: { "location.city": { $ne: "Unknown" } } },
                        { $group: { _id: "$location.city", count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ],
                    "viewsByDevice": [
                        { $group: { _id: "$device", count: { $sum: 1 } } },
                        { $sort: { count: -1 } }
                    ]
                }
            }
        ]);

        res.status(200).json({ success: true, data: analytics[0] });

    } catch (error) {
        console.error('Error fetching seller analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analytics',
            error: error.message
        });
    }
};