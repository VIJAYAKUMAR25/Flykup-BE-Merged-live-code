// import { sendApplicationReceived } from "../email/send.js";
// import Seller from "../models/seller.model.js";
// import User from "../models/user.model.js";
// import { USER_PUBLIC_FIELDS } from "../utils/constants.js";

// export const applyAsSeller = async (req, res) => {
//   const userId = req.user._id;
//   const formData = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found",
//       });
//     }

//     const existingDetails = await Seller.findOne({ userInfo: userId });

//     if (existingDetails) {
//       return res.status(400).json({
//         status: false,
//         message: "Existing! Can't send request again.",
//       });
//     }

//     // Check for existing Aadhar number in Seller collection
//     const existingAadhaar = await Seller.findOne({
//       "aadhaarInfo.aadhaarNumber": formData.aadhaarInfo.aadhaarNumber,
//     });

//     if (existingAadhaar) {
//       return res.status(400).json({
//         status: false,
//         message: "Aadhaar number is already linked with another account.",
//       });
//     }

//     const newRequest = new Seller({
//       userInfo: userId,
//       ...formData,
//     });

//     await newRequest.save();

//     user.sellerInfo = newRequest._id;
//     user.filledNewSellerForm = true; // for new users
//     await user.save();

//     // application confirmation email
//     sendApplicationReceived(user.emailId, user.userName).catch((error) =>
//       console.error("Error sending welcome email:", error.message)
//     );

//     const updatedUserDataWithSellerData = await User.findById(userId)
//       .select(USER_PUBLIC_FIELDS)
//       .populate("sellerInfo", "approvalStatus rejectedReason");

//     return res.status(200).json({
//       status: true,
//       message:
//         "Your seller request has been submitted successfully and is under review.",
//       data: updatedUserDataWithSellerData,
//     });
//   } catch (error) {
//     console.error("Error in applyAsSeller:", error.message);

//     // Handle MongoDB duplicate key error specifically
//     if (error.code === 11000) {
//       return res.status(400).json({
//         status: false,
//         message: "Aadhaar number is already linked with another account.",
//       });
//     }

//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     });
//   }
// };

// export const reapplyAsSeller = async (req, res) => {
//   const userId = req.user._id;
//   const formData = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found",
//       });
//     }

//     let seller = await Seller.findOne({ userInfo: userId }).lean();
//     if (!seller) {
//       return res.status(404).json({
//         status: false,
//         message: "Seller Application not found.",
//       });
//     }

//     // To get new data from existing seller , commenting this logic

//     // if (seller.approvalStatus !== "rejected") {
//     //   return res.status(400).json({
//     //     status: false,
//     //     message: "You can only update details if your request was rejected.",
//     //   });
//     // }

//     // ** Update and Unset Old Fields**
//     const updateResult = await Seller.updateOne(
//       { userInfo: userId },
//       {
//         $set: {
//           ...formData,
//           approvalStatus: "pending",
//           rejectedReason: null,
//         },
//         $unset: { basicInfo: "", aadharInfo: "", addressInfo: "" },
//       },
//       { strict: false }
//     );

//     // update status as new seller form filled
//     await User.updateOne(
//       { _id: userId },
//       { $set: { filledNewSellerForm: true } }
//     );

//     // **Send Updated Response**
//     const updatedUserDataWithSellerData = await User.findById(userId)
//       .select(USER_PUBLIC_FIELDS)
//       .populate("sellerInfo", "approvalStatus rejectedReason");

//     return res.status(200).json({
//       status: true,
//       message:
//         "Details updated successfully. Your application is now pending for review.",
//       data: updatedUserDataWithSellerData,
//     });
//   } catch (error) {
//     console.error("Error in reapplyAsSeller:", error.message);

//     // Handle MongoDB duplicate key error specifically
//     if (error.code === 11000) {
//       return res.status(400).json({
//         status: false,
//         message: "Aadhaar number is already linked with another account.",
//       });
//     }

//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     });
//   }
// };

// export const sellerApplicationStatus = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const sellerApplication = await Seller.findOne({ userInfo: userId });

//     if (!sellerApplication) {
//       return res.status(404).json({
//         status: false,
//         message: "sellerApplication not found.",
//       });
//     }

//     const user = await User.findById(userId)
//       .select(USER_PUBLIC_FIELDS)
//       .populate({
//         path: "sellerInfo",
//         select: "approvalStatus rejectedReason -_id",
//       })
//       .lean();

//     const flattenedUser = user.sellerInfo
//       ? { ...user, ...user.sellerInfo }
//       : user;

//     if (flattenedUser.sellerInfo) {
//       delete flattenedUser.sellerInfo;
//     }

//     return res.status(200).json({
//       status: true,
//       message: "seller application status fetched successfully!",
//       data: flattenedUser,
//     });
//   } catch (error) {
//     console.error("Error in sellerApplicationStatus:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     });
//   }
// };


import { sendApplicationReceived } from "../email/send.js";
import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
import { USER_PUBLIC_FIELDS } from "../utils/constants.js";
import { calculateSellerScore } from "../utils/scoring.js";
import { createNotification } from "./notification.controller.js";


// Old api
export const oldApplyAsSeller = async (req, res) => {
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

//New code - seller application automated process
export const applyAsSeller = async (req, res) => {
  const userId = req.user._id;
  const formData = req.body;

  try {
    // 1. find user & prevent 2nd application
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ status: false, message: "User not found" });

    const existing = await Seller.findOne({ userInfo: userId });
    if (existing) return res.status(400).json({ status: false, message: "Existing! Can't apply again." });

    // 2. prevent aadhaar‐duplication
    const dupAadhaar = await Seller.findOne({
      "aadhaarInfo.aadhaarNumber": formData.aadhaarInfo?.aadhaarNumber
    });
    if (dupAadhaar) {
      return res.status(400).json({
        status: false,
        message: "Aadhaar number is already linked with another account."
      });
    }

    // 3. create the new Seller (in memory)
    const newSeller = new Seller({
      ...formData,
      userInfo: userId,
      azureMigrationStatus: "completed"
    });

    // 4. (optional) load previous apps for red-flag logic — will be empty on first apply
    const previousApps = []; // or: await Seller.find({ userInfo: userId }).lean();

    // 5. compute the full scoring object
    const {
      totalScore,
      breakdown,
      redFlags,
      manualChecks,
      recommendation,
      rejectionReason
    } = calculateSellerScore(newSeller.toObject(), previousApps);

    // 6. stash all of it onto the Seller document
    newSeller.scoring = { totalScore, breakdown, redFlags, manualChecks, recommendation, rejectionReason };
    newSeller.approvalStatus = recommendation;
    newSeller.rejectedReason = rejectionReason;
    if (recommendation === "auto_rejected") {
      newSeller.rejectedTimes += 1;
    }

    // 7. save seller
    await newSeller.save();

    // 8. link to user & update their role on auto-approval
    user.sellerInfo = newSeller._id;
    user.filledNewSellerForm = true;
    if (recommendation === "auto_approved") {
      user.role = "seller";
    }
    await user.save();

    // 9. return fresh user + score info
    const updatedUser = await User.findById(userId)
      .select(USER_PUBLIC_FIELDS)
      .populate("sellerInfo", "approvalStatus rejectionReason scoring");

    // Create notification
    await createNotification({
      fromSystem: "Flykup Team", // system sender
      toUser: userId,
      type: "approval",
      title: "Seller Application",
      message: `Your seller application has been ${recommendation}.`,
      cutMessage: `Your seller application has been ${recommendation}.`,
      link: null,
    });


    return res.status(200).json({
      status: true,
      message: "Your seller request has been submitted successfully and is under review.",
      data: updatedUser,
      scoreDetails: {
        totalScore,
        approvalStatus: recommendation,
        rejectionReason,
        breakdown,
        redFlags,
        manualChecks
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
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
