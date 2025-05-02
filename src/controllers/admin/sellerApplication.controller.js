import {
  sendApplicationAccepted,
  sendApplicationRejected,
} from "../../email/send.js";
import Seller from "../../models/seller.model.js";
import User from "../../models/user.model.js";


export const reviewSellerApplication = async (req, res) => {
  const { sellerId, approvalStatus, rejectedReason } = req.body;

  try {
    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return res.status(404).json({
        status: false,
        message: "seller application not found.",
      });
    }

    const user = await User.findById(seller.userInfo);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }

    if (approvalStatus === "approved" || approvalStatus === "rejected") {
      seller.approvalStatus = approvalStatus;

      if (approvalStatus === "rejected" && rejectedReason) {
        seller.rejectedReason = rejectedReason;
        user.role = "user";
        await user.save();

        // application rejected email
        sendApplicationRejected(
          user.emailId,
          user.userName,
          rejectedReason
        ).catch((error) =>
          console.error("Error sending welcome email:", error.message)
        );
      } else if (approvalStatus === "approved") {
        seller.rejectedReason = null;

        user.role = "seller";
        await user.save();

        // application approved email
        sendApplicationAccepted(user.emailId, user.userName).catch((error) =>
          console.error("Error sending welcome email:", error.message)
        );
      }

      await seller.save();

      return res.status(200).json({
        status: true,
        message: `Seller request has been ${approvalStatus}.`,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid approval status. Use 'approved' or 'rejected'.",
      });
    }
  } catch (error) {
    console.error("Error in reviewBecomeSellerRequest:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getOldPendingApplications = async (req, res) => {
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
        { "basicInfo.name": { $regex: searchQuery, $options: "i" } },
        { "basicInfo.phone": { $regex: searchQuery, $options: "i" } },
        { "basicInfo.email": { $regex: searchQuery, $options: "i" } },
        { "basicInfo.gstNumber": { $regex: searchQuery, $options: "i" } },
        { "aadharInfo.aadharNumber": { $regex: searchQuery, $options: "i" } },
      ],
    };
  }

  try {
    const filter = {
      approvalStatus: "pending",
      basicInfo: { $exists: true },
      ...searchFilter,
    };

    // Seller type filtering
    const sellerType = req.query.filterSellerType || "all";
    if (sellerType !== "all") {
      filter["basicInfo.businessType"] = sellerType;
    }

    const totalCount = await Seller.countDocuments(filter);

    const oldApplicationsPending = await Seller.find(filter)
      .populate("userInfo", "name emailId userName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      status: true,
      message: "Old seller applications - pending : fetched successfully!",
      data: oldApplicationsPending || [],
      totalCount,
    });
  } catch (error) {
    console.error("Error in getOldPendingApplications:", error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

export const getNewPendingApplications = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 50;
  limit = limit > 50 ? 50 : limit;
  let skip = (page - 1) * limit;

  // Search query
  const searchQuery = req.query.search || "";
  let searchFilter = {};

  if (searchQuery) {
    searchFilter = {
      $or: [
        { companyName: { $regex: searchQuery, $options: "i" } },
        { mobileNumber: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        { "gstInfo.gstNumber": { $regex: searchQuery, $options: "i" } },
        { "aadhaarInfo.aadhaarNumber": { $regex: searchQuery, $options: "i" } },
      ],
    };
  }

  try {
    const filter = {
      approvalStatus: "pending",
      basicInfo: { $exists: false },
      ...searchFilter,
    };

    // Seller type filtering
    const sellerType = req.query.filterSellerType || "all";
    if (sellerType !== "all") {
      filter["sellerType"] = sellerType;
    }

    const totalCount = await Seller.countDocuments(filter);

    const newApplicationsPending = await Seller.find(filter)
      .populate("userInfo", "name emailId userName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      status: true,
      message: "New seller applications - pending : fetched successfully!",
      data: newApplicationsPending || [],
      totalCount,
    });
  } catch (error) {
    console.error("Error in getNewPendingApplications:", error.message);
    res.status(500).json({
      status: false,
      message: "Internal Server Error.",
    });
  }
};

export const getOldApprovedApplications = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 50;
  limit = limit > 50 ? 50 : limit;
  let skip = (page - 1) * limit;

  // Search query
  const searchQuery = req.query.search || "";
  let searchFilter = {};

  if (searchQuery) {
    searchFilter = {
      $or: [
        { "basicInfo.name": { $regex: searchQuery, $options: "i" } },
        { "basicInfo.phone": { $regex: searchQuery, $options: "i" } },
        { "basicInfo.email": { $regex: searchQuery, $options: "i" } },
        { "basicInfo.gstNumber": { $regex: searchQuery, $options: "i" } },
        { "aadharInfo.aadharNumber": { $regex: searchQuery, $options: "i" } },
      ],
    };
  }

  try {
    const filter = {
      approvalStatus: "approved",
      basicInfo: { $exists: true },
      ...searchFilter,
    };

    // Seller type filtering
    const sellerType = req.query.filterSellerType || "all";
    if (sellerType !== "all") {
      filter["basicInfo.businessType"] = sellerType;
    }

    const totalCount = await Seller.countDocuments(filter);

    const approvedSellers = await Seller.find(filter)
      .populate({ path: "userInfo", select: "accessAllowed userName emailId" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      status: true,
      message: "Old approved sellers fetched successfully!",
      data: approvedSellers || [],
      totalCount,
    });
  } catch (error) {
    console.error("Error in getOldApprovedApplications:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getNewApprovedApplications = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 50;
  limit = limit > 50 ? 50 : limit;
  let skip = (page - 1) * limit;

  // Search query
  const searchQuery = req.query.search || "";
  let searchFilter = {};

  if (searchQuery) {
    searchFilter = {
      $or: [
        { companyName: { $regex: searchQuery, $options: "i" } },
        { mobileNumber: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        { "gstInfo.gstNumber": { $regex: searchQuery, $options: "i" } },
        { "aadhaarInfo.aadhaarNumber": { $regex: searchQuery, $options: "i" } },
      ],
    };
  }

  try {
    const filter = {
      approvalStatus: "approved",
      basicInfo: { $exists: false },
      ...searchFilter,
    };

    // Seller type filtering
    const sellerType = req.query.filterSellerType || "all";
    if (sellerType !== "all") {
      filter["sellerType"] = sellerType;
    }

    const totalCount = await Seller.countDocuments(filter);

    const approvedSellers = await Seller.find(filter)
      .populate({ path: "userInfo", select: "accessAllowed userName emailId" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      status: true,
      message: "New approved sellers fetched successfully!",
      data: approvedSellers || [],
      totalCount,
    });
  } catch (error) {
    console.error("Error in getNewApprovedApplications:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getOldPendingApplicationsCount = async (req, res) => {
  try {
    const pendingReqCount = await Seller.countDocuments({
      approvalStatus: "pending",
      basicInfo: { $exists: true },
    });

    return res.status(200).json({
      status: true,
      message: "Pending old schema application count fetched successfully!",
      data: pendingReqCount || 0,
    });
  } catch (error) {
    console.error("Error in getOldPendingApplicationsCount:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

export const getNewPendingApplicationsCount = async (req, res) => {
  try {
    const pendingReqCount = await Seller.countDocuments({
      approvalStatus: "pending",
      basicInfo: { $exists: false },
    });

    return res.status(200).json({
      status: true,
      message: "Pending new schema application count fetched successfully!",
      data: pendingReqCount || 0,
    });
  } catch (error) {
    console.error("Error in getNewPendingApplicationsCount:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

export const getOldApprovedApplicationsCount = async (req, res) => {
  try {
    const sellersCount = await Seller.countDocuments({
      approvalStatus: "approved",
      basicInfo: { $exists: true },
    });

    return res.status(200).json({
      status: true,
      message: "Approved old schema sellers count fetched successfully!",
      data: sellersCount || 0,
    });
  } catch (error) {
    console.error("Error in getOldApprovedApplicationsCount:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

export const getNewApprovedApplicationsCount = async (req, res) => {
  try {
    const sellersCount = await Seller.countDocuments({
      approvalStatus: "approved",
      basicInfo: { $exists: false },
    });

    return res.status(200).json({
      status: true,
      message: "Approved new schema sellers count fetched successfully!",
      data: sellersCount || 0,
    });
  } catch (error) {
    console.error("Error in getNewApprovedApplicationsCount:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
