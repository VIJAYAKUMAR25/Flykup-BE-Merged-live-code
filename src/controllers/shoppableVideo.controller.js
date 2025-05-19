import ShoppableVideo from "../models/shoppableVideo.model.js";
import { PRODUCT_PUBLIC_FIELDS } from "../utils/constants.js";
import ProductListing from "../models/productListing.model.js"; // Import ProductListing model
import Seller from "../models/seller.model.js";             // Import Seller model
import Dropshipper from "../models/shipper.model.js";       // Import Dropshipper model
import User from "../models/user.model.js";               // Import User model
import mongoose from "mongoose";

// --- Helper Function for Product Validation (Adapt or reuse from Shows controller) ---
// This helper checks if the host (Seller/Dropshipper) can list the given product IDs
async function validateVideoProducts(productIds = [], host, hostModel) {
    if (!productIds || productIds.length === 0) {
        return { valid: true, validatedProductIds: [] };
    }

    const validatedProductIds = [];
    const errors = [];

    // Fetch product details including sellerId and allowDropshipping flag
    const products = await ProductListing.find({
        '_id': { $in: productIds },
        'isActive': true // Only consider active products
    }).select('sellerId allowDropshipping');

    const productMap = new Map(products.map(p => [p._id.toString(), p]));

    for (const productIdStr of productIds) {
        if (!mongoose.Types.ObjectId.isValid(productIdStr)) {
            errors.push(`Invalid Product ID format: ${productIdStr}`);
            continue;
        }

        const product = productMap.get(productIdStr);

        if (!product) {
            // Product not found or is inactive
            errors.push(`Product not found or inactive: ${productIdStr}`);
            continue;
        }

        let isValidProduct = false;

        if (hostModel === 'sellers') {
            // Seller can only list their own products
            if (product.sellerId.equals(host._id)) {
                isValidProduct = true;
            } else {
                errors.push(`Seller cannot list product ${productIdStr} owned by another seller.`);
            }
        } else if (hostModel === 'dropshippers') {
            // Dropshipper can list products from approved sellers if allowDropshipping is true
            // Ensure host.approvedSellerIds was populated/prepared in middleware or fetched here
            const isConnected = host.approvedSellerIds && host.approvedSellerIds.some(id => id.equals(product.sellerId));
            if (isConnected && product.allowDropshipping) {
                isValidProduct = true;
            } else if (isConnected && !product.allowDropshipping) {
                errors.push(`Product ${productIdStr} is from a connected seller but does not allow dropshipping.`);
            }
            else {
                errors.push(`Dropshipper cannot list product ${productIdStr}. Not connected/approved with seller ${product.sellerId} or product unavailable.`);
            }
        }

        if (isValidProduct) {
            validatedProductIds.push(new mongoose.Types.ObjectId(productIdStr)); // Add valid ObjectId
        }
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }
    return { valid: true, validatedProductIds };
}
// --- End Helper Function ---

// Create Shoppable Video (Uses canHostShow middleware)
export const createShoppableVideo = async (req, res) => {
    // Use req.showHost and req.showHostModel from canHostShow middleware
    const { showHost, showHostModel } = req;
    const hostId = showHost._id;
    const data = req.body;
    const { productsListed = [], ...otherData } = data; // Separate products for validation

    try {
        // --- Add Product Validation ---
        const productValidation = await validateVideoProducts(productsListed, showHost, showHostModel);
        if (!productValidation.valid) {
            return res.status(400).json({
                status: false,
                message: "Invalid products listed for this host.",
                errors: productValidation.errors
            });
        }
        // --- End Product Validation ---

        const videoData = {
            ...otherData, // Title, description, urls etc.
            host: hostId,
            hostModel: showHostModel,
            productsListed: productValidation.validatedProductIds // Use validated IDs
        };

        const newShoppableVideo = new ShoppableVideo(videoData);
        const savedVideo = await newShoppableVideo.save();

        // Populate necessary fields before sending response
        const populatedVideo = await ShoppableVideo.findById(savedVideo._id)
            .populate("productsListed", PRODUCT_PUBLIC_FIELDS) // Populate products
            .populate({ // Populate Host Info
                path: 'host',
                select: 'companyName businessName userInfo',
                populate: { path: 'userInfo', select: 'name userName profileURL' }
            });

        res.status(201).json({
            status: true,
            message: "Shoppable video created successfully!",
            data: populatedVideo
        });
    } catch (error) {
        console.error("Error in createShoppableVideo:", error);
        if (error.name === 'ValidationError') { // Handle Mongoose validation errors
            return res.status(400).json({ status: false, message: error.message, errors: error.errors });
        }
        res.status(500).json({
            status: false,
            message: "Internal server error."
        });
    }
};

// Update Shoppable Video (Uses isVideoHost middleware)
export const updateShoppableVideo = async (req, res) => {
    const { id: videoId } = req.params;
    const updatedData = req.body;
    const { productsListed, ...otherUpdates } = updatedData; // Separate products if they can be updated

    // User info from protect middleware (needed if re-validating products)
    const user = req.user;

    try {

        // If productsListed is part of the update, validate them again
        if (productsListed !== undefined) {
            // Need to fetch host details again for validation
            // This could be optimized if isVideoHost attached the host document to req
            const video = await ShoppableVideo.findById(videoId).select('host hostModel');
            if (!video) throw new Error("Video not found during host fetch for update."); // Should not happen after middleware

            let host;
            if (video.hostModel === 'sellers') {
                host = await Seller.findById(video.host);
            } else if (video.hostModel === 'dropshippers') {
                host = await Dropshipper.findById(video.host).populate({ path: 'connectedSellers', match: { status: 'approved' }, select: 'sellerId -_id' });
                if (host) {
                    const approvedConnections = host.connectedSellers || [];
                    host.approvedSellerIds = approvedConnections.map(conn => conn.sellerId);
                }
            }
            if (!host) throw new Error("Host not found for product validation.");

            const productValidation = await validateVideoProducts(productsListed, host, video.hostModel);
            if (!productValidation.valid) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid products listed for update.",
                    errors: productValidation.errors
                });
            }
            // Use validated product IDs for the update payload
            otherUpdates.productsListed = productValidation.validatedProductIds;
        }

        // Perform the update
        const updatedVideo = await ShoppableVideo.findByIdAndUpdate(
            videoId,
            { $set: otherUpdates }, // Use $set for safer updates
            { new: true, runValidators: true }
        )
            .populate("productsListed", PRODUCT_PUBLIC_FIELDS)
            .populate({
                path: 'host',
                select: 'companyName businessName userInfo',
                populate: { path: 'userInfo', select: 'name userName profileURL' }
            });

        if (!updatedVideo) {
            return res.status(404).json({
                status: false,
                message: "Shoppable video not found."
            });
        }

        res.status(200).json({
            status: true,
            message: "Shoppable video updated successfully!",
            data: updatedVideo
        });
    } catch (error) {
        console.error("Error in updateShoppableVideo:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ status: false, message: error.message, errors: error.errors });
        }
        res.status(500).json({
            status: false,
            message: error.message || "Internal server error."
        });
    }
};

// Get Shoppable Video By ID (Uses protect or public)
export const getShoppableVideoById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: false, message: "Invalid Video ID format." });
    }

    try {
        const video = await ShoppableVideo.findById(id)
            .populate("productsListed", PRODUCT_PUBLIC_FIELDS) // Populate products
            // --- UPDATED Host Population ---
            .populate({
                path: "host",
                select: "companyName businessName userInfo approvalStatus", // Select relevant host fields
                populate: {
                    path: 'userInfo',
                    select: 'userName name profileURL' // Select desired user fields
                }
            });
        // --- END Host Population ---

        if (!video) {
            return res.status(404).json({
                status: false,
                message: "Shoppable video not found."
            });
        }

        res.status(200).json({
            status: true,
            message: "Shoppable video fetched successfully!", // Added message
            data: video
        });
    } catch (error) {
        console.error("Error in getShoppableVideoById:", error);
        res.status(500).json({
            status: false,
            message: "Internal server error."
        });
    }
};



// --- NEW FUNCTION: Get MY Hosted Shoppable Videos ---
// Uses 'protect' middleware
export const getMyHostedShoppableVideos = async (req, res) => {
    const user = req.user; // From 'protect' middleware

    if (!user) {
        return res.status(401).json({ status: false, message: "Unauthorized." });
    }

    let hostId = null;
    let hostModel = null;

    if (user.role === 'seller' && user.sellerInfo) {
        hostId = user.sellerInfo;
        hostModel = 'sellers';
    } else if (user.role === 'dropshipper' && user.dropshipperInfo) {
        hostId = user.dropshipperInfo;
        hostModel = 'dropshippers';
    }

    if (!hostId || !hostModel) {
        return res.status(200).json({
            status: true,
            message: "No applicable Seller or Dropshipper profile found for this user.",
            data: []
        });
    }

    try {
        const videos = await ShoppableVideo.find({ host: hostId, hostModel: hostModel })
            .populate("productsListed", PRODUCT_PUBLIC_FIELDS)
            // Optionally populate host again if needed in the list view
            // .populate({
            //     path: 'host',
            //     select: 'companyName businessName',
            //     populate: { path: 'userInfo', select: 'name userName' }
            // })
            .sort({ createdAt: -1 })
            .lean(); // Use lean for performance

        res.status(200).json({
            status: true,
            message: "Your shoppable videos fetched successfully!",
            data: videos || []
        });
    } catch (error) {
        console.error("Error in getMyHostedShoppableVideos:", error);
        res.status(500).json({
            status: false,
            message: "Internal server error."
        });
    }
};


// Get All Shoppable Videos (Uses protect or public)
export const getAllShoppableVideos = async (req, res) => {
    try {
        const videos = await ShoppableVideo.find({  }) // Added isActive filter isActive: true
            .populate("productsListed", PRODUCT_PUBLIC_FIELDS)
            // --- UPDATED Host Population ---
            .populate({
                path: "host",
                select: "companyName businessName", // Select minimal details needed for public list
                populate: {
                    path: 'userInfo',
                    select: 'name userName profileURL'
                }
            })
            // --- END Host Population ---
            .sort({ createdAt: -1 })
            .lean();

        // No need to check !videos.length, find returns [] if empty
        res.status(200).json({
            status: true,
            message: "All shoppable videos fetched successfully!",
            data: videos || [] // Ensure it's always an array
        });
    } catch (error) {
        console.error("Error in getAllShoppableVideos:", error);
        res.status(500).json({
            status: false,
            message: "Internal server error."
        });
    }
};

// Delete Shoppable Video (Uses isVideoHost middleware)
export const deleteShoppableVideo = async (req, res) => {
    const { id } = req.params;
    // Authorization is now handled by isVideoHost middleware

    try {
        // Find and delete the video
        const deletedVideo = await ShoppableVideo.findByIdAndDelete(id);

        if (!deletedVideo) {
            // Middleware should catch this, but handle just in case
            return res.status(404).json({
                status: false,
                message: "Shoppable video not found or already deleted."
            });
        }

        // TODO: Optionally delete associated video/thumbnail files from storage (S3, etc.) here

        res.status(200).json({
            status: true,
            message: "Shoppable video deleted successfully!"
        });
    } catch (error) {
        console.error("Error in deleteShoppableVideo:", error);
        res.status(500).json({
            status: false,
            message: "Internal server error."
        });
    }
};


export const updateVideoVisibility = async (req, res) => {
    const { id: videoId } = req.params;
    const { visibility } = req.body;

    // Validate visibility input
    if (!['public', 'private'].includes(visibility)) {
        return res.status(400).json({
            status: false,
            message: "Visibility must be 'public' or 'private'."
        });
    }

    try {
        const updatedVideo = await ShoppableVideo.findByIdAndUpdate(
            videoId,
            { visibility },
            { new: true, runValidators: true }
        )
            .populate("productsListed", PRODUCT_PUBLIC_FIELDS)
            .populate({
                path: 'host',
                select: 'companyName businessName userInfo',
                populate: { path: 'userInfo', select: 'name userName profileURL' }
            });

        if (!updatedVideo) {
            return res.status(404).json({ status: false, message: "Video not found." });
        }

        res.status(200).json({
            status: true,
            message: "Video visibility updated successfully!",
            data: updatedVideo
        });
    } catch (error) {
        console.error("Error in updateVideoVisibility:", error);
        res.status(500).json({
            status: false,
            message: error.message || "Internal server error."
        });
    }
};



// UPLOADING STATUS GETTING IN SOCKET

export const getShoppableVideoDetailsForStatus = async (videoId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return { error: 'Invalid video ID format', status: 400, data: null };
    }
    const video = await ShoppableVideo.findById(videoId)
      .select('title processingStatus visibility host hostModel hlsMasterPlaylistUrl processingError createdAt updatedAt'); // Add any other fields client needs

    if (!video) {
      return { error: 'Shoppable video not found', status: 404, data: null };
    }
    return { error: null, status: 200, data: video.toObject() }; // Use .toObject() for plain JS object
  } catch (error) {
    console.error(`Error fetching shoppable video details for status (ID: ${videoId}):`, error);
    return { error: 'Internal server error while fetching video status', status: 500, data: null };
  }
};


export const updateVideoProcessingDetails = async (req, res) => {
    const { id } = req.params; 
    const {
        processingStatus,
        renditions,
        masterHlsUrl, // This is the new field from your processing service
        videoThumbnail, // This is the new field for thumbnail from processing
        hlsMasterPlaylistUrl, // Optional: if your service also sends this explicitly
        thumbnailURL,         // Optional: if your service also sends this for the main thumbnail
        processedFileSize,
        durationSeconds,
        processingError
    } = req.body;

    // IMPORTANT: Add Authentication/Authorization for this endpoint
    // For example, check a shared secret in headers:
    // const sharedSecret = req.headers['x-processing-secret'];
    // if (sharedSecret !== process.env.VIDEO_PROCESSING_SECRET) {
    //   return res.status(401).json({ status: false, message: "Unauthorized" });
    // }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: false, message: "Invalid video ID format." });
    }

    try {
        const video = await ShoppableVideo.findById(id);
        if (!video) {
            return res.status(404).json({ status: false, message: "Shoppable video not found." });
        }

        const updateData = {};

        if (processingStatus) updateData.processingStatus = processingStatus;
        if (renditions) updateData.renditions = renditions;
        if (masterHlsUrl) updateData.masterHlsUrl = masterHlsUrl; 
        if (videoThumbnail) updateData.videoThumbnail = videoThumbnail; 

        // Optional: Decide if these new fields should also update existing fields
        // For example, if masterHlsUrl from processing is the definitive HLS master playlist
        if (masterHlsUrl) updateData.hlsMasterPlaylistUrl = masterHlsUrl;
        // If videoThumbnail from processing is the definitive thumbnail
        if (videoThumbnail) updateData.thumbnailURL = videoThumbnail;


        if (hlsMasterPlaylistUrl) updateData.hlsMasterPlaylistUrl = hlsMasterPlaylistUrl; // If sent explicitly
        if (thumbnailURL) updateData.thumbnailURL = thumbnailURL; // If sent explicitly

        if (processedFileSize !== undefined) updateData.processedFileSize = processedFileSize;
        if (durationSeconds !== undefined) updateData.durationSeconds = durationSeconds;
        if (processingError) updateData.processingError = processingError;
        else if (processingStatus === "failed") { // If status is failed but no specific error, clear previous
            updateData.processingError = updateData.processingError || "Processing failed without specific error message.";
        } else { // If successful, clear any previous error
            updateData.processingError = null;
        }


        // If processing is successful ('published' or your equivalent success state),
        // ensure no lingering error message.
        if (processingStatus === "published" || processingStatus === "transcoding_complete") {
            updateData.processingError = null;
        }


        const updatedVideo = await ShoppableVideo.findByIdAndUpdate(id, { $set: updateData }, { new: true })
            .populate("productsListed", PRODUCT_PUBLIC_FIELDS)
            .populate({
                path: 'host',
                select: 'companyName businessName userInfo',
                populate: { path: 'userInfo', select: 'name userName profileURL' }
            });

        if (!updatedVideo) { // Should not happen if findById worked, but good practice
            return res.status(404).json({ status: false, message: "Shoppable video not found after update attempt." });
        }

        res.status(200).json({
            status: true,
            message: "Shoppable video processing details updated successfully.",
            data: updatedVideo
        });

    } catch (error) {
        console.error("Error in updateVideoProcessingDetails:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ status: false, message: error.message, errors: error.errors });
        }
        res.status(500).json({
            status: false,
            message: "Internal server error while updating video processing details."
        });
    }
};



// export const getShoppableVideosBySeller = async (req, res) => {
//     let sellerId;

//     if (req.seller) {
//         sellerId = req.seller._id;
//     }
//     else if (req.params.sellerId) {
//         sellerId = req.params.sellerId;
//     }
//     else {
//         return res.status(400).json({
//             status: false,
//             message: "Seller ID is required.",
//         });
//     }

//     try {
//         const videos = await ShoppableVideo.find({ sellerId })
//             .populate("productsListed", PRODUCT_PUBLIC_FIELDS)
//             .populate("sellerId", "companyName")
//             .sort({ createdAt: -1 })
//             .lean();

//         if (!videos.length) {
//             return res.status(200).json({
//                 status: true,
//                 message: "No shoppable videos found for this seller.",
//                 data: []
//             });
//         }

//         res.status(200).json({
//             status: true,
//             message: "Shoppable videos by seller fetched successfully!",
//             data: videos
//         });
//     } catch (error) {
//         console.error("Error in getShoppableVideosBySeller:", error.message);
//         res.status(500).json({
//             status: false,
//             message: "Internal server error."
//         });
//     }
// };