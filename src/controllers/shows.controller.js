// import Show from "../models/shows.model.js";
// import { flattenPopulatedProducts, generateStreamName } from "../utils/helper.js";
// // import streamingApis from "@api/streaming-apis";
// import { PRODUCT_EXCLUDED_FIELDS } from "../utils/constants.js";
// import ProductListing from "../models/productListing.model.js";
// import mongoose from "mongoose";
// import asyncHandler from "express-async-handler"; // Assuming you use this
// import Seller from "../models/seller.model.js";
// import Dropshipper from "../models/shipper.model.js";


// async function validateAndFormatProducts(productList = [], host, hostModel) {
//   if (!productList || productList.length === 0) {
//     return { valid: true, formattedProducts: [] };
//   }

//   const formattedProducts = [];
//   const errors = [];

//   for (const item of productList) {
//     if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
//       errors.push(`Invalid or missing productId: ${item.productId}`);
//       continue;
//     }

//     const product = await ProductListing.findById(item.productId).select('sellerId');
//     if (!product) {
//       errors.push(`Product not found: ${item.productId}`);
//       continue;
//     }

//     let isValidProduct = false;
//     let productOwnerSellerId = null;

//     if (hostModel === 'sellers') {
//       // Seller can only add their own products
//       if (product.sellerId.equals(host._id)) {
//         isValidProduct = true;
//         productOwnerSellerId = host._id;
//       } else {
//         errors.push(`Seller cannot add product ${item.productId} owned by another seller.`);
//       }
//     } else if (hostModel === 'dropshippers') {
//       // Dropshipper can only add products from approved connected sellers
//       // Assuming 'approvedSellerIds' was attached in 'canHostShow' middleware
//       if (host.approvedSellerIds && host.approvedSellerIds.some(id => id.equals(product.sellerId))) {
//         isValidProduct = true;
//         productOwnerSellerId = product.sellerId; // Owner is the original seller
//       } else {
//         errors.push(`Dropshipper cannot add product ${item.productId}. Not connected or approved with seller ${product.sellerId}.`);
//       }
//     }

//     if (isValidProduct) {
//       // Format according to showSchema (add owner, keep price/details from request)
//       formattedProducts.push({
//         productId: item.productId,
//         productOwnerSellerId: productOwnerSellerId,
//         productPrice: item.productPrice, // For buyNow
//         startingPrice: item.startingPrice, // For auction
//         reservedPrice: item.reservedPrice, // For auction
//         followersOnly: item.followersOnly, // For giveaway
//         // Add any other per-product fields from request (e.g., show-specific price)
//       });
//     }
//   }

//   if (errors.length > 0) {
//     return { valid: false, errors };
//   }
//   return { valid: true, formattedProducts };
// }

// // --- UPDATED createShow ---
// export const createShow = async (req, res) => {

//   const { showHost, showHostModel } = req;
//   if (!showHost || !showHostModel) {
//     console.error("Error: Host details not attached by canHostShow middleware.");
//     return res.status(500).json({ status: false, message: "Internal Server Error: Middleware configuration issue." });
//   }
//   const hostId = showHost._id;

//   const {
//     title,
//     scheduledAt,
//     category,
//     subCategory,
//     tags,
//     thumbnailImage,
//     thumbnailImageURL,
//     previewVideoURL,
//     previewVideo,
//     language,
//     buyNowProducts = [], // Default to empty arrays
//     auctionProducts = [],
//     giveawayProducts = [],
//     coHost = null,
//     hasCoHost = false
//   } = req.body;

//   try {
//     // Validate required fields for the show itself
//     if (!title || !scheduledAt || !category || !language) {
//       return res
//         .status(400)
//         .json({
//           status: false,
//           message: "Please provide all required show fields (title, date, time, category, language).",
//         });
//     }

//     // --- Validate Products ---
//     const buyNowValidation = await validateAndFormatProducts(buyNowProducts, showHost, showHostModel);
//     if (!buyNowValidation.valid) {
//       return res.status(400).json({ status: false, message: "Invalid Buy Now products", errors: buyNowValidation.errors });
//     }
//     const auctionValidation = await validateAndFormatProducts(auctionProducts, showHost, showHostModel);
//     if (!auctionValidation.valid) {
//       return res.status(400).json({ status: false, message: "Invalid Auction products", errors: auctionValidation.errors });
//     }
//     const giveawayValidation = await validateAndFormatProducts(giveawayProducts, showHost, showHostModel);
//     if (!giveawayValidation.valid) {
//       return res.status(400).json({ status: false, message: "Invalid Giveaway products", errors: giveawayValidation.errors });
//     }
//     // --- End Product Validation ---

//     // Generate stream name (adapt based on available host info)
//     // const hostNameForStream = showHost.companyName || showHost.businessName || showHost.name || hostId.toString();
//     // const streamName = generateStreamName(hostNameForStream);
//     // const streamUrl = `https://viewer.millicast.com?streamId=${MILLICAST_ACCOUNT_ID}/${streamName}`;

//     // Create the show with validated data
//     const newShow = new Show({
//       title,
//       scheduledAt,
//       category,
//       subCategory,
//       tags,
//       host: hostId,
//       hostModel: showHostModel,
//       coHost,
//       hasCoHost,
//       thumbnailImage,
//       thumbnailImageURL,
//       previewVideoURL,
//       previewVideo,
//       language,
//       // streamUrl,
//       // streamName,
//       // === Use validated/formatted products ===
//       buyNowProducts: buyNowValidation.formattedProducts,
//       auctionProducts: auctionValidation.formattedProducts,
//       giveawayProducts: giveawayValidation.formattedProducts,
//       // =======================================
//     });

//     // Save the show to the database
//     const savedShow = await newShow.save();
//     res
//       .status(201)
//       .json({
//         status: true,
//         message: "Show created successfully!",
//         data: savedShow,
//       });
//   } catch (error) {
//     console.error("Error in createShow:", error); // Log the actual error
//     // Handle potential validation errors from Mongoose save
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ status: false, message: "Validation failed", errors: error.errors });
//     }
//     res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
//   }
// };



// // Update a show by ID
// export const updateShow = async (req, res) => {
//   try {
//     const showId = req.params.id;
//     const updatedDetails = req.body;

//     const show = await Show.findById(showId);

//     if (!show) {
//       return res.status(404).json({ status: false, message: "show not found" });
//     }

//     Object.assign(show, updatedDetails);

//     show.markModified('buyNowProducts');
//     show.markModified('auctionProducts');
//     show.markModified('giveawayProducts');

//     // save show
//     const savedShow = await show.save();

//     res.status(200).json({
//       status: true,
//       message: "show details updated successfully!",
//       data: savedShow
//     });
//   } catch (error) {
//     console.error("Error in updateShow:", error.message);
//     res.status(500).json({ status: false, message: "Internal server Error" });
//   }
// };

// // get show by ID
// export const getShowById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const show = await Show.findById(id)
//       .populate({
//         path: "buyNowProducts.productId",
//         select: `${PRODUCT_EXCLUDED_FIELDS}`,
//       })
//       .populate({
//         path: "auctionProducts.productId",
//         select: `${PRODUCT_EXCLUDED_FIELDS}`,
//       })
//       .populate({
//         path: "giveawayProducts.productId",
//         select: `${PRODUCT_EXCLUDED_FIELDS}`,
//       })
//       .lean();

//     if (!show) {
//       return res.status(404).json({ status: false, message: "show not found" });
//     }

//     if (show.buyNowProducts && show.buyNowProducts.length > 0) {
//       show.buyNowProducts = flattenPopulatedProducts(show.buyNowProducts);
//     }

//     if (show.auctionProducts && show.auctionProducts.length > 0) {
//       show.auctionProducts = flattenPopulatedProducts(show.auctionProducts);
//     }

//     if (show.giveawayProducts && show.giveawayProducts.length > 0) {
//       show.giveawayProducts = flattenPopulatedProducts(show.giveawayProducts);
//     }

//     return res
//       .status(200)
//       .json({ status: true, message: "show fetched successfully", data: show });
//   } catch (error) {
//     console.error("Error in getShowById:", error.message);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server error." });
//   }
// };

// // get shows by seller id
// export const getShowsBySellerId = async (req, res) => {
//   const { seller } = req;
//   const { _id } = seller;
//   try {
//     const sellerShows = await Show.find({ sellerId: _id })
//       .populate({
//         path: "buyNowProducts.productId",
//         select: `${PRODUCT_EXCLUDED_FIELDS}`,
//       })
//       .populate({
//         path: "auctionProducts.productId",
//         select: `${PRODUCT_EXCLUDED_FIELDS}`,
//       })
//       .populate({
//         path: "giveawayProducts.productId",
//         select: `${PRODUCT_EXCLUDED_FIELDS}`,
//       })
//       .sort({ createdAt: -1 })
//       .lean();

//     // Transform each show to flatten the product data 
//     const flattendSellerShows = sellerShows.map((show) => {
//       if (show.buyNowProducts && show.buyNowProducts.length > 0) {
//         show.buyNowProducts = flattenPopulatedProducts(show.buyNowProducts);
//       }
//       if (show.auctionProducts && show.auctionProducts.length > 0) {
//         show.auctionProducts = flattenPopulatedProducts(show.auctionProducts);
//       }
//       if (show.giveawayProducts && show.giveawayProducts.length > 0) {
//         show.giveawayProducts = flattenPopulatedProducts(show.giveawayProducts);
//       }
//       return show;
//     })

//     return res.status(200).json({
//       status: true,
//       message: "seller shows fetched successfully!",
//       data: flattendSellerShows || [],
//     });

//   } catch (error) {
//     console.error("Error in getShowsBySeller:", error.message);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server Error" });
//   }
// };

// export const getMyHostedShows = asyncHandler(async (req, res) => {
//   // req.user should be attached by the 'protect' middleware
//   const user = req.user;

//   if (!user || !user._id) {
//     // Should already be caught by protect, but good defensive check
//     return res.status(401).json({ status: false, message: "Unauthorized: User not found." });
//   }

//   let hostId = null;
//   let hostModel = null;

//   // Determine the host ID and model based on the user's role
//   if (user.role === 'seller' && user.sellerInfo) {
//     hostId = user.sellerInfo; // This is the ObjectId of the Seller document
//     hostModel = 'sellers';
//   } else if (user.role === 'dropshipper' && user.dropshipperInfo) {
//     hostId = user.dropshipperInfo; // This is the ObjectId of the Dropshipper document
//     hostModel = 'dropshippers';
//   }

//   // If the user doesn't have a valid host role/info attached, they can't have hosted shows
//   if (!hostId || !hostModel) {
//     console.warn(`User ${user._id} with role ${user.role} lacks necessary Seller/Dropshipper info to host shows.`);
//     return res.status(200).json({
//       status: true, // Still a successful request, just no data
//       message: "No applicable Seller or Dropshipper profile found for this user.",
//       data: [],
//     });
//     // Alternatively, return 403 Forbidden if they *should* have the info but don't
//     // return res.status(403).json({ status: false, message: "Forbidden: User profile incomplete for hosting." });
//   }

//   try {
//     // Find shows where the host field matches the determined hostId (Seller/Dropshipper ID)
//     // AND the hostModel matches the determined type ('sellers'/'dropshippers')
//     const myShows = await Show.find({ host: hostId, hostModel: hostModel })
//       // Populate product details (adjust fields as needed)
//       .populate({
//         path: "buyNowProducts.productId",
//         select: `-createdAt -updatedAt -__v ${PRODUCT_EXCLUDED_FIELDS || ''}`, // Example: Exclude common fields, add specific excludes
//       })
//       .populate({
//         path: "auctionProducts.productId",
//         select: `-createdAt -updatedAt -__v ${PRODUCT_EXCLUDED_FIELDS || ''}`,
//       })
//       .populate({
//         path: "giveawayProducts.productId",
//         select: `-createdAt -updatedAt -__v ${PRODUCT_EXCLUDED_FIELDS || ''}`,
//       })
//       // Populate host details (optional, as we already know the host)
//       // This confirms the host data hasn't changed drastically since show creation
//       .populate({
//         path: "host", // Path is still 'host'
//         select: "companyName businessName userInfo", // Select fields relevant to Seller/Dropshipper
//         populate: { // Optionally populate the user info within the host
//           path: 'userInfo',
//           select: 'name userName profileURL' // Select basic user info
//         }
//       })
//       .sort({ createdAt: -1 }) // Sort by date/time first, then creation
//       .lean(); // Use .lean() for performance as we are not modifying

//     // Flattening logic might still be needed depending on how frontend consumes product data
//     const flattenedShows = myShows.map((show) => {
//       // Assuming flattenPopulatedProducts works correctly with the populated data
//       // Or adjust/remove flattening if not needed
//       // Example: (Ensure flattenPopulatedProducts is imported/defined)
//       // show.buyNowProducts = flattenPopulatedProducts(show.buyNowProducts || []);
//       // show.auctionProducts = flattenPopulatedProducts(show.auctionProducts || []);
//       // show.giveawayProducts = flattenPopulatedProducts(show.giveawayProducts || []);
//       return show;
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Your hosted shows fetched successfully!",
//       data: flattenedShows || [], // Return flattened or raw populated shows
//     });

//   } catch (error) {
//     console.error("Error in getMyHostedShows:", error);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal Server Error" });
//   }
// });

// export const endShow = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const updatedShow = await Show.findByIdAndUpdate(
//       id,
//       { isLive: false, showStatus: "ended" },
//       { new: true }
//     );

//     if (!updatedShow) {
//       return res.status(404).json({ status: false, message: "Show not found" });
//     }
//     res.status(200).json({
//       status: true,
//       message: "live Stream ended successfully!",
//       data: updatedShow,
//     });
//   } catch (error) {
//     console.error("Error in endShow", error.message);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server error." });
//   }
// };

// // to cancel show
// export const cancelShow = async (req, res) => {
//   try {
//     const { showId } = req.params;

//     const updatedShow = await Show.findByIdAndUpdate(
//       showId,
//       { isLive: false, showStatus: "cancelled" },
//       { new: true }
//     );

//     if (!updatedShow) {
//       return res.status(404).json({ status: false, message: "Show not found" });
//     }
//     res.status(200).json({
//       status: true,
//       message: "show cancelled successfully!",
//       data: updatedShow,
//     });
//   } catch (error) {
//     console.error("Error in cancelShow", error.message);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server error." });
//   }
// };

// // view show details by id
// export const viewShowDetails = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const show = await Show.findById(id);

//     if (!show) {
//       return res
//         .status(404)
//         .json({ status: false, message: "Show not found." });
//     }

//     res.status(200).json({
//       status: true,
//       message: "show fetched successfully",
//       data: show,
//     });
//   } catch (error) {
//     console.error("Error in viewShowDetails", error.message);
//     res.status(500).json({ status: false, message: "internal server error." });
//   }
// };

// export const updateTaggedProductsInAShow = async (req, res) => {
//   const showId = req.params.id;
//   // console.log('Received showId param:', showId); // Log the ID
//   const { buyNowProducts = [], auctionProducts = [], giveawayProducts = [] } = req.body;
//   const userId = req.user._id; // from protect middleware (needed for validation)

//   try {
//     // Fetch the show and its host info to pass to validation
//     const show = await Show.findById(showId).select('host hostModel');
//     if (!show) {
//       return res.status(404).json({ status: false, message: "Show not found." });
//     }

//     // Fetch the host document (needed for validation, especially dropshipper connections)
//     let host;
//     if (show.hostModel === 'sellers') {
//       host = await Seller.findById(show.host);
//     } else if (show.hostModel === 'dropshippers') {
//       // Populate connections needed for validation helper
//       host = await Dropshipper.findById(show.host).populate('connectedSellers.sellerId', '_id');
//       if (host) { // Attach approvedSellerIds like in middleware for helper function
//         host.approvedSellerIds = host.connectedSellers
//           .filter(conn => conn.status === 'approved')
//           .map(conn => conn.sellerId._id);
//       }
//     }

//     if (!host) {
//       console.error(`Host document not found for show ${showId} host ${show.host} model ${show.hostModel}`);
//       return res.status(500).json({ status: false, message: "Internal error: Could not verify host." });
//     }


//     // --- Validate Products ---
//     const buyNowValidation = await validateAndFormatProducts(buyNowProducts, host, show.hostModel);
//     if (!buyNowValidation.valid) {
//       return res.status(400).json({ status: false, message: "Invalid Buy Now products", errors: buyNowValidation.errors });
//     }
//     const auctionValidation = await validateAndFormatProducts(auctionProducts, host, show.hostModel);
//     if (!auctionValidation.valid) {
//       return res.status(400).json({ status: false, message: "Invalid Auction products", errors: auctionValidation.errors });
//     }
//     const giveawayValidation = await validateAndFormatProducts(giveawayProducts, host, show.hostModel);
//     if (!giveawayValidation.valid) {
//       return res.status(400).json({ status: false, message: "Invalid Giveaway products", errors: giveawayValidation.errors });
//     }
//     // --- End Product Validation ---


//     // Perform the update with validated products
//     const updatedShow = await Show.findByIdAndUpdate(
//       showId,
//       {
//         buyNowProducts: buyNowValidation.formattedProducts,
//         auctionProducts: auctionValidation.formattedProducts,
//         giveawayProducts: giveawayValidation.formattedProducts
//       },
//       { new: true } // Return the updated document
//     );

//     // Check if update was successful (findByIdAndUpdate returns null if not found)
//     if (!updatedShow) {
//       // This case might be redundant if the initial show fetch worked, but keep for safety
//       return res.status(404).json({ status: false, message: "Show not found during update." });
//     }

//     return res.status(200).json({ status: true, message: "Tagged products in show updated successfully!", data: updatedShow });

//   } catch (error) {
//     console.error("Error in updateTaggedProductsInAShow:", error);
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ status: false, message: "Validation failed", errors: error.errors });
//     }
//     return res.status(500).json({ status: false, message: "Internal server Error." })
//   }
// }


// // get all shows
// export const getAllShows = async (req, res) => {
//   try {
//     const allShows = await Show.find()
//       .populate({
//         path: "buyNowProducts.productId",
//         select: `${PRODUCT_EXCLUDED_FIELDS}`,
//       })
//       .populate({
//         path: "auctionProducts.productId",
//         select: `${PRODUCT_EXCLUDED_FIELDS}`,
//       })
//       .populate({
//         path: "giveawayProducts.productId",
//         select: `${PRODUCT_EXCLUDED_FIELDS}`,
//       })
//       .sort({ createdAt: -1 });

//     return res
//       .status(200)
//       .json({
//         status: true,
//         message: "all shows fetched successfully",
//         data: allShows || [],
//       });
//   } catch (error) {
//     console.error("Error in getAllShows:", error.message);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server error." });
//   }
// };

// // Delete a show by ID
// export const deleteShow = async (req, res) => {
//   try {
//     const deletedShow = await Show.findByIdAndDelete(req.params.id);

//     if (!deletedShow) {
//       return res
//         .status(404)
//         .json({ status: false, message: "Show not found." });
//     }

//     res
//       .status(200)
//       .json({ status: true, message: "Show deleted successfully." });
//   } catch (error) {
//     console.error("Error in deleteShow:", error.message);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server error." });
//   }
// };

// export const startShow = async (req, res) => {
//   try {

//     console.log(req.body);
//     console.log(req.params);
//     const { id } = req.params;
//     const { liveStreamId } = req.body;

//     const updatedShow = await Show.findByIdAndUpdate(
//       id,
//       {
//         isLive: true,
//         showStatus: "live",
//         liveStreamId,
//       },
//       { new: true }
//     );

//     if (!updatedShow) {
//       return res.status(404).json({ status: false, message: "Show not found" });
//     }

//     res.status(200).json({
//       status: true,
//       message: "Live Stream started successfully!",
//     });
//   } catch (error) {
//     console.error("Error in startShow api:", error.message);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server error." });
//   }
// };


import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Show from "../models/shows.model.js";
import User from "../models/user.model.js";
import CoHostInvite from "../models/coHostInvitation.model.js";
import ProductListing from "../models/productListing.model.js";
import Seller from "../models/seller.model.js";
import Dropshipper from "../models/shipper.model.js";
import { flattenPopulatedProducts, generateStreamName } from "../utils/helper.js";
import { PRODUCT_EXCLUDED_FIELDS } from "../utils/constants.js";


async function validateAndFormatProducts(productList = [], host, hostModel) {
  if (!productList || productList.length === 0) {
    return { valid: true, formattedProducts: [] };
  }

  const formattedProducts = [];
  const errors = [];

  for (const item of productList) {
    if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
      errors.push(`Invalid or missing productId: ${item.productId}`);
      continue;
    }

    const product = await ProductListing.findById(item.productId).select('sellerId');
    if (!product) {
      errors.push(`Product not found: ${item.productId}`);
      continue;
    }

    let isValidProduct = false;
    let productOwnerSellerId = null;

    if (hostModel === 'sellers') {
      // Seller can only add their own products
      if (product.sellerId.equals(host._id)) {
        isValidProduct = true;
        productOwnerSellerId = host._id;
      } else {
        errors.push(`Seller cannot add product ${item.productId} owned by another seller.`);
      }
    } else if (hostModel === 'dropshippers') {
      // Dropshipper can only add products from approved connected sellers
      if (host.approvedSellerIds && host.approvedSellerIds.some(id => id.equals(product.sellerId))) {
        isValidProduct = true;
        productOwnerSellerId = product.sellerId; // Owner is the original seller
      } else {
        errors.push(`Dropshipper cannot add product ${item.productId}. Not connected or approved with seller ${product.sellerId}.`);
      }
    }

    if (isValidProduct) {
      // Format according to showSchema
      formattedProducts.push({
        productId: item.productId,
        productOwnerSellerId: productOwnerSellerId,
        productPrice: item.productPrice,
        startingPrice: item.startingPrice,
        reservedPrice: item.reservedPrice,
        followersOnly: item.followersOnly,
      });
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, formattedProducts };
}



export const createShow = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { showHost, showHostModel, user: hostUser } = req;
    if (!showHost || !showHostModel || !hostUser) {
      return res.status(500).json({ status: false, message: "Internal Server Error: Host details not found." });
    }
    const hostId = showHost._id;

    const {
      title, scheduledAt, category, language, thumbnailImage,
      buyNowProducts = [],
      auctionProducts = [],
      giveawayProducts = [],
      coHost: coHostData = null,
      hasCoHost = false,
      ...otherDetails // Capturing rest of the fields from req.body
    } = req.body;

    if (!title || !scheduledAt || !category || !language || !thumbnailImage) {
      return res.status(400).json({ status: false, message: "Please provide all required fields." });
    }

    // *** FIX: Call the validation function for each product type ***
    const buyNowValidation = await validateAndFormatProducts(buyNowProducts, showHost, showHostModel);
    if (!buyNowValidation.valid) {
        return res.status(400).json({ status: false, message: "Invalid Buy Now products", errors: buyNowValidation.errors });
    }

    const auctionValidation = await validateAndFormatProducts(auctionProducts, showHost, showHostModel);
    if (!auctionValidation.valid) {
        return res.status(400).json({ status: false, message: "Invalid Auction products", errors: auctionValidation.errors });
    }

    const giveawayValidation = await validateAndFormatProducts(giveawayProducts, showHost, showHostModel);
    if (!giveawayValidation.valid) {
        return res.status(400).json({ status: false, message: "Invalid Giveaway products", errors: giveawayValidation.errors });
    }
    
    const newShow = new Show({
      title, scheduledAt, category, language, thumbnailImage,
      ...otherDetails, // Spread the rest of the valid details
      host: hostId,
      hostModel: showHostModel,
      coHost: null, // Co-host is ALWAYS null on creation
      hasCoHost,
      buyNowProducts: buyNowValidation.formattedProducts,
      auctionProducts: auctionValidation.formattedProducts,
      giveawayProducts: giveawayValidation.formattedProducts,
    });

    const savedShow = await newShow.save({ session });

    // If a co-host is specified, create a PENDING invite
    if (hasCoHost && coHostData?.userId) {
      if (String(hostUser._id) === String(coHostData.userId)) {
        throw new Error("You cannot invite yourself as a co-host.");
      }
      
      const cohostUser = await User.findById(coHostData.userId).populate("sellerInfo").populate("dropshipperInfo").lean().session(session);
      if (!cohostUser) throw new Error("Co-host user not found.");

      let cohostHostId = null;
      let cohostHostModel = null;
      if (cohostUser.role === "seller" && cohostUser.sellerInfo) {
        cohostHostId = cohostUser.sellerInfo._id;
        cohostHostModel = "sellers";
      } else if (cohostUser.role === "dropshipper" && cohostUser.dropshipperInfo) {
        cohostHostId = cohostUser.dropshipperInfo._id;
        cohostHostModel = "dropshippers";
      } else {
        throw new Error("Invited co-host must be a registered Seller or Dropshipper.");
      }

      const newInvite = new CoHostInvite({
        show: savedShow._id,
        host: { userId: hostUser._id, hostId: hostId, hostModel: showHostModel },
        cohost: { userId: cohostUser._id, hostId: cohostHostId, hostModel: cohostHostModel },
        status: "pending",
      });
      await newInvite.save({ session });
    }

    await session.commitTransaction();
    res.status(201).json({
      status: true,
      message: hasCoHost ? "Show created and co-host invite sent!" : "Show created successfully!",
      data: savedShow,
    });

  } catch (error) {
    await session.abortTransaction();
    // This console.warn was likely the source of the log you saw
    console.error("Error in createShow:", error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ status: false, message: "Validation failed", errors: error.errors });
    }
    res.status(400).json({ status: false, message: error.message || "Failed to create show." });
  } finally {
    session.endSession();
  }
};


/**
 * Update a show by its ID.
 */
export const updateShow = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const showId = req.params.id;
    const { coHost: newCohostData, hasCoHost, ...updatedDetails } = req.body;
    const { user: hostUser, showHost, showHostModel } = req;

    const show = await Show.findById(showId).session(session);
    if (!show) {
      await session.abortTransaction();
      return res.status(404).json({ status: false, message: "Show not found" });
    }

    const existingInvite = await CoHostInvite.findOne({ 
        show: showId, 
        status: { $in: ["pending", "accepted"] } 
    }).session(session);
    
    let cohostChanged = false;
    if (existingInvite) {
        // A cohost was removed, or a different cohost was chosen
        if (!hasCoHost || (newCohostData && String(existingInvite.cohost.userId) !== String(newCohostData.userId))) {
            cohostChanged = true;
        }
    } else if (hasCoHost && newCohostData?.userId) {
        // A new cohost was added where there was none before
        cohostChanged = true;
    }

    if (cohostChanged && existingInvite) {
        existingInvite.status = "cancelled";
        existingInvite.reason = existingInvite.status === 'accepted' ? 'HOST_REPLACED' : 'HOST_CANCELLED_PENDING';
        await existingInvite.save({ session });
        // If the cancelled co-host had already been accepted, remove them from the show
        if(existingInvite.status === 'accepted'){
            show.coHost = null;
        }
    }

    // If there's a new co-host to invite
    if (hasCoHost && newCohostData?.userId && cohostChanged) {
        // ... (logic to find new cohostUser and determine their hostId/Model)
        const cohostUser = await User.findById(newCohostData.userId).populate("sellerInfo").populate("dropshipperInfo").lean().session(session);
        if (!cohostUser) throw new Error("New co-host user not found.");
        // ... (determine new cohostHostId and cohostHostModel)

        const newInvite = new CoHostInvite({
            show: show._id,
            host: { userId: hostUser._id, hostId: showHost._id, hostModel: showHostModel },
            cohost: { userId: cohostUser._id, hostId: cohostHostId, hostModel: cohostHostModel },
            status: "pending",
        });
        await newInvite.save({ session });
    }
    
    // If co-host is explicitly removed
    if (!hasCoHost) {
        show.coHost = null;
    }

    Object.assign(show, updatedDetails, { hasCoHost });
    show.markModified('buyNowProducts'); // etc.
    const savedShow = await show.save({ session });
    
    await session.commitTransaction();
    res.status(200).json({ status: true, message: "Show details updated successfully!", data: savedShow });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in updateShow:", error.message);
    res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  } finally {
    session.endSession();
  }
};

/**
 * Get a single show by its ID, populating and flattening product details.
 */
export const getShowById = async (req, res) => {
  const { id } = req.params;
  try {
    const show = await Show.findById(id)
      .populate({ path: "buyNowProducts.productId", select: `${PRODUCT_EXCLUDED_FIELDS}` })
      .populate({ path: "auctionProducts.productId", select: `${PRODUCT_EXCLUDED_FIELDS}` })
      .populate({ path: "giveawayProducts.productId", select: `${PRODUCT_EXCLUDED_FIELDS}` })
      .lean();

    if (!show) {
      return res.status(404).json({ status: false, message: "show not found" });
    }

    if (show.buyNowProducts?.length > 0) show.buyNowProducts = flattenPopulatedProducts(show.buyNowProducts);
    if (show.auctionProducts?.length > 0) show.auctionProducts = flattenPopulatedProducts(show.auctionProducts);
    if (show.giveawayProducts?.length > 0) show.giveawayProducts = flattenPopulatedProducts(show.giveawayProducts);

    return res.status(200).json({ status: true, message: "show fetched successfully", data: show });
  } catch (error) {
    console.error("Error in getShowById:", error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
};

/**
 * Get all shows hosted by the currently authenticated user.
 */
export const getMyHostedShows = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user?._id) {
    return res.status(401).json({ status: false, message: "Unauthorized: User not found." });
  }

  let hostId = null, hostModel = null;
  if (user.role === 'seller' && user.sellerInfo) {
    hostId = user.sellerInfo;
    hostModel = 'sellers';
  } else if (user.role === 'dropshipper' && user.dropshipperInfo) {
    hostId = user.dropshipperInfo;
    hostModel = 'dropshippers';
  }

  if (!hostId || !hostModel) {
    return res.status(200).json({ status: true, message: "No applicable Seller or Dropshipper profile found.", data: [] });
  }

  const myShows = await Show.find({ host: hostId, hostModel: hostModel })
    .populate({ path: "buyNowProducts.productId", select: `-createdAt -updatedAt -__v ${PRODUCT_EXCLUDED_FIELDS || ''}`})
    .populate({ path: "auctionProducts.productId", select: `-createdAt -updatedAt -__v ${PRODUCT_EXCLUDED_FIELDS || ''}`})
    .populate({ path: "giveawayProducts.productId", select: `-createdAt -updatedAt -__v ${PRODUCT_EXCLUDED_FIELDS || ''}`})
    .populate({ path: "host", select: "companyName businessName userInfo", populate: { path: 'userInfo', select: 'name userName profileURL' }})
    .sort({ createdAt: -1 }).lean();
  
  // You can flatten products here if needed before sending response
  // const flattenedShows = myShows.map(show => { ... });

  return res.status(200).json({ status: true, message: "Your hosted shows fetched successfully!", data: myShows || [] });
});

/**
 * Get all shows for a specific seller (Legacy - getMyHostedShows is more generic).
 */
export const getShowsBySellerId = async (req, res) => {
  const { seller } = req;
  const { _id } = seller;
  try {
    const sellerShows = await Show.find({ host: _id, hostModel: 'sellers' })
      .populate({ path: "buyNowProducts.productId", select: `${PRODUCT_EXCLUDED_FIELDS}` })
      .populate({ path: "auctionProducts.productId", select: `${PRODUCT_EXCLUDED_FIELDS}` })
      .populate({ path: "giveawayProducts.productId", select: `${PRODUCT_EXCLUDED_FIELDS}` })
      .sort({ createdAt: -1 }).lean();

    const flattenedSellerShows = sellerShows.map((show) => {
      if (show.buyNowProducts?.length > 0) show.buyNowProducts = flattenPopulatedProducts(show.buyNowProducts);
      if (show.auctionProducts?.length > 0) show.auctionProducts = flattenPopulatedProducts(show.auctionProducts);
      if (show.giveawayProducts?.length > 0) show.giveawayProducts = flattenPopulatedProducts(show.giveawayProducts);
      return show;
    });

    return res.status(200).json({ status: true, message: "Seller shows fetched successfully!", data: flattenedSellerShows || [] });
  } catch (error) {
    console.error("Error in getShowsBySeller:", error.message);
    return res.status(500).json({ status: false, message: "Internal server Error" });
  }
};

/**
 * Get all shows from the database.
 */
export const getAllShows = async (req, res) => {
  try {
    const allShows = await Show.find()
      .populate({ path: "buyNowProducts.productId", select: `${PRODUCT_EXCLUDED_FIELDS}` })
      .populate({ path: "auctionProducts.productId", select: `${PRODUCT_EXCLUDED_FIELDS}` })
      .populate({ path: "giveawayProducts.productId", select: `${PRODUCT_EXCLUDED_FIELDS}` })
      .sort({ createdAt: -1 });

    return res.status(200).json({ status: true, message: "All shows fetched successfully", data: allShows || [] });
  } catch (error) {
    console.error("Error in getAllShows:", error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
};

/**
 * Start a show, updating its status to 'live'.
 */

export const startShow = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params; // showId
    const { liveStreamId } = req.body;
    
    const updatedShow = await Show.findByIdAndUpdate(id, 
        { showStatus: "live", liveStreamId }, 
        { new: true, session }
    );
    if (!updatedShow) {
        throw new Error("Show not found during update.");
    }

    // *** SIMPLIFIED LOGIC ***
    // Find the accepted co-host invite and simply update it with the liveStreamId.
    const acceptedInvite = await CoHostInvite.findOneAndUpdate(
        { show: id, status: "accepted" },
        { $set: { liveStreamId: liveStreamId } },
        { new: true, session }
    );

    if (acceptedInvite) {
        console.log(`Updated co-host invite ${acceptedInvite._id} with liveStreamId: ${liveStreamId}`);
    }

    await session.commitTransaction();
    res.status(200).json({ status: true, message: "Live Stream started successfully!", data: updatedShow });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in startShow:", error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  } finally {
    session.endSession();
  }
};

/**
 * End a show, updating its status to 'ended'.
 */
export const endShow = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShow = await Show.findByIdAndUpdate(id, { isLive: false, showStatus: "ended" }, { new: true });

    if (!updatedShow) return res.status(404).json({ status: false, message: "Show not found" });

    res.status(200).json({ status: true, message: "Live Stream ended successfully!", data: updatedShow });
  } catch (error) {
    console.error("Error in endShow", error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
};

/**
 * Cancel a show, updating its status to 'cancelled'.
 */
export const cancelShow = async (req, res) => {
  try {
    const { showId } = req.params;
    const updatedShow = await Show.findByIdAndUpdate(showId, { showStatus: "cancelled" }, { new: true });

    if (!updatedShow) return res.status(404).json({ status: false, message: "Show not found" });

    res.status(200).json({ status: true, message: "Show cancelled successfully!", data: updatedShow });
  } catch (error) {
    console.error("Error in cancelShow", error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
};

/**
 * Update the tagged products for a specific show.
 */
export const updateTaggedProductsInAShow = async (req, res) => {
  const showId = req.params.id;
  const { buyNowProducts = [], auctionProducts = [], giveawayProducts = [] } = req.body;

  try {
    const show = await Show.findById(showId).select('host hostModel');
    if (!show) return res.status(404).json({ status: false, message: "Show not found." });

    let host;
    if (show.hostModel === 'sellers') {
      host = await Seller.findById(show.host);
    } else if (show.hostModel === 'dropshippers') {
      host = await Dropshipper.findById(show.host).populate('connectedSellers.sellerId', '_id');
      if (host) {
        host.approvedSellerIds = host.connectedSellers
          .filter(conn => conn.status === 'approved')
          .map(conn => conn.sellerId._id);
      }
    }
    if (!host) return res.status(500).json({ status: false, message: "Internal error: Could not verify host." });

    const buyNowValidation = await validateAndFormatProducts(buyNowProducts, host, show.hostModel);
    if (!buyNowValidation.valid) return res.status(400).json({ status: false, message: "Invalid Buy Now products", errors: buyNowValidation.errors });
    const auctionValidation = await validateAndFormatProducts(auctionProducts, host, show.hostModel);
    if (!auctionValidation.valid) return res.status(400).json({ status: false, message: "Invalid Auction products", errors: auctionValidation.errors });
    const giveawayValidation = await validateAndFormatProducts(giveawayProducts, host, show.hostModel);
    if (!giveawayValidation.valid) return res.status(400).json({ status: false, message: "Invalid Giveaway products", errors: giveawayValidation.errors });

    const updatedShow = await Show.findByIdAndUpdate(
      showId,
      {
        buyNowProducts: buyNowValidation.formattedProducts,
        auctionProducts: auctionValidation.formattedProducts,
        giveawayProducts: giveawayValidation.formattedProducts
      },
      { new: true }
    );

    if (!updatedShow) return res.status(404).json({ status: false, message: "Show not found during update." });

    return res.status(200).json({ status: true, message: "Tagged products updated successfully!", data: updatedShow });

  } catch (error) {
    console.error("Error in updateTaggedProductsInAShow:", error);
    if (error.name === 'ValidationError') return res.status(400).json({ status: false, message: "Validation failed", errors: error.errors });
    return res.status(500).json({ status: false, message: "Internal server Error." });
  }
};

/**
 * Get public details for a single show.
 */
export const viewShowDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const show = await Show.findById(id);
    if (!show) return res.status(404).json({ status: false, message: "Show not found." });
    res.status(200).json({ status: true, message: "Show fetched successfully", data: show });
  } catch (error) {
    console.error("Error in viewShowDetails", error.message);
    res.status(500).json({ status: false, message: "internal server error." });
  }
};

/**
 * Delete a show by its ID.
 */
export const deleteShow = async (req, res) => {
  try {
    const deletedShow = await Show.findByIdAndDelete(req.params.id);
    if (!deletedShow) return res.status(404).json({ status: false, message: "Show not found." });
    
    // Also delete any related co-host invites
    await CoHostInvite.deleteMany({ show: req.params.id });
    
    res.status(200).json({ status: true, message: "Show and any related invites deleted successfully." });
  } catch (error) {
    console.error("Error in deleteShow:", error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
};