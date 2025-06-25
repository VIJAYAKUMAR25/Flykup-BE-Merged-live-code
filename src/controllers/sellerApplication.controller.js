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
import {
  sendSellerApplicationReceived,
  sendSellerApplicationApproved,
  sendSellerApplicationRejected,
  sendSellerApplicationManualReview
} from "../email/send.js";




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
  const startTime = Date.now(); // Performance tracking

  try {
    // 1. Parallelize initial checks
    const [user, existingSeller, existingAadhaar] = await Promise.all([
      User.findById(userId).select('emailId userName role').lean(),
      Seller.findOne({ userInfo: userId }).select('_id').lean(),
      formData.aadhaarInfo?.aadhaarNumber ? 
        Seller.findOne({ "aadhaarInfo.aadhaarNumber": formData.aadhaarInfo.aadhaarNumber })
          .select('_id').lean() : 
        Promise.resolve(null)
    ]);


    // Validation
    if (!user) return res.status(404).json({ status: false, message: "User not found" });
    if (existingSeller) return res.status(400).json({ status: false, message: "Existing application found" });
    if (existingAadhaar) return res.status(400).json({ status: false, message: "Aadhaar already in use" });

    // 2. Create and score seller document
    const newSeller = new Seller({
      userInfo: userId,
      ...formData,
      rejectedTimes: 0,
      azureMigrationStatus: "completed"
    });

    const scoringStart = Date.now();
    const scoringResult = calculateSellerScore(newSeller.toObject());

    // 3. Apply scoring results
    newSeller.scoring = { ...scoringResult };
    newSeller.approvalStatus = scoringResult.recommendation;
    newSeller.rejectedReason = scoringResult.rejectedReason;
    if (scoringResult.recommendation === "auto_rejected") newSeller.rejectedTimes = 1;

    // 4. Prepare database operations
    const dbOperations = [];
    
    if (scoringResult.recommendation === "auto_approved") {
      dbOperations.push(User.updateOne(
        { _id: userId }, 
        { $set: { 
          role: "seller", 
          sellerInfo: newSeller._id,
          filledNewSellerForm: true 
        }}
      ));
    } else {
      dbOperations.push(User.updateOne(
        { _id: userId }, 
        { $set: { 
          sellerInfo: newSeller._id,
          filledNewSellerForm: true 
        }}
      ));
    }
    
    dbOperations.push(newSeller.save());
    
    // 5. Execute all DB operations in parallel
    await Promise.all(dbOperations);

    // 6. Prepare response without additional queries
    const userWithCategories = await User.findById(userId)
  .select('emailId userName role categories') // Add categories here
  .lean();

    // Construct response with categories
    const response = {
      _id: userWithCategories._id,
      userName: userWithCategories.userName,
      emailId: userWithCategories.emailId,
      categories: userWithCategories.categories, // Include categories
      role: scoringResult.recommendation === "auto_approved" ? "seller" : userWithCategories.role,
      sellerInfo: {
        _id: newSeller._id,
        approvalStatus: newSeller.approvalStatus,
        rejectedReason: newSeller.rejectedReason,
        scoring: newSeller.scoring
      }
    };

    // 7. Send response immediately
    res.status(200).json({
      status: true,
      message: "Seller application submitted successfully",
      data: response
    });

    // 8. Background processing for non-critical tasks
    setTimeout(async () => {
      try {
        const { recommendation, rejectedReason } = scoringResult;
        const { emailId, userName } = user;

        // Send email based on status
        if (recommendation === "auto_approved") {
          await sendSellerApplicationApproved(emailId, userName);
        } else if (recommendation === "auto_rejected") {
          await sendSellerApplicationRejected(emailId, userName, rejectedReason);
        } else { // manual_review
          await sendSellerApplicationManualReview(emailId, userName);
        }

        // Create notification
        await createNotification({
          toUser: userId,
          type: "approval",
          title: "Seller Application Update",
          message: `Your seller application status is: ${recommendation}`,
          cutMessage: `Status: ${recommendation}`
        });
      } catch (bgError) {
        console.error("Background tasks error in applyAsSeller:", bgError);
      }
    }, 0);

  } catch (error) {
    console.error(`Application failed in ${Date.now() - startTime}ms:`, error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const reapplyAsSeller = async (req, res) => {
  const userId = req.user._id;
  const formData = req.body;
  const startTime = Date.now();

  try {
    // 1. Parallelize initial checks
    const [user, seller, existingAadhaar] = await Promise.all([
      User.findById(userId).select('emailId userName role sellerInfo').lean(),
      Seller.findOne({ userInfo: userId }),
      formData.aadhaarInfo?.aadhaarNumber ? 
        Seller.findOne({ 
          "aadhaarInfo.aadhaarNumber": formData.aadhaarInfo.aadhaarNumber,
          userInfo: { $ne: userId } // Exclude current user
        }).select('_id').lean() : 
        Promise.resolve(null)
    ]);


    // Validation
    if (!user) return res.status(404).json({ status: false, message: "User not found" });
    if (!seller) return res.status(404).json({ status: false, message: "Seller application not found" });
    if (existingAadhaar) return res.status(400).json({ status: false, message: "Aadhaar already in use" });

    // 2. Update seller document
    Object.keys(formData).forEach(key => {
      seller[key] = formData[key];
    });

    // 3. Recalculate score
    const scoringStart = Date.now();
    const scoringResult = calculateSellerScore(seller.toObject());

    // 4. Apply scoring results
    seller.scoring = { ...scoringResult };
    seller.approvalStatus = scoringResult.recommendation;
    seller.rejectedReason = scoringResult.rejectedReason;
    
    if (scoringResult.recommendation === "auto_rejected") {
      seller.rejectedTimes += 1;
    }

    // 5. Prepare database operations
    const dbOperations = [seller.save()];
    
    if (scoringResult.recommendation === "auto_approved" && user.role !== "seller") {
      dbOperations.push(User.updateOne(
        { _id: userId }, 
        { $set: { role: "seller" }}
      ));
    }

    // 6. Execute DB operations in parallel
    await Promise.all(dbOperations);

    // 7. Prepare response without additional queries
   const userWithCategories = await User.findById(userId)
  .select('emailId userName role categories') // Add categories here
  .lean();

    const response = {
      _id: userWithCategories._id,
      userName: userWithCategories.userName,
      emailId: userWithCategories.emailId,
      categories: userWithCategories.categories,
      role: userWithCategories.role, // Use the updated role from DB
      sellerInfo: {
        _id: seller._id, // Use the seller document we updated
        approvalStatus: seller.approvalStatus,
        rejectedReason: seller.rejectedReason,
        scoring: seller.scoring
      }
    };

    // 8. Send response immediately
    res.status(200).json({
      status: true,
      message: "Seller application updated successfully",
      data: response
    });

   // 9. Background processing for non-critical tasks
      setTimeout(async () => {
          try {
              const { recommendation, rejectedReason } = scoringResult;
              const { emailId, userName } = user;

              // Send email based on status
              if (recommendation === "auto_approved") {
                  await sendSellerApplicationApproved(emailId, userName);
              } else if (recommendation === "auto_rejected") {
                  await sendSellerApplicationRejected(emailId, userName, rejectedReason);
              } else { // manual_review
                  await sendSellerApplicationManualReview(emailId, userName);
              }

              // Create notification
              await createNotification({
                  toUser: userId,
                  type: "approval",
                  title: "Seller Application Update",
                  message: `Your updated seller application status is: ${recommendation}`,
                  cutMessage: `Status: ${recommendation}`
              });
          } catch (bgError) {
              console.error("Background tasks error in reapplyAsSeller:", bgError);
          }
      }, 0);

  } catch (error) {
    console.error(`Reapply failed in ${Date.now() - startTime}ms:`, error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message
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

    const flattenedUser = {
      ...user.toObject(),
      ...(user.sellerInfo ? user.sellerInfo.toObject() : {})
    };

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
