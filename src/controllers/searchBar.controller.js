import ProductListing from "../models/productListing.model.js";
import ShoppableVideo from "../models/shoppableVideo.model.js";
import Show from "../models/shows.model.js";
import User from "../models/user.model.js";
import { createSearchRegex } from "../utils/helper.js";

const userProjection = {
  _id: 1,
  userName: { $ifNull: ["$userName", null] },
  name: { $ifNull: ["$name", null] },
  "profileURL.jpgURL": { $ifNull: ["$profileURL.jpgURL", null] },
};

const productProjection = {
  _id: 1,
  title: { $ifNull: ["$title", null] },
  "images.0.jpgURL": { $ifNull: ["$images.0.jpgURL", "$images.0.azureUrl"] }, // First image
  // "images.0.azureUrl": { $ifNull: ["$images.0.azureUrl", null] }, // First image
  productPrice: { $ifNull: ["$productPrice", null] },
  MRP: { $ifNull: ["$MRP", null] },
  // Add any other fields needed for the card
};

const videoProjection = {
  _id: 1,
  title: { $ifNull: ["$title", null] },
  thumbnailURL: { $ifNull: ["$thumbnailURL", null] },
  sellerId: { $ifNull: ["$sellerId", null] }, // Or populate seller info if needed
  createdAt: { $ifNull: ["$createdAt", null] },
  // Add any other fields needed for the card
};

const showProjection = {
  _id: 1,
  title: { $ifNull: ["$title", null] },
  thumbnailImage: { $ifNull: ["$thumbnailImage", null] },
  isLive: { $ifNull: ["$isLive", false] }, // Default to false if null
  showStatus: { $ifNull: ["$showStatus", null] },
  sellerId: { $ifNull: ["$sellerId", null] }, // Or populate seller info if needed
  date: { $ifNull: ["$date", null] },
  time: { $ifNull: ["$time", null] },
  createdAt: { $ifNull: ["$createdAt", null] }, // For sorting
  // Add any other fields needed for the card
};


// --- Helper Function for Paginated Search ---
const executePaginatedSearch = async (Model, term, page, limit, matchCriteria, sortCriteria, projection) => {
  const searchRegex = term && term.trim() ? createSearchRegex(term.trim()) : null;
  let specificMatch = {};

  // Apply search term to the correct fields based on the Model/matchCriteria
  if (searchRegex) {
    if (matchCriteria.textSearchFields && matchCriteria.textSearchFields.length > 0) {
      specificMatch.$or = matchCriteria.textSearchFields.map(field => ({ [field]: searchRegex }));
    }
    // Add logic for lookups/nested searches if needed (like the original shows/videos)
     if (matchCriteria.lookupSearch) {
        // This part needs careful implementation based on your exact lookup requirements
        // For simplicity here, we'll stick to direct field matching.
        // You would add $lookup and subsequent $match stages here if needed,
        // similar to your original 'searchAll'.
        console.warn("Lookup search logic needs to be implemented specifically for", Model.modelName);
     }
  }

  // Combine specific search match with any base criteria (e.g., showStatus)
  const finalMatch = {
     ...matchCriteria.baseCriteria, // e.g., { showStatus: { $in: ["created", "live"] } }
     ...specificMatch
  };


  const pipeline = [
    { $match: finalMatch },
    {
      $facet: {
        data: [
          { $sort: sortCriteria },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          { $project: projection }
        ],
        totalCount: [
          { $count: 'count' }
        ]
      }
    }
  ];

  try {
    const results = await Model.aggregate(pipeline);

    const data = results[0]?.data || [];
    const totalCount = results[0]?.totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages;

    return { data, totalCount, totalPages, hasMore };
  } catch (error) {
    console.error(`Aggregation error for ${Model.modelName}:`, error);
    throw error; // Re-throw to be caught by the controller
  }
};

// --- API Controllers ---

// 1. Search Shows
export const searchShows = async (req, res) => {
  const { term } = req.query;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 10);

  const matchCriteria = {
      baseCriteria: { showStatus: { $in: ["created", "live"] } }, // Example base filter
      textSearchFields: ["title"], // Fields to search with 'term'
      // lookupSearch: true // Add this if you need the complex product title lookup from original code
  };
  const sortCriteria = { isLive: -1, date: -1, time: -1, createdAt: -1 }; // Prioritize live, then upcoming

  try {
    const { data, totalCount, totalPages, hasMore } = await executePaginatedSearch(
      Show, term, page, limit, matchCriteria, sortCriteria, showProjection
    );

    res.status(200).json({
      status: true,
      message: "Shows fetched successfully",
      data: data,
      pagination: { totalCount, currentPage: page, totalPages, limit, hasMore }
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error searching shows." });
  }
};

// 2. Search Videos
export const searchVideos = async (req, res) => {
    const { term } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 10);

    const matchCriteria = {
        baseCriteria: {}, // Add any base filters if needed (e.g., { status: 'published' })
        textSearchFields: ["title"], // Fields to search with 'term'
         // lookupSearch: true // Add this if you need the complex product title lookup
    };
    const sortCriteria = { createdAt: -1 };

    try {
        const { data, totalCount, totalPages, hasMore } = await executePaginatedSearch(
            ShoppableVideo, term, page, limit, matchCriteria, sortCriteria, videoProjection
        );

        res.status(200).json({
            status: true,
            message: "Videos fetched successfully",
            data: data,
            pagination: { totalCount, currentPage: page, totalPages, limit, hasMore }
        });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error searching videos." });
    }
};

// 3. Search Products
export const searchProducts = async (req, res) => {
    const { term } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 10);

    const matchCriteria = {
        baseCriteria: {}, // Example: Only search active products
        textSearchFields: ["title", "description", "tags"], // Example fields
    };
    const sortCriteria = { createdAt: -1 }; // Or maybe sort by relevance/popularity?

    try {
        const { data, totalCount, totalPages, hasMore } = await executePaginatedSearch(
            ProductListing, term, page, limit, matchCriteria, sortCriteria, productProjection
        );

        res.status(200).json({
            status: true,
            message: "Products fetched successfully",
            data: data,
            pagination: { totalCount, currentPage: page, totalPages, limit, hasMore }
        });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error searching products." });
    }
};

// 4. Search Users
export const searchUsers = async (req, res) => {
    const { term } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 10);

    const matchCriteria = {
        baseCriteria: {}, // Example: only active users
        textSearchFields: ["userName", "name"],
    };
    const sortCriteria = { createdAt: -1 }; // Or sort by followers, last active etc.

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
        console.error("Error in searchUsers:", error.message);
        res.status(500).json({ status: false, message: "Internal Server Error." });
    }
};

