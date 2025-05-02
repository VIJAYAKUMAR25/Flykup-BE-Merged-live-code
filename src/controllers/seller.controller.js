import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
import { SELLER_PUBLIC_FIELDS, USER_PUBLIC_FIELDS } from "../utils/constants.js";

// get seller details by id 

export const getSellerDetailsById = async ( req, res ) => {
  let sellerId;

  if(req.seller){
    sellerId = req.seller._id;
  }else if (req.params.id){
    sellerId = req.params.id;
  }else {
    return res.status(400).json({
      status: false,
      message: "Seller id is required"
    })
  }
  try {
    const seller = await Seller.findById(sellerId).select(SELLER_PUBLIC_FIELDS).populate("userInfo", USER_PUBLIC_FIELDS).lean();

    if(!seller){
      return res.status(404).json({ status: false, message: "Seller not found"});
    }

    return res.status(200).json({ status: true, message: "seller fetched successfully", data: seller});
  } catch (error) {
    console.error("Error in getSellerDetailsById:", error.message);
    return res.status(500).json({ status: false , message: "Internal server error."})
  }
}

// admin panel related

export const createSeller = async (req, res) => {
  const { userInfo, basicInfo, aadharInfo, addressInfo } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userInfo);
    if (!user) {
      return res.status(404).json({
        status: false,
        data: "User not found",
      });
    }

    // Check if the seller request already exists for the user
    const existingDetails = await Seller.findOne({ userInfo: userInfo });
    if (existingDetails) {
      return res.status(400).json({
        status: false,
        data: "Existing! Can't send request again.",
      });
    }

    // If officeAddress is provided and sameAsOffice is true, set homeAddress to officeAddress
    if (addressInfo.officeAddress && addressInfo.sameAsOffice) {
      addressInfo.homeAddress = { ...addressInfo.officeAddress };
    }

    // Create a new seller request
    const newRequest = new Seller({
      userInfo: userInfo,
      basicInfo,
      aadharInfo,
      addressInfo,
      approvalStatus: "approved", // Default status
    });

    await newRequest.save();

    // Update the user's sellerInfo reference
    user.sellerInfo = newRequest._id;
    await user.save();

    return res.status(201).json({
      status: true,
      data: "Seller created successfully",
      seller: newRequest,
    });
  } catch (error) {
    console.error("Error in createSeller:", error.message);
    return res.status(500).json({
      status: false,
      data: "Internal Server Error. Please try again later.",
    });
  }
};

// Get a seller by ID
export const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).send();
    }
    res.send(seller);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get all approved sellers
export const getAllApprovedSellers = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 50;
  limit = limit > 50 ? 50 : limit;
  let skip = (page - 1) * limit;

  // search query
  const searchQuery = req.query.search || "";
  let searchFilter = {};

  if (searchQuery) {
    searchFilter = {
      $or: [
        { "basicInfo.name": { $regex: searchQuery, $options: "i"}},
        { "basicInfo.phone": { $regex: searchQuery, $options: "i"}},
        { "basicInfo.email": { $regex: searchQuery, $options: "i"}},
        { "basicInfo.gstNumber": { $regex: searchQuery, $options: "i"}},
        { "aadharInfo.aadharNumber": { $regex: searchQuery, $options: "i"}}
      ],
    };
  }
  try {
    const filter = {
      approvalStatus: "approved",
      ...searchFilter,
    };

    // seller type filtering
    const sellerType = req.query.filterSellerType || 'all';
    if(sellerType !== 'all'){
      filter["basicInfo.businessType"] = sellerType;
    }

    const totalCount = await Seller.countDocuments(filter);

    const approvedSellers = await Seller.find(filter)
      .populate({path: "userInfo", select: "accessAllowed userName emailId"})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();    

    return res
      .status(200)
      .json({ status: true, message:"all sellers fetched successfully!", data: approvedSellers || [], totalCount });
  } catch (error) {
    console.error("Error in getAllApprovedSellers:", error.message);
    return res
      .status(500)
      .json({
        status: false,
        message: "Internal server error. Please try again later.",
      });
  }
};

// Update a seller by ID
export const updateSeller = async (req, res) => {
  const payload = req.body; // Get the payload from the request body

  try {
    // Find the seller by ID and update it with the payload
    const seller = await Seller.findByIdAndUpdate(req.params.id, payload, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on the update
    });

    // If no seller is found, return a 404 error
    if (!seller) {
      return res.status(404).send({ error: "Seller not found" });
    }

    // Send the updated seller as the response
    res.send(seller);
  } catch (error) {
    // Handle any errors (e.g., validation errors)
    res.status(400).send(error);
  }
};

// Delete a seller by ID
export const deleteSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findById(id);

    if (!seller) {
      return res
        .status(404)
        .json({ status: false, message: "Seller not found" });
    }

    const user = await User.findById(seller.userInfo);

    if (user) {
      user.role = "user";
      await user.save();
    }

    await Seller.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ status: true, message: "Seller deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSeller:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// allow or restrict seller access
export const toggleSellerAccessAdmin = async (req,res) => {
  const { sellerId } = req.params;
  const { accessAllowed } = req.body;
  try {
    const user = await User.findOne({sellerInfo: sellerId});

    if(!user){
      return res.status(404).json({ status: false, message:"user data not found"});
    }

    user.accessAllowed = accessAllowed;
    await user.save();

    return res.status(200).json({
      status: true,
      message:`seller access is ${accessAllowed ? "enabled." : "disabled."}`
    })
  } catch (error) {
    console.error("Error in sellerAccessToggle:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later."
    });
  }
}

