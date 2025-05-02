import ProductListing from "../models/productListing.model.js";
import ShoppableVideo from "../models/shoppableVideo.model.js";
import Show from "../models/shows.model.js";
import { USER_FEED_PRODUCTS_FIELDS, USER_FEED_SHOPPABLE_VIDEOS_FIELDS, USER_FEED_SHOWS_FIELDS } from "../utils/constants.js";


  // get all products 
export const getAllProducts = async ( req, res ) => {

    try {
      const allProducts = await ProductListing.find()
      .select(USER_FEED_PRODUCTS_FIELDS)
      .populate(
        {
          path: "sellerId",
          select: "userInfo companyName",
          populate: {
              path: "userInfo",
              select: "userName profileURL"
          }
      }
      )
      .sort({
        createdAt: -1,
      });

      res
        .status(200)
        .json({
          status: true,
          message: "Product's fetched successfully!",
          data: allProducts || [],
        });
    } catch (error) {
      console.error("Error in getAllProducts:", error.message);
      res.status(500).json({ status: false, message: "Internal server Error." });
    }
}

  // get all shows 
  export const getAllShows = async ( req, res ) => {

    try {
      const allShows = await Show.find({
        showStatus: { $in: ["created","live"]}
        })
        .select(USER_FEED_SHOWS_FIELDS)
        .sort({ createdAt: -1 })
        // .populate({
        //   path: "host", // Path is still 'host'
        //   select: "companyName businessName userInfo", // Select fields relevant to Seller/Dropshipper
        //   populate: { // Optionally populate the user info within the host
        //     path: 'userInfo',
        //     select: 'name userName profileURL' // Select basic user info
        //   }
        // })
        .populate({
            path: "sellerId",
            select: "userInfo companyName",
            populate: {
                path: "userInfo",
                select: "userName profileURL"
            }
        })
        .lean();
  
      return res.status(200).json({
        status: true,
        message: "shows fetched successfully!",
        data: allShows || [],
      });
  
    } catch (error) {
      console.error("Error in getAllShows:", error.message);
      return res
        .status(500)
        .json({ status: false, message: "Internal server Error" });
    }
}

  // get all shoppable videos 
  export const getAllShoppableVideos = async ( req, res ) => {

    try {
      const allShoppableVideos = await ShoppableVideo.find()
        .select(USER_FEED_SHOPPABLE_VIDEOS_FIELDS)
        .sort({ createdAt: -1 })
        .populate({
            path: "sellerId",
            select: "userInfo companyName",
            populate: {
                path: "userInfo",
                select: "userName profileURL"
            }
        })
        .lean();
  
      return res.status(200).json({
        status: true,
        message: "Shoppable videos fetched successfully!",
        data: allShoppableVideos || [],
      });
  
    } catch (error) {
      console.error("Error in getAllShoppableVideos:", error.message);
      return res
        .status(500)
        .json({ status: false, message: "Internal server Error" });
    }
}