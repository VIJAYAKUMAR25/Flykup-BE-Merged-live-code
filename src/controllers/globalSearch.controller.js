import User from '../models/user.model.js';
import { showProjection, videoProjection, productProjection, userProjection, createSearchRegex } from '../utils/projections.js';
import { executePaginatedHostSearch, executePaginatedSearch } from '../utils/searchUtils.js';
import Show from '../models/shows.model.js';
import ProductListing from '../models/productListing.model.js';
import ShoppableVideo from '../models/shoppableVideo.model.js';

// 1. Search Shows - ( host/hostModel)
export const searchShows = async (req, res) => {
    const { term } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);

    let baseCriteria = { showStatus: { $in: ["created", "live"] } };
    let textSearchFields = []; // Text search handled by preliminary pipeline below
    let effectiveTerm = term; // Term used only for preliminary product search

    const sortCriteria = { isLive: -1, scheduledAt: 1, createdAt: -1 }; // Prioritize live, then upcoming soonest

    try {
        if (term && term.trim()) {
            // Preliminary pipeline to find shows based on product titles 
            const searchRegex = createSearchRegex(term.trim());

            const preliminaryPipeline = [
                { $match: { showStatus: { $in: ["created", "live"] } } },
                {
                    $project: {
                        _id: 1, // Keep _id
                        allProductIds: { 

                            $concatArrays: [
                            { $map: { input: "$buyNowProducts", as: "p", in: "$$p.productId" } },
                            { $map: { input: "$auctionProducts", as: "p", in: "$$p.productId" } },
                            { $map: { input: "$giveawayProducts", as: "p", in: "$$p.productId" } }
                             ]
                        }
                    }
                 },
                 { $unwind: { path: "$allProductIds", preserveNullAndEmptyArrays: false } }, // Use object format for unwind
                 {
                     $lookup: {
                         from: "productlistings",
                         localField: "allProductIds",
                         foreignField: "_id",
                         as: "productDetails"
                     }
                 },
                 { $match: { "productDetails.title": searchRegex } },
                 { $group: { _id: "$_id" } } // Group back by original show _id
            ];
            const matchingShows = await Show.aggregate(preliminaryPipeline);
            const matchingShowIds = matchingShows.map(s => s._id);

            if (matchingShowIds.length === 0) {
                 return res.status(200).json({ status: true, message: "No matching shows found for the term.", data: [], pagination: { totalCount: 0, currentPage: page, totalPages: 0, limit, hasMore: false } });
            }

            baseCriteria = { ...baseCriteria, _id: { $in: matchingShowIds } };
            effectiveTerm = null; // Don't pass term to the main host search function
        }

        const matchCriteria = { baseCriteria, textSearchFields };

        // <<< CHANGE: Call executePaginatedHostSearch >>>
        const { data, totalCount, totalPages, hasMore } = await executePaginatedHostSearch(
            Show, null , page, limit, matchCriteria, sortCriteria, showProjection
        );

        res.status(200).json({ status: true, message: "Shows fetched successfully", data: data, pagination: { totalCount, currentPage: page, totalPages, limit, hasMore } });
    } catch (error) {
        console.error("Error in searchShows:", error);
        res.status(500).json({ status: false, message: "Internal Server Error searching shows." });
    }
};

// 2. Search Videos ( host/hostModel)
export const searchVideos = async (req, res) => {
    const { term } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);

    let baseCriteria = { processingStatus: 'published', visibility: 'public' }; //  base criteria
    let textSearchFields = [];
    let effectiveTerm = term;
    const sortCriteria = { createdAt: -1 };

    try {
        if (term && term.trim()) {
            // Preliminary search for videos based on linked product titles
            const searchRegex = createSearchRegex(term.trim());
            const preliminaryPipeline = [
                // Match base criteria for videos first
                { $match: { ...baseCriteria } },
                { $lookup: { from: "productlistings", localField: "productsListed", foreignField: "_id", as: "productDetails" } },
                { $match: { "productDetails.title": searchRegex } },
                { $project: { _id: 1 } }
            ];
            const matchingVideos = await ShoppableVideo.aggregate(preliminaryPipeline);
            const matchingVideoIds = matchingVideos.map(v => v._id);

            if (matchingVideoIds.length === 0) {
                 return res.status(200).json({ status: true, message: "No matching videos found for the term.", data: [], pagination: { totalCount: 0, currentPage: page, totalPages: 0, limit, hasMore: false } });
            }
            baseCriteria = { ...baseCriteria, _id: { $in: matchingVideoIds } };
            effectiveTerm = null;
        }

        const matchCriteria = { baseCriteria, textSearchFields };

        // <<< Call executePaginatedHostSearch >>>
        const { data, totalCount, totalPages, hasMore } = await executePaginatedHostSearch(
            ShoppableVideo, null , page, limit, matchCriteria, sortCriteria, videoProjection
        );

        res.status(200).json({ status: true, message: "Videos fetched successfully", data: data, pagination: { totalCount, currentPage: page, totalPages, limit, hasMore } });

    } catch (error) {
        console.error("Error in searchVideos:", error);
        res.status(500).json({ status: false, message: "Internal Server Error searching videos." });
    }
};

// 3. Search Products
export const searchProducts = async (req, res) => {
    const { term } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);

 
    const textSearchFields = ["title", "description", "tags", "category", "subcategory"]; 
    const baseCriteria = {};

    const matchCriteria = {
        baseCriteria: baseCriteria,
        textSearchFields: textSearchFields,
    };
    const sortCriteria = { createdAt: -1 };

    try {
        const { data, totalCount, totalPages, hasMore } = await executePaginatedSearch(
            ProductListing, term, page, limit, matchCriteria, sortCriteria, productProjection // Pass term here
        );

        res.status(200).json({
            status: true,
            message: "Products fetched successfully",
            data: data,
            pagination: { totalCount, currentPage: page, totalPages, limit, hasMore }
        });
    } catch (error) {
        console.error("Error in searchProducts:", error);
        res.status(500).json({ status: false, message: "Internal Server Error searching products." });
    }
};

// 4. Search Users 
export const searchUsers = async (req, res) => {
    const { term } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);

    const textSearchFields = ["userName", "name"]; 
    const baseCriteria = {};

    const matchCriteria = {
        baseCriteria: baseCriteria,
        textSearchFields: textSearchFields,
    };
    const sortCriteria = { createdAt: -1 };

    try {
        const { data, totalCount, totalPages, hasMore } = await executePaginatedSearch(
            User, term, page, limit, matchCriteria, sortCriteria, userProjection
        );

        res.status(200).json({
            status: true,
            message: "Users fetched successfully",
            data: data,
            pagination: { totalCount, currentPage: page, totalPages, limit, hasMore }
        });
    } catch (error) {
        console.error("Error in searchUsers:", error);
        res.status(500).json({ status: false, message: "Internal Server Error searching users." });
    }
};



// old code 

// 1. Search Shows 
// export const searchShows = async (req, res) => {
//     const { term } = req.query;
//     const page = Math.max(parseInt(req.query.page) || 1, 1);
//     const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20); // Max 20 results

//     let baseCriteria = { showStatus: { $in: ["created", "live"] } }; 
//     let textSearchFields = []; 
//     let effectiveTerm = term;

//     const sortCriteria = { isLive: -1, date: 1, time: 1, createdAt: -1 }; // Prioritize live, then upcoming soonest

//     try {
//         if (term && term.trim()) {
//             const searchRegex = createSearchRegex(term.trim());

//             const preliminaryPipeline = [
//                  { $match: { showStatus: { $in: ["created", "live"] } } },
//                 {
//                     $project: {
//                         allProductIds: {
//                             $concatArrays: [
//                                 { $map: { input: "$buyNowProducts", as: "p", in: "$$p.productId" } },
//                                 { $map: { input: "$auctionProducts", as: "p", in: "$$p.productId" } },
//                                 { $map: { input: "$giveawayProducts", as: "p", in: "$$p.productId" } }
//                             ]
//                         }
//                     }
//                 },
//                  { $unwind: "$allProductIds" },
//                  {
//                      $lookup: {
//                          from: "productlistings", 
//                          localField: "allProductIds",
//                          foreignField: "_id",
//                          as: "productDetails"
//                      }
//                  },
                 
//                  {
//                      $match: {
//                          "productDetails.title": searchRegex
//                      }
//                  },
                
//                  {
//                      $group: {
//                          _id: "$_id"
//                      }
//                  }
//             ];

//             const matchingShows = await Show.aggregate(preliminaryPipeline);
//             const matchingShowIds = matchingShows.map(s => s._id);

//             if (matchingShowIds.length === 0) {
//                  return res.status(200).json({
//                      status: true,
//                      message: "No matching shows found for the term.",
//                      data: [],
//                      pagination: { totalCount: 0, currentPage: page, totalPages: 0, limit, hasMore: false }
//                  });
//             }

//             baseCriteria = {
//                 ...baseCriteria,
//                 _id: { $in: matchingShowIds }
//             };
//             effectiveTerm = null; 
//         }

  
//         const matchCriteria = { baseCriteria, textSearchFields }; 

//         const { data, totalCount, totalPages, hasMore } = await executePaginatedSearch(
//             Show, effectiveTerm, page, limit, matchCriteria, sortCriteria, showProjection
//         );

//         res.status(200).json({
//             status: true,
//             message: "Shows fetched successfully",
//             data: data,
//             pagination: { totalCount, currentPage: page, totalPages, limit, hasMore }
//         });
//     } catch (error) {
//         console.error("Error in searchShows:", error);
//         res.status(500).json({ status: false, message: "Internal Server Error searching shows." });
//     }
// };

// // 2. Search Videos 
// export const searchVideos = async (req, res) => {
//     const { term } = req.query;
//     const page = Math.max(parseInt(req.query.page) || 1, 1);
//     const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);

//     let baseCriteria = {
//         processingStatus: 'published',
//         visibility: 'public'  
//     };
//     let textSearchFields = [];
//     let effectiveTerm = term;

//     const sortCriteria = { createdAt: -1 };

//     try {
//         if (term && term.trim()) {
//             const searchRegex = createSearchRegex(term.trim());

//             const preliminaryPipeline = [
//                 {
//                     $lookup: {
//                         from: "productlistings", 
//                         localField: "productsListed",
//                         foreignField: "_id",
//                         as: "productDetails"
//                     }
//                 },
//                  // Filter videos where at least one linked product's title matches
//                 {
//                     $match: {
//                         "productDetails.title": searchRegex
//                     }
//                 },
//                 // Project only the ID
//                 {
//                     $project: {
//                         _id: 1
//                     }
//                 }
//             ];

//             const matchingVideos = await ShoppableVideo.aggregate(preliminaryPipeline);
//             const matchingVideoIds = matchingVideos.map(v => v._id);

//             if (matchingVideoIds.length === 0) {
//                  return res.status(200).json({
//                      status: true,
//                      message: "No matching videos found for the term.",
//                      data: [],
//                      pagination: { totalCount: 0, currentPage: page, totalPages: 0, limit, hasMore: false }
//                  });
//             }

//             baseCriteria = {
//                  ...baseCriteria,
//                  _id: { $in: matchingVideoIds }
//             };
//              effectiveTerm = null; 
//         }
//         const matchCriteria = { baseCriteria, textSearchFields };

//         const { data, totalCount, totalPages, hasMore } = await executePaginatedSearch(
//             ShoppableVideo, effectiveTerm, page, limit, matchCriteria, sortCriteria, videoProjection
//         );

//         res.status(200).json({
//             status: true,
//             message: "Videos fetched successfully",
//             data: data,
//             pagination: { totalCount, currentPage: page, totalPages, limit, hasMore }
//         });
//     } catch (error) {
//         console.error("Error in searchVideos:", error);
//         res.status(500).json({ status: false, message: "Internal Server Error searching videos." });
//     }
// };