import { sendApplicationReceived } from "../email/send.js";
import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
import { USER_PUBLIC_FIELDS } from "../utils/constants.js";

export const applyAsSeller = async (req, res) => {
  const userId = req.user._id;
  const formData = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const existingDetails = await Seller.findOne({ userInfo: userId });

    if (existingDetails) {
      return res.status(400).json({
        status: false,
        message: "Existing! Can't send request again.",
      });
    }

    // Check for existing Aadhar number in Seller collection
    const existingAadhaar = await Seller.findOne({
      "aadhaarInfo.aadhaarNumber": formData.aadhaarInfo.aadhaarNumber,
    });

    if (existingAadhaar) {
      return res.status(400).json({
        status: false,
        message: "Aadhaar number is already linked with another account.",
      });
    }

    const newRequest = new Seller({
      userInfo: userId,
      ...formData,
    });

    await newRequest.save();

    user.sellerInfo = newRequest._id;
    user.filledNewSellerForm = true; // for new users
    await user.save();

    // application confirmation email
    sendApplicationReceived(user.emailId, user.userName).catch((error) =>
      console.error("Error sending welcome email:", error.message)
    );

    const updatedUserDataWithSellerData = await User.findById(userId)
      .select(USER_PUBLIC_FIELDS)
      .populate("sellerInfo", "approvalStatus rejectedReason");

    return res.status(200).json({
      status: true,
      message:
        "Your seller request has been submitted successfully and is under review.",
      data: updatedUserDataWithSellerData,
    });
  } catch (error) {
    console.error("Error in applyAsSeller:", error.message);

    // Handle MongoDB duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Aadhaar number is already linked with another account.",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const reapplyAsSeller = async (req, res) => {
  const userId = req.user._id;
  const formData = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    let seller = await Seller.findOne({ userInfo: userId }).lean();
    if (!seller) {
      return res.status(404).json({
        status: false,
        message: "Seller Application not found.",
      });
    }

    // To get new data from existing seller , commenting this logic

    // if (seller.approvalStatus !== "rejected") {
    //   return res.status(400).json({
    //     status: false,
    //     message: "You can only update details if your request was rejected.",
    //   });
    // }

    // ** Update and Unset Old Fields**
    const updateResult = await Seller.updateOne(
      { userInfo: userId },
      {
        $set: {
          ...formData,
          approvalStatus: "pending",
          rejectedReason: null,
        },
        $unset: { basicInfo: "", aadharInfo: "", addressInfo: "" },
      },
      { strict: false }
    );

    // update status as new seller form filled
    await User.updateOne(
      { _id: userId },
      { $set: { filledNewSellerForm: true } }
    );

    // **Send Updated Response**
    const updatedUserDataWithSellerData = await User.findById(userId)
      .select(USER_PUBLIC_FIELDS)
      .populate("sellerInfo", "approvalStatus rejectedReason");

    return res.status(200).json({
      status: true,
      message:
        "Details updated successfully. Your application is now pending for review.",
      data: updatedUserDataWithSellerData,
    });
  } catch (error) {
    console.error("Error in reapplyAsSeller:", error.message);

    // Handle MongoDB duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Aadhaar number is already linked with another account.",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const sellerApplicationStatus = async (req, res) => {
  const userId = req.user._id;
  try {
    const sellerApplication = await Seller.findOne({ userInfo: userId });

    if (!sellerApplication) {
      return res.status(404).json({
        status: false,
        message: "sellerApplication not found.",
      });
    }

    const user = await User.findById(userId)
      .select(USER_PUBLIC_FIELDS)
      .populate({
        path: "sellerInfo",
        select: "approvalStatus rejectedReason -_id",
      })
      .lean();

    const flattenedUser = user.sellerInfo
      ? { ...user, ...user.sellerInfo }
      : user;

    if (flattenedUser.sellerInfo) {
      delete flattenedUser.sellerInfo;
    }

    return res.status(200).json({
      status: true,
      message: "seller application status fetched successfully!",
      data: flattenedUser,
    });
  } catch (error) {
    console.error("Error in sellerApplicationStatus:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};
