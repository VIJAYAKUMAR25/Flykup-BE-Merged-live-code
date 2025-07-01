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
    const ip = req.headers['x-client-ip'] || 
             req.headers['x-forwarded-for']?.split(',').shift() || 
             req.socket.remoteAddress;

    // --- MODIFICATION: Determine the platform from headers ---
    const platformHeader = req.headers['x-client-platform'] || 'unknown'; // e.g., 'web', 'ios', 'android'
    const platform = (platformHeader === 'web') ? 'web' : (platformHeader === 'ios' || platformHeader === 'android' ? 'mobile' : 'unknown');

    const lockKey = userId ? `${userId}-${productId}` : `${ip}-${productId}`;

    if (viewLocks.has(lockKey)) {
        return res.status(202).json({
            status: 'processing',
            message: 'View tracking in progress'
        });
    }

    try {
        viewLocks.set(lockKey, true);

        const product = await Product.findById(productId).select('sellerId');
        if (!product) {
            viewLocks.delete(lockKey);
            return res.status(404).json({ message: 'Product not found' });
        }

        if (userId) {
            const existingView = await ProductInteraction.findOne({
                product: productId,
                user: userId,
            });

            if (existingView) {
                viewLocks.delete(lockKey);
                return res.status(200).json({ success: true, message: 'View already tracked for this user' });
            }
        }

        const location = await getLocationFromIP(ip);
        const { device, browser, os } = parseUserAgent(req.headers['user-agent']);
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await ProductInteraction.create([{
                product: productId,
                user: userId,
                seller: product.sellerId,
                location: location,
                // --- MODIFICATION: Save the determined platform ---
                platform: platform,
                device,
                browser,
                os,
                ip: ip,
            }], { session });

            const update = { $inc: { viewCount: 1, uniqueViewCount: 1 } };
            
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
        const { sellerId } = req.params;
        const { productId, period = '30d' } = req.query;

        const dateFilter = {};
        if (period === '7d') {
            dateFilter.$gte = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);
        } else if (period === '30d') {
            dateFilter.$gte = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
        }

        const matchQuery = { seller: new mongoose.Types.ObjectId(sellerId) };
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
                    ],
                    "uniqueViewers": [
                        { $group: { _id: "$user", lastViewed: { $max: "$createdAt" }, locations: { $addToSet: "$location" } } },
                        { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userDetails" } },
                        { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
                        { $project: {
                            userId: "$_id",
                            name: { $ifNull: ["$userDetails.name", "Anonymous"] },
                            lastViewed: 1,
                            locations: 1,
                            _id: 0
                        }},
                        { $sort: { lastViewed: -1 } }
                    ],
                    // INDIAN-SPECIFIC ANALYTICS
                    "indianViewsByRegion": [
                        { $match: { isIndianRegion: true } },
                        { $group: { 
                            _id: "$location.region", 
                            count: { $sum: 1 } 
                        }},
                        { $sort: { count: -1 } }
                    ],
                    "indianDeviceBreakdown": [
                        { $match: { isIndianRegion: true } },
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


// Add this new controller
export const getProductAnalytics = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        const product = await Product.findById(productId).select('title images');
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0));
        const yesterdayStart = new Date(new Date().setDate(todayStart.getDate() - 1));
        const last7DaysStart = new Date(new Date().setDate(todayStart.getDate() - 7));
        const last30DaysStart = new Date(new Date().setDate(todayStart.getDate() - 30));
        const last365DaysStart = new Date(new Date().setDate(todayStart.getDate() - 365));

        const analytics = await ProductInteraction.aggregate([
            {
                $match: {
                    product: new mongoose.Types.ObjectId(productId),
                }
            },
            {
                $facet: {
                    // --- Time-based View Counts ---
                    timeSeriesViews: [
                        { $match: { createdAt: { $gte: last365DaysStart } } },
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                                views: { $sum: 1 }
                            }
                        },
                        { $sort: { _id: 1 } },
                        { $project: { date: "$_id", views: 1, _id: 0 } }
                    ],
                    // --- Summary Stat Cards ---
                    summaryStats: [
                        {
                            $group: {
                                _id: null,
                                today: { $sum: { $cond: [{ $gte: ["$createdAt", todayStart] }, 1, 0] } },
                                yesterday: { $sum: { $cond: [{ $and: [{ $gte: ["$createdAt", yesterdayStart] }, { $lt: ["$createdAt", todayStart] }] }, 1, 0] } },
                                last7Days: { $sum: { $cond: [{ $gte: ["$createdAt", last7DaysStart] }, 1, 0] } },
                                last30Days: { $sum: { $cond: [{ $gte: ["$createdAt", last30DaysStart] }, 1, 0] } },
                                last365Days: { $sum: { $cond: [{ $gte: ["$createdAt", last365DaysStart] }, 1, 0] } },
                                totalViews: { $sum: 1 },
                                totalUniqueViewers: { $addToSet: "$user" } // Use user ID for logged-in users
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                today: 1,
                                yesterday: 1,
                                last7Days: 1,
                                last30Days: 1,
                                last365Days: 1,
                                totalViews: 1,
                                totalUniqueViewers: { $size: "$totalUniqueViewers" }
                            }
                        }
                    ],
                    // --- Location Breakdowns (Top 10) ---
                    topCountries: [
                        { $match: { "location.country": { $ne: null, $ne: "Unknown" } } },
                        { $group: { _id: "$location.country", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        { $project: { name: "$_id", count: 1, _id: 0 } }
                    ],
                    topStates: [
                        { $match: { "location.region": { $ne: null, $ne: "Unknown" } } },
                        { $group: { _id: "$location.region", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        { $project: { name: "$_id", count: 1, _id: 0 } }
                    ],
                    topCities: [
                        { $match: { "location.city": { $ne: null, $ne: "Unknown" } } },
                        { $group: { _id: "$location.city", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 },
                        { $project: { name: "$_id", count: 1, _id: 0 } }
                    ],
                     byPlatform: [
                        { $group: { _id: { $ifNull: ["$platform", "Unknown"] }, count: { $sum: 1 } } },
                        { $project: { name: "$_id", count: 1, _id: 0 } }
                    ],
                    // --- Device Breakdowns ---
                    byDevice: [
                        { $group: { _id: { $ifNull: ["$device", "Unknown"] }, count: { $sum: 1 } } },
                        { $project: { name: "$_id", count: 1, _id: 0 } }
                    ],
                    byOs: [
                        { $group: { _id: { $ifNull: ["$os", "Unknown"] }, count: { $sum: 1 } } },
                        { $project: { name: "$_id", count: 1, _id: 0 } }
                    ],
                    byBrowser: [
                        { $group: { _id: { $ifNull: ["$browser", "Unknown"] }, count: { $sum: 1 } } },
                         { $project: { name: "$_id", count: 1, _id: 0 } }
                    ]
                }
            }
        ]);

        // Format the result into a cleaner object
        const result = {
           product: {
                productName: product.title, 
                // Assuming the first image is the primary one
                imageKey: product.images?.[0]?.key || null, 
            },
            summary: analytics[0].summaryStats[0] || { today: 0, yesterday: 0, last7Days: 0, last30Days: 0, last365Days: 0, totalViews: 0, totalUniqueViewers: 0 },
            timeSeries: analytics[0].timeSeriesViews,
            locations: {
                countries: analytics[0].topCountries,
                states: analytics[0].topStates,
                cities: analytics[0].topCities,
            },
            devices: {
                deviceTypes: analytics[0].byDevice,
                operatingSystems: analytics[0].byOs,
                browsers: analytics[0].byBrowser,
            },
        };

        // Calculate percentage change for today's views vs yesterday
        const todayCount = result.summary.today;
        const yesterdayCount = result.summary.yesterday;
        if (yesterdayCount > 0) {
            result.summary.todayVsYesterdayChange = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
        } else if (todayCount > 0) {
            result.summary.todayVsYesterdayChange = 100; // Infinite growth if yesterday was 0
        } else {
            result.summary.todayVsYesterdayChange = 0;
        }


        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching comprehensive product analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analytics',
            error: error.message
        });
    }
};

export const getProductViewers = async (req, res) => {
    try {
        const { productId } = req.params;
        const { page = 1, limit = 15, search = '' } = req.query;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        // Base match for the product
        const matchStage = {
            product: new mongoose.Types.ObjectId(productId),
            user: { $exists: true, $ne: null } // Only include interactions from logged-in users
        };

        // Aggregation to find unique users and their latest view
        const aggregationPipeline = [
          
            { $match: matchStage },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: "$user",
                    lastViewed: { $first: "$createdAt" },
                    viewCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" },
        ];
        
        // Add search stage if a search query is provided
        if (search) {
             aggregationPipeline.push({
                $match: {
                    "userDetails.userName": { $regex: search, $options: 'i' }
                }
            });
        }
        
        // Final project, sort, and pagination stages
        aggregationPipeline.push(
            {
                $project: {
                    _id: 0,
                    userId: "$userDetails._id",
                    userName: "$userDetails.userName",
                    name: "$userDetails.name",
                    profileURL: "$userDetails.profileURL",
                    role: "$userDetails.role", // Add role field
                    lastViewed: 1,
                    viewCount: 1
                }
            },
            { $sort: { lastViewed: -1 } },
            {
                $facet: {
                    viewers: [
                        { $skip: skip },
                        { $limit: limitNum }
                    ],
                    totalCount: [
                        { $count: 'count' }
                    ]
                }
            }
        );

        const result = await ProductInteraction.aggregate(aggregationPipeline);
        
       // Handle case where result is empty
        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    viewers: [],
                    pagination: {
                        page: pageNum,
                        limit: limitNum,
                        total: 0,
                        hasNextPage: false
                    }
                }
            });
        }
        
        const viewers = result[0].viewers || [];
        const totalCount = result[0].totalCount[0]?.count || 0;
        
        // Calculate hasNextPage correctly
        const hasNextPage = (skip + viewers.length) < totalCount;
        
        res.status(200).json({
            success: true,
            data: {
                viewers,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total: totalCount,
                    hasNextPage
                }
            }
        });


    } catch (error) {
        console.error('Error fetching product viewers:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product viewers',
            error: error.message
        });
    }
};