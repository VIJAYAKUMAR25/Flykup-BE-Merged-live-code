import { isDropshipper } from "../middlewares/auth.js";
import Follow from "../models/follow.model.js";
import ProductListing from "../models/productListing.model.js";
import Seller from "../models/seller.model.js";
import Dropshipper from "../models/shipper.model.js";
import ShoppableVideo from "../models/shoppableVideo.model.js";
import Show from "../models/shows.model.js";
import User from "../models/user.model.js";
import { AGG_DROPSHIPPER_FIELDS, AGG_PRODUCTS_FIELDS, AGG_SELLER_FIELDS, AGG_SHOPPABLE_VIDEOS_FIELDS, AGG_SHOWS_FIELDS, AGG_USER_FIELDS, CLEAN_USER_FIELDS, USER_PUBLIC_FIELDS } from "../utils/constants.js";
import { isReservedUsername } from "../utils/helper.js";


// check user Name availability
export const checkUsernameAvailability = async (req, res) => {
  try {
    const { userName } = req.query; 
    const { user } = req;

    if (!userName || typeof userName !== 'string' || userName.trim() === '') {
      return res.status(200).json({
        status: false,
        message: "Username cannot be empty.",
      });
    }

    const lowerCaseUserName = userName.toLowerCase().trim();

    if (isReservedUsername(lowerCaseUserName)) {
      return res.status(200).json({
        status: false,
        message: "This username is reserved.",
      });
    }

    if (!user || !user._id) {
        console.error("User context (_id) not found in request for username check.");
        return res.status(401).json({
             status: false,
             message: "Authentication error: Cannot verify username availability."
        });
    }

    const query = {
      userName: lowerCaseUserName,
      _id: { $ne: user._id }
    };

    const existingOtherUser = await User.findOne(query);

    if (existingOtherUser) {
      return res.status(200).json({
        status: false,
        message: "Username is already taken!", 
      });
    }

    // --- Username is Available ---
    return res.status(200).json({
      status: true,
      message: "Username is available!",
    });

  } catch (error) {
    console.error("Error in checkUsernameAvailability:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error."
    });
  }
};


export const updateProfile = async (req, res) => {
  const { _id: userId } = req.user;
  const formData = req.body;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Validate if userName is changed and already exists
    if (formData.userName && formData.userName !== existingUser.userName) {
      const usernameExists = await User.findOne({ userName: formData.userName });
      if (usernameExists || isReservedUsername(formData.userName)) {
        return res.status(400).json({ status: false, message: "Username already taken" });
      }
    }

    // Update document
    const updatedUser = await User.findByIdAndUpdate(userId, formData, {
      new: true,
      runValidators: true
    });

    // updated user
    const userData = await User.findById(updatedUser._id).select(USER_PUBLIC_FIELDS).populate({
      path: "sellerInfo",
      select: "approvalStatus rejectedReason",
      options: { strictPopulate: false },
    });;

    res.status(200).json({ status: true, message: "Profile updated successfully!", data: userData });

  } catch (error) {
    console.error("Error in updateProfile:", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// export const getProfileByUserName = async (req, res) => {
//   try {
//     const userAgent = req.headers['user-agent'];
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     // const ip = req.ip;

//     // console.log("User Os",userAgent);
//     // console.log("User Ip",ip);
//     // console.log("Req URL",req.url);
//     // console.log("REQ Method",req.method); // 'GET'
    
    
//     const { userName } = req.params;
//     const loggedInUser = req.user;
//     const limit = 20;

//     const userProfile = await User.aggregate([
//       { $match: { userName } },
//       { $project: AGG_USER_FIELDS },

//       // Get followers count
//       {
//         $lookup: {
//           from: "follows",
//           let: { userId: "$_id" },
//           pipeline: [
//             { $match: { $expr: { $eq: ["$following", "$$userId"] } } },
//             { $count: "followersCount" }
//           ],
//           as: "followersData"
//         }
//       },

//       // Get following count
//       {
//         $lookup: {
//           from: "follows",
//           let: { userId: "$_id" },
//           pipeline: [
//             { $match: { $expr: { $eq: ["$follower", "$$userId"] } } },
//             { $count: "followingCount" }
//           ],
//           as: "followingData"
//         }
//       },

//       // Add counts
//       {
//         $addFields: {
//           followersCount: { $ifNull: [{ $arrayElemAt: ["$followersData.followersCount", 0] }, 0] },
//           followingCount: { $ifNull: [{ $arrayElemAt: ["$followingData.followingCount", 0] }, 0] }
//         }
//       },
//       { $unset: ["followersData", "followingData"] },

//       // Get seller info if exists
//       {
//         $lookup: {
//           from: "sellers",
//           let: { sellerId: "$sellerInfo" },
//           pipeline: [
//             { $match: { $expr: { $eq: ["$_id", "$$sellerId"] } } },
//             { $project: AGG_SELLER_FIELDS }
//           ],
//           as: "sellerData"
//         }
//       },
//       { $unwind: { path: "$sellerData", preserveNullAndEmptyArrays: true } },

//       // Get products (only if seller exists)
//       {
//         $lookup: {
//           from: "productlistings",
//           let: { sellerId: "$sellerData._id" },
//           pipeline: [
//             { $match: { $expr: { $eq: ["$sellerId", "$$sellerId"] } } },
//             { $sort: { createdAt: -1 } },
//             { $limit: limit },
//             { $project: AGG_PRODUCTS_FIELDS }
//           ],
//           as: "sellerProducts"
//         }
//       },

//       // Get shows (only if seller exists)
//       {
//         $lookup: {
//           from: "shows",
//           let: { sellerId: "$sellerData._id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$host", "$$sellerId"]},
//                     { $eq: ["$hostModel", "sellers"]},
//                     { $in: ["$showStatus", ["created", "live"]]}
//                   ]
//                 }
//               }
//             },
//             { $sort: { createdAt: -1 } },
//             { $limit: limit },
//             { $project: AGG_SHOWS_FIELDS }
//           ],
//           as: "sellerShows"
//         }
//       },

//       // Get shoppable videos (only if seller exists)
//       {
//         $lookup: {
//           from: "shoppablevideos",
//           let: { sellerId: "$sellerData._id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$host", "$$sellerId"] },
//                     { $eq: ["$hostModel", "sellers"] },
//                     { $eq: ["$processingStatus", "published"]},
//                     { $eq: ["$visibility", "public"]},
//                   ]
//                 }
//               }
//             },
//             { $sort: { createdAt: -1 } },
//             { $limit: limit },
//             { $project: AGG_SHOPPABLE_VIDEOS_FIELDS }
//           ],
//           as: "sellerVideos"
//         }
//       },

//       // Get counts (only if seller exists)
//       {
//         $lookup: {
//           from: "productlistings",
//           let: { sellerId: "$sellerData._id" },
//           pipeline: [
//             { $match: { $expr: { $eq: ["$sellerId", "$$sellerId"] } } },
//             { $count: "totalProducts" }
//           ],
//           as: "totalProductsData"
//         }
//       },
//       {
//         $lookup: {
//           from: "shows",
//           let: { sellerId: "$sellerData._id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$host", "$$sellerId"]},
//                     { $eq: ["$hostModel", "sellers"]},
//                     { $in: ["$showStatus", ["created", "live"]]}
//                   ]
//                 }
//               }
//             },
//             { $count: "totalShows" }
//           ],
//           as: "totalShowsData"
//         }
//       },
//       {
//         $lookup: {
//           from: "shoppablevideos",
//           let: { sellerId: "$sellerData._id" },
//           pipeline: [
//             { $match: {
//               $expr: {
//                 $and: [
//                   { $eq: ["$host", "$$sellerId"] },
//                   { $eq: ["$hostModel", "sellers"] },
//                   { $eq: ["$processingStatus", "published"]},
//                   { $eq: ["$visibility", "public"]},
//                 ]
//               }
//               } },
//             { $count: "totalShoppableVideos" }
//           ],
//           as: "totalVideosData"
//         }
//       },

//       // Add counts to sellerData
//       {
//         $addFields: {
//           "sellerCounts": {
//             totalProducts: { $ifNull: [{ $arrayElemAt: ["$totalProductsData.totalProducts", 0] }, 0] },
//             totalShows: { $ifNull: [{ $arrayElemAt: ["$totalShowsData.totalShows", 0] }, 0] },
//             totalShoppableVideos: { $ifNull: [{ $arrayElemAt: ["$totalVideosData.totalShoppableVideos", 0] }, 0] }
//           }
//         }
//       },
//       { $unset: ["totalProductsData", "totalShowsData", "totalVideosData"] },

//       // Get dropshipper info if exists
//       {
//         $lookup: {
//           from: "dropshippers",
//           let: { dropshipperId: "$dropshipperInfo" },
//           pipeline: [
//             { $match: { $expr: { $eq: ["$_id", "$$dropshipperId"] } } },
//             { $project: AGG_DROPSHIPPER_FIELDS }
//           ],
//           as: "dropshipperData"
//         }
//       },
//       { $unwind: { path: "$dropshipperData", preserveNullAndEmptyArrays: true } },

//       // Get shows (only if dropshipper exists)
//       {
//         $lookup: {
//           from: "shows",
//           let: { dropshipperId: "$dropshipperData._id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$host", "$$dropshipperId"] },
//                     { $eq: ["$hostModel", "dropshippers"] },
//                     { $in: ["$showStatus", ["created", "live"]] }
//                   ]
//                 }
//               }
//             },
//             { $sort: { createdAt: -1 } },
//             { $limit: limit },
//             { $project: AGG_SHOWS_FIELDS }
//           ],
//           as: "dropshipperShows"
//         }
//       },

//       // Get shoppable videos (only if dropshipper exists)
//       {
//         $lookup: {
//           from: "shoppablevideos",
//           let: { dropshipperId: "$dropshipperData._id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$host", "$$dropshipperId"] },
//                     { $eq: ["$hostModel", "dropshippers"] },
//                     { $eq: ["$processingStatus", "published"]},
//                     { $eq: ["$visibility", "public"]},
//                   ]
//                 }
//               }
//             },
//             { $sort: { createdAt: -1 } },
//             { $limit: limit },
//             { $project: AGG_SHOPPABLE_VIDEOS_FIELDS }
//           ],
//           as: "dropshipperVideos"
//         }
//       },

//       // Get counts (only if dropshipper exists)
//       {
//         $lookup: {
//           from: "shows",
//           let: { dropshipperId: "$dropshipperData._id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$host", "$$dropshipperId"] },
//                     { $eq: ["$hostModel", "dropshippers"] },
//                     { $in: ["$showStatus", ["created", "live"]] }
//                   ]
//                 }
//               }
//             },
//             { $count: "totalShows" }
//           ],
//           as: "dropshipperTotalShows"
//         }
//       }
//       ,
//       {
//         $lookup: {
//           from: "shoppablevideos",
//           let: { dropshipperId: "$dropshipperData._id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$host", "$$dropshipperId"] },
//                     { $eq: ["$hostModel", "dropshippers"] },
//                     { $eq: ["$processingStatus", "published"]},
//                     { $eq: ["$visibility", "public"]},
//                   ]
//                 }
//               }
//             },
//             { $count: "totalShoppableVideos" }
//           ],
//           as: "dropshipperTotalVideos"
//         }
//       }
//       ,

//       // Add counts to dropshipperData
//       {
//         $addFields: {
//           "dropshipperCounts": {
//             totalShows: { $ifNull: [{ $arrayElemAt: ["$dropshipperTotalShows.totalShows", 0] }, 0] },
//             totalShoppableVideos: { $ifNull: [{ $arrayElemAt: ["$dropshipperTotalVideos.totalShoppableVideos", 0] }, 0] }
//           }
//         }
//       },
//       { $unset: ["dropshipperTotalShows", "dropshipperTotalVideos"] }

//     ]);

//     if (!userProfile.length) {
//       return res.status(404).json({ status: false, message: "User not found." });
//     }

//     const user = userProfile[0];
//     const isOwnProfile = loggedInUser?._id.toString() === user._id.toString(); // Safer comparison
//     const isSeller = user.role === "seller";
//     const isDropshipper = user.role === "dropshipper";
//     let followStatus = "Follow";

//        // hostId ---
//        let hostId = null;
//        if (isSeller && user.sellerData?._id) {
//            hostId = user.sellerData._id;
//        } else if (isDropshipper && user.dropshipperData?._id) { 
//            hostId = user.dropshipperData._id;
//        }

//     if (!isOwnProfile) {
//       const [doesFollow, isFollowedBy] = await Promise.all([
//         Follow.findOne({ follower: loggedInUser._id, following: user._id }),
//         Follow.findOne({ follower: user._id, following: loggedInUser._id }),
//       ]);
//       if (doesFollow) followStatus = "Following";
//       else if (!doesFollow && isFollowedBy) followStatus = "Follow Back";
//     }

//     // Clean user object to remove seller fields
//     const cleanUser = CLEAN_USER_FIELDS.reduce((acc, field) => {
//       if (user[field] !== undefined) acc[field] = user[field];
//       return acc;
//     }, {})

//     return res.status(200).json({
//       status: true,
//       message: "User profile fetched successfully!",
//       data: {
//         isOwnProfile,
//         isSeller,
//         isDropshipper,
//         hostId,
//         user: cleanUser,
//         follow: {
//           followersCount: user.followersCount,
//           followingCount: user.followingCount,
//           followStatus,
//         },
//         seller: user.sellerData ? {
//           sellerInfo: user.sellerData,
//           products: user.sellerProducts || [],
//           shows: user.sellerShows || [],
//           shoppableVideos: user.sellerVideos || [],
//           counts: user.sellerCounts || {
//             totalProducts: 0,
//             totalShows: 0,
//             totalShoppableVideos: 0
//           }
//         } : {},
//         dropshipper: user.dropshipperData ? {
//           shipperInfo: user.dropshipperData,
//           shows: user.dropshipperShows || [],
//           shoppableVideos: user.dropshipperVideos || [],
//           counts: user.dropshipperCounts || {
//             totalShows: 0,
//             totalShoppableVideos: 0
//           }
//         } : {}
//       }
//     });

//   } catch (error) {
//     console.error("Error in getProfileByUserName:", error.message);
//     return res.status(500).json({ status: false, message: "Internal server Error." });
//   }
// };


export const getProfileByUserName = async (req, res) => {
    try {
        const { userName } = req.params;
        const loggedInUser = req.user;

        const userProfile = await User.aggregate([
            { $match: { userName } },
            { $project: AGG_USER_FIELDS },

            // --- Get follow counts ---
            { $lookup: { from: "follows", localField: "_id", foreignField: "following", as: "followersData" } },
            { $lookup: { from: "follows", localField: "_id", foreignField: "follower", as: "followingData" } },
            { $addFields: {
                followersCount: { $size: "$followersData" },
                followingCount: { $size: "$followingData" }
            }},
            { $unset: ["followersData", "followingData"] },

            // --- Get Seller and Dropshipper Info ---
            { $lookup: { from: "sellers", localField: "sellerInfo", foreignField: "_id", as: "sellerData" }},
            { $unwind: { path: "$sellerData", preserveNullAndEmptyArrays: true } },
            { $lookup: { from: "dropshippers", localField: "dropshipperInfo", foreignField: "_id", as: "dropshipperData" }},
            { $unwind: { path: "$dropshipperData", preserveNullAndEmptyArrays: true } },
            
            // --- Get TOTAL COUNTS with correct filters ---
            { $lookup: {
                from: "productlistings",
                let: { sellerId: "$sellerData._id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$sellerId", "$$sellerId"] } } },
                    { $count: "totalProducts" }
                ],
                as: "totalProductsData"
            }},
            { $lookup: {
                from: "shows",
                let: { hostId: { $ifNull: ["$sellerData._id", "$dropshipperData._id"] } },
                pipeline: [
                    { $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$host", "$$hostId"] },
                                { $in: ["$showStatus", ["created", "live"]] }
                            ]
                        }
                    }},
                    { $count: "totalShows" }
                ],
                as: "totalShowsData"
            }},
            { $lookup: {
                from: "shoppablevideos",
                let: { hostId: { $ifNull: ["$sellerData._id", "$dropshipperData._id"] } },
                pipeline: [
                    { $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$host", "$$hostId"] },
                                { $eq: ["$visibility", "public"] },
                                { $eq: ["$processingStatus", "published"] }
                            ]
                        }
                    }},
                    { $count: "totalShoppableVideos" }
                ],
                as: "totalVideosData"
            }},

            // --- Combine the counts into a single object ---
            { $addFields: {
                "counts": {
                    totalProducts: { $ifNull: [{ $arrayElemAt: ["$totalProductsData.totalProducts", 0] }, 0] },
                    totalShows: { $ifNull: [{ $arrayElemAt: ["$totalShowsData.totalShows", 0] }, 0] },
                    totalShoppableVideos: { $ifNull: [{ $arrayElemAt: ["$totalVideosData.totalShoppableVideos", 0] }, 0] }
                }
            }},
            { $unset: ["totalProductsData", "totalShowsData", "totalVideosData"] },
        ]);

        if (!userProfile.length) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        const user = userProfile[0];
        const isOwnProfile = loggedInUser ? loggedInUser._id.toString() === user._id.toString() : false;
        const isSeller = user.role === "seller";
        const isDropshipper = user.role === "dropshipper";
        
        let followStatus = "Follow";
        if (loggedInUser && !isOwnProfile) {
            const doesFollow = await Follow.findOne({ follower: loggedInUser._id, following: user._id });
            if (doesFollow) followStatus = "Following";
        }

        let hostId = null;
        if (isSeller && user.sellerData?._id) {
            hostId = user.sellerData._id;
        } else if (isDropshipper && user.dropshipperData?._id) {
            hostId = user.dropshipperData._id;
        }
        
        const responseData = {
            isOwnProfile,
            isSeller,
            isDropshipper,
            hostId,
            user: user, // You might want to use your CLEAN_USER_FIELDS here
            follow: {
                followersCount: user.followersCount,
                followingCount: user.followingCount,
                followStatus,
            },
            sellerInfo: user.sellerData || {},
            dropshipperInfo: user.dropshipperData || {},
            counts: user.counts,
        };

        return res.status(200).json({
            status: true,
            message: "User core profile fetched successfully!",
            data: responseData
        });

    } catch (error) {
        console.error("Error in getProfileByUserName:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error." });
    }
};


export const paginatedProducts = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);

        // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

      // Define the query criteria
      const queryCriteria = { sellerId };

    // --- Fetch the products for the current page ---
    const products = await ProductListing.find(queryCriteria)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(AGG_PRODUCTS_FIELDS);

     // --- Calculate pagination metadata ---
    const totalCount = await ProductListing.countDocuments(queryCriteria);

    // 2. Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // 3. Determine if there are more pages
    const hasMore = page < totalPages;

    return res.status(200).json({
      status: true,
      message: "products fetched successfully!",
      data: products,
      pagination: {
        totalCount,
        currentPage: page,
        totalPages,
        limit, 
        hasMore,
      },
    });

  } catch (error) {
    console.error("Error in paginatedProducts:", error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
};

export const paginatedShows = async (req, res) => {
  try {
    const { hostId } = req.params;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // --- Define the query criteria ---
        const queryCriteria = { host: hostId, showStatus: { $in: ["created", "live"] } };

    const shows = await Show.find(queryCriteria)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(AGG_SHOWS_FIELDS);

        // --- Calculate pagination metadata ---
    // 1. Get the total count of documents matching the criteria
    const totalCount = await Show.countDocuments(queryCriteria);

    // 2. Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // 3. Determine if there are more pages
    const hasMore = page < totalPages;

    return res.status(200).json({
      status: true,
      message: "shows fetched successfully!",
      data: shows,
      pagination: {
        totalCount,
        currentPage: page,
        totalPages,
        limit,
        hasMore,
      },
    });

  } catch (error) {
    console.error("Error in paginatedShows:", error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
};

export const paginatedShoppableVideos = async (req, res) => {
  try {
    const { hostId } = req.params;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);

    // number of documents to skip
    const skip = ( page - 1 ) * limit;

    // query 
    const queryCriteria = { host:hostId, visibility: "public", processingStatus: "published" };

    const videos = await ShoppableVideo.find(queryCriteria)
      .sort({ createdAt: -1 })
      .skip( skip )
      .limit(limit)
      .select(AGG_SHOPPABLE_VIDEOS_FIELDS);

    // total documents matching query 
    const totalCount = await ShoppableVideo.countDocuments(queryCriteria);

    // total pages 
    const totalPages = Math.ceil( totalCount / limit );

    // has more pages to load 
    const hasMore = page < totalPages;

    return res.status(200).json({
      status: true,
      message: "shoppable videos fetched successfully!",
      data: videos,
      pagination: {
        totalCount,
        currentPage: page,
        totalPages,
        limit,
        hasMore,
      },
    });

  } catch (error) {
    console.error("Error in paginatedShoppableVideos:", error.message);
    return res.status(500).json({ status: false, message: error.message || "Internal server error." });
  }
};