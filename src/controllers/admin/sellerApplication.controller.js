// import {
//   sendApplicationAccepted,
//   sendApplicationRejected,
// } from "../../email/send.js";
// import Seller from "../../models/seller.model.js";
// import User from "../../models/user.model.js";
// import { addSasUrlsToSeller } from "../../utils/azureBlob.js";
// import { createSearchRegex } from "../../utils/helper.js";


// export const reviewSellerApplication = async (req, res) => {
//   const { sellerId, approvalStatus, rejectionReason } = req.body;

//   try {
//     const seller = await Seller.findById(sellerId);

//     if (!seller) {
//       return res.status(404).json({
//         status: false,
//         message: "seller application not found.",
//       });
//     }

//     const user = await User.findById(seller.userInfo);

//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "user not found",
//       });
//     }

//     if (approvalStatus === "approved" || approvalStatus === "rejected") {
//       seller.approvalStatus = approvalStatus;

//       if (approvalStatus === "rejected" && rejectionReason) {
//         seller.rejectionReason = rejectionReason;
//         user.role = "user";
//         await user.save();

//         // application rejected email
//         sendApplicationRejected(
//           user.emailId,
//           user.userName,
//           rejectionReason
//         ).catch((error) =>
//           console.error("Error sending welcome email:", error.message)
//         );
//       } else if (approvalStatus === "approved") {
//         seller.rejectionReason = null;

//         user.role = "seller";
//         await user.save();

//         // application approved email
//         sendApplicationAccepted(user.emailId, user.userName).catch((error) =>
//           console.error("Error sending welcome email:", error.message)
//         );
//       }

//       await seller.save();

//       return res.status(200).json({
//         status: true,
//         message: `Seller request has been ${approvalStatus}.`,
//       });
//     } else {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid approval status. Use 'approved' or 'rejected'.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in reviewBecomeSellerRequest:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error. Please try again later.",
//     });
//   }
// };

// export const getOldPendingApplications = async (req, res) => {
//   let page = parseInt(req.query.page) || 1;
//   let limit = parseInt(req.query.limit) || 50;

//   limit = limit > 50 ? 50 : limit;
//   let skip = (page - 1) * limit;

//   // search query
//   const searchQuery = req.query.search || "";
//   let searchFilter = {};

//   if (searchQuery) {
//      const regex = createSearchRegex(searchQuery);
//     searchFilter = {
//       $or: [
//         { "basicInfo.name": regex },
//         { "basicInfo.phone": regex },
//         { "basicInfo.email":regex },
//         { "basicInfo.gstNumber": regex },
//         { "aadharInfo.aadharNumber": regex },
//       ],
//     };
//   }

//   try {
//     const filter = {
//       approvalStatus: "pending",
//       basicInfo: { $exists: true },
//       ...searchFilter,
//     };

//     // Seller type filtering
//     const sellerType = req.query.filterSellerType || "all";
//     if (sellerType !== "all") {
//       filter["basicInfo.businessType"] = sellerType;
//     }

//     const totalCount = await Seller.countDocuments(filter);

//     const oldApplicationsPending = await Seller.find(filter)
//       .populate("userInfo", "name emailId userName")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     res.status(200).json({
//       status: true,
//       message: "Old seller applications - pending : fetched successfully!",
//       data: oldApplicationsPending || [],
//       totalCount,
//     });
//   } catch (error) {
//     console.error("Error in getOldPendingApplications:", error.message);
//     res.status(500).json({
//       status: false,
//       message: "Internal server error.",
//     });
//   }
// };

// export const getNewPendingApplications = async (req, res) => {
//   let page = parseInt(req.query.page) || 1;
//   let limit = parseInt(req.query.limit) || 50;
//   limit = limit > 50 ? 50 : limit;
//   let skip = (page - 1) * limit;

//   // Search query
//   const searchQuery = req.query.search || "";
//   let searchFilter = {};

//   if (searchQuery) {

//     const regex = createSearchRegex(searchQuery);

//     searchFilter = {
//       $or: [
//         { companyName: regex },
//         { mobileNumber: regex },
//         { email: regex },
//         { "gstInfo.gstNumber": regex },
//         { "aadhaarInfo.aadhaarNumber": regex },
//       ],
//     };
//   }

//   try {
//     const baseFilter = {
//       approvalStatus: "pending",
//       basicInfo: { $exists: false },
//       ...searchFilter,
//     };

//     // Seller type filtering
//     const sellerType = req.query.filterSellerType || "all";
//     if (sellerType !== "all" && ["brand","social"].includes(sellerType)) {
//       baseFilter["sellerType"] = sellerType;
//     }

//     const finalFilter = baseFilter;

//     const totalCount = await Seller.countDocuments(finalFilter);

//     const newApplicationsPendingRaw = await Seller.find(finalFilter)
//       .populate("userInfo", "name emailId userName")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//       // generate signed urls for private docs 
//       const applicationPromises = newApplicationsPendingRaw.map(addSasUrlsToSeller);
//       const pendingApplicationsWithUrls = await Promise.all(applicationPromises);
//       const finalApplicationData = pendingApplicationsWithUrls.filter( seller => seller !== null);

//     res.status(200).json({
//       status: true,
//       message: "New seller applications - pending : fetched successfully!",
//       data: finalApplicationData || [],
//       totalCount,
//     });
//   } catch (error) {
//     console.error("Error in getNewPendingApplications:", error.message);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error.",
//     });
//   }
// };

// export const getOldApprovedApplications = async (req, res) => {
//   let page = parseInt(req.query.page) || 1;
//   let limit = parseInt(req.query.limit) || 50;
//   limit = limit > 50 ? 50 : limit;
//   let skip = (page - 1) * limit;

//   // Search query
//   const searchQuery = req.query.search || "";
//   let searchFilter = {};

//   if (searchQuery) {
//     const regex = createSearchRegex(searchQuery);

//     searchFilter = {
//       $or: [
//         { "basicInfo.name": regex },
//         { "basicInfo.phone": regex },
//         { "basicInfo.email": regex },
//         { "basicInfo.gstNumber": regex },
//         { "aadharInfo.aadharNumber": regex },
//       ],
//     };
//   }

//   try {
//     const filter = {
//       approvalStatus: "approved",
//       basicInfo: { $exists: true },
//       ...searchFilter,
//     };

//     // Seller type filtering
//     const sellerType = req.query.filterSellerType || "all";
//     if (sellerType !== "all") {
//       filter["basicInfo.businessType"] = sellerType;
//     }

//     const totalCount = await Seller.countDocuments(filter);

//     const approvedSellers = await Seller.find(filter)
//       .populate({ path: "userInfo", select: "accessAllowed userName emailId" })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     return res.status(200).json({
//       status: true,
//       message: "Old approved sellers fetched successfully!",
//       data: approvedSellers || [],
//       totalCount,
//     });
//   } catch (error) {
//     console.error("Error in getOldApprovedApplications:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error. Please try again later.",
//     });
//   }
// };

// export const getNewApprovedApplications = async (req, res) => {
//   let page = parseInt(req.query.page) || 1;
//   let limit = parseInt(req.query.limit) || 50;
//   limit = limit > 50 ? 50 : limit;
//   let skip = (page - 1) * limit;

//   // Search query
//   const searchQuery = req.query.search || "";
//   let searchFilter = {};

//   if (searchQuery) {

//     const regex = createSearchRegex(searchQuery);

//     searchFilter = {
//       $or: [
//         { companyName: regex },
//         { mobileNumber: regex },
//         { email: regex },
//         { "gstInfo.gstNumber": regex },
//         { "aadhaarInfo.aadhaarNumber": regex }
//       ],
//     };
//   }

//   try {
//     const baseFilter = {
//       approvalStatus: "approved",
//       basicInfo: { $exists: false },
//       ...searchFilter,
//     };

//     // Seller type filtering
//     const sellerType = req.query.filterSellerType || "all";
//     if (sellerType !== "all" && ["brand", "social"].includes(sellerType)) {
//       baseFilter["sellerType"] = sellerType;
//     }

//     const finalFilter = baseFilter;

//     const totalCount = await Seller.countDocuments(finalFilter);

//     const approvedSellersRaw = await Seller.find(finalFilter)
//       .populate({ path: "userInfo", select: "accessAllowed userName emailId" })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//       // generate signed urls for private docs 
//       const approvedSellersPromises = approvedSellersRaw.map(addSasUrlsToSeller);

//       const approvedSellersWithUrls = await Promise.all(approvedSellersPromises);

//       const finalSellerData = approvedSellersWithUrls.filter( seller => seller !== null);

//     return res.status(200).json({
//       status: true,
//       message: "New approved sellers fetched successfully!",
//       data: finalSellerData || [],
//       totalCount,
//     });

//   } catch (error) {
//     console.error("Error in getNewApprovedApplications:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error. Please try again later.",
//     });
//   }
// };

// export const getOldPendingApplicationsCount = async (req, res) => {
//   try {
//     const pendingReqCount = await Seller.countDocuments({
//       approvalStatus: "pending",
//       basicInfo: { $exists: true },
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Pending old schema application count fetched successfully!",
//       data: pendingReqCount || 0,
//     });
//   } catch (error) {
//     console.error("Error in getOldPendingApplicationsCount:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error.",
//     });
//   }
// };

// export const getNewPendingApplicationsCount = async (req, res) => {
//   try {
//     const pendingReqCount = await Seller.countDocuments({
//       approvalStatus: "pending",
//       basicInfo: { $exists: false },
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Pending new schema application count fetched successfully!",
//       data: pendingReqCount || 0,
//     });
//   } catch (error) {
//     console.error("Error in getNewPendingApplicationsCount:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error.",
//     });
//   }
// };

// export const getOldApprovedApplicationsCount = async (req, res) => {
//   try {
//     const sellersCount = await Seller.countDocuments({
//       approvalStatus: "approved",
//       basicInfo: { $exists: true },
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Approved old schema sellers count fetched successfully!",
//       data: sellersCount || 0,
//     });
//   } catch (error) {
//     console.error("Error in getOldApprovedApplicationsCount:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error.",
//     });
//   }
// };

// export const getNewApprovedApplicationsCount = async (req, res) => {
//   try {
//     const sellersCount = await Seller.countDocuments({
//       approvalStatus: "approved",
//       basicInfo: { $exists: false },
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Approved new schema sellers count fetched successfully!",
//       data: sellersCount || 0,
//     });
//   } catch (error) {
//     console.error("Error in getNewApprovedApplicationsCount:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error.",
//     });
//   }
// };

// import Seller from "../../models/seller.model.js";
// import User from "../../models/user.model.js";
// import { addSasUrlsToSeller } from "../../utils/azureBlob.js";
// import { createSearchRegex } from "../../utils/helper.js";
// import {
//   sendSellerApplicationApproved,
//   sendSellerApplicationRejected,
// } from "../../email/send.js";

// // --- GENERIC HELPER FUNCTIONS ---

// // Builds the Mongoose search query object
// const buildSearchFilter = (searchQuery, schemaType) => {
//     if (!searchQuery) return {};
//     const regex = createSearchRegex(searchQuery);
//     const schemaFields = schemaType === 'old' 
//         ? { name: "basicInfo.name", phone: "basicInfo.phone", email: "basicInfo.email", gst: "basicInfo.gstNumber", aadhaar: "aadharInfo.aadharNumber" }
//         : { name: "companyName", phone: "mobileNumber", email: "email", gst: "gstInfo.gstNumber", aadhaar: "aadharInfo.aadharNumber" };
    
//     return {
//         $or: [
//             { [schemaFields.name]: regex }, { [schemaFields.phone]: regex },
//             { [schemaFields.email]: regex }, { [schemaFields.gst]: regex },
//             { [schemaFields.aadhaar]: regex },
//         ],
//     };
// };

// // Fetches a paginated list of applications based on a given query
// const getApplicationsByQuery = async (req, res, query, schemaType, statusName) => {
//     let page = parseInt(req.query.page) || 1;
//     let limit = parseInt(req.query.limit) || 50;
//     limit = limit > 50 ? 50 : limit;
//     let skip = (page - 1) * limit;

//     const searchQuery = req.query.search || "";
//     const searchFilter = buildSearchFilter(searchQuery, schemaType);

//     const filter = { ...query, ...searchFilter };

//     try {
//         const totalCount = await Seller.countDocuments(filter);
//         const applicationsRaw = await Seller.find(filter)
//             .populate("userInfo", "name emailId userName accessAllowed")
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit)
//             .lean();

//         let finalData = applicationsRaw;
//         // Add secure URLs for documents if it's a new schema application
//         if (schemaType === 'new') {
//             const promises = applicationsRaw.map(addSasUrlsToSeller);
//             finalData = (await Promise.all(promises)).filter(Boolean);
//         }

//         res.status(200).json({
//             status: true,
//             message: `${statusName} applications fetched successfully!`,
//             data: finalData,
//             totalCount,
//         });

//     } catch (error) {
//         console.error(`Error fetching applications for ${statusName}:`, error.message);
//         res.status(500).json({ status: false, message: "Internal server error." });
//     }
// }

// // Fetches only the count of applications based on a given query
// const getApplicationCountByQuery = async (res, query, statusName) => {
//     try {
//         const count = await Seller.countDocuments(query);
//         res.status(200).json({
//             status: true,
//             message: `${statusName} count fetched successfully!`,
//             data: count,
//         });
//     } catch (error) {
//         console.error(`Error fetching count for ${statusName}:`, error.message);
//         res.status(500).json({ status: false, message: "Internal server error." });
//     }
// };


// // --- CONTROLLER FUNCTIONS ---
// export const reviewSellerApplication = async (req, res) => {
//     const { sellerId, approvalStatus, rejectionReason } = req.body;

//     if (!["approved", "rejected"].includes(approvalStatus)) {
//         return res.status(400).json({
//             status: false,
//             message: "Invalid approval status. Use 'approved' or 'rejected'.",
//         });
//     }

//     try {
//         const seller = await Seller.findById(sellerId);
//         if (!seller) {
//             return res
//                 .status(404)
//                 .json({ status: false, message: "Seller application not found." });
//         }

//         const user = await User.findById(seller.userInfo);
//         if (!user) {
//             return res.status(404).json({ status: false, message: "User not found." });
//         }

//         // Update seller and user documents based on the admin's decision
//         seller.approvalStatus = approvalStatus;

//         if (approvalStatus === "approved") {
//             seller.rejectionReason = null;
//             user.role = "seller";
//             sendSellerApplicationApproved(user.emailId, user.userName).catch(
//                 (error) => console.error("Error sending approval email:", error.message)
//             );
//         } else { // status is 'rejected'
//             seller.rejectionReason = rejectionReason;
//             user.role = "user"; // Ensure role is reset if previously approved
//             sendSellerApplicationRejected(user.emailId, user.userName, rejectionReason).catch(
//                 (error) => console.error("Error sending rejection email:", error.message)
//             );
//         }

//         // Save both documents in parallel for efficiency
//         await Promise.all([seller.save(), user.save()]);

//         return res.status(200).json({
//             status: true,
//             message: `Seller request has been ${approvalStatus}.`,
//         });
//     } catch (error) {
//         console.error("Error in reviewSellerApplication:", error.message);
//         return res
//             .status(500)
//             .json({ status: false, message: "Internal server error." });
//     }
// };


// // === Applications for Manual Review ===
// const oldPendingQuery = { approvalStatus: 'pending', basicInfo: { $exists: true } };
// const newPendingQuery = { approvalStatus: 'manual_review', basicInfo: { $exists: false } };

// export const getOldPendingApplications = (req, res) => getApplicationsByQuery(req, res, oldPendingQuery, 'old', 'Old Pending');
// export const getOldPendingApplicationsCount = (req, res) => getApplicationCountByQuery(res, oldPendingQuery, 'Old Pending');
// export const getNewPendingApplications = (req, res) => getApplicationsByQuery(req, res, newPendingQuery, 'new', 'New Manual Review');
// export const getNewPendingApplicationsCount = (req, res) => getApplicationCountByQuery(res, newPendingQuery, 'New Manual Review');


// // === Old Schema Applications (Processed Manually Only) ===
// const oldApprovedQuery = { approvalStatus: 'approved', basicInfo: { $exists: true } };
// const oldRejectedQuery = { approvalStatus: 'rejected', basicInfo: { $exists: true } };

// export const getOldApprovedApplications = (req, res) => getApplicationsByQuery(req, res, oldApprovedQuery, 'old', 'Old Approved');
// export const getOldApprovedApplicationsCount = (req, res) => getApplicationCountByQuery(res, oldApprovedQuery, 'Old Approved');
// export const getOldRejectedApplications = (req, res) => getApplicationsByQuery(req, res, oldRejectedQuery, 'old', 'Old Rejected');
// export const getOldRejectedApplicationsCount = (req, res) => getApplicationCountByQuery(res, oldRejectedQuery, 'Old Rejected');


// // === New Schema Applications - MANUALLY Processed ===
// const newManualApprovedQuery = { approvalStatus: 'approved', basicInfo: { $exists: false } };
// const newManualRejectedQuery = { approvalStatus: 'rejected', basicInfo: { $exists: false } };

// export const getNewManualApprovedApplications = (req, res) => getApplicationsByQuery(req, res, newManualApprovedQuery, 'new', 'New Manual Approved');
// export const getNewManualApprovedApplicationsCount = (req, res) => getApplicationCountByQuery(res, newManualApprovedQuery, 'New Manual Approved');
// export const getNewManualRejectedApplications = (req, res) => getApplicationsByQuery(req, res, newManualRejectedQuery, 'new', 'New Manual Rejected');
// export const getNewManualRejectedApplicationsCount = (req, res) => getApplicationCountByQuery(res, newManualRejectedQuery, 'New Manual Rejected');


// // === New Schema Applications - AUTOMATICALLY Processed ===
// const autoApprovedQuery = { approvalStatus: 'auto_approved', basicInfo: { $exists: false } };
// const autoRejectedQuery = { approvalStatus: 'auto_rejected', basicInfo: { $exists: false } };

// export const getAutoApprovedApplications = (req, res) => getApplicationsByQuery(req, res, autoApprovedQuery, 'new', 'Auto Approved');
// export const getAutoApprovedApplicationsCount = (req, res) => getApplicationCountByQuery(res, autoApprovedQuery, 'Auto Approved');
// export const getAutoRejectedApplications = (req, res) => getApplicationsByQuery(req, res, autoRejectedQuery, 'new', 'Auto Rejected');
// export const getAutoRejectedApplicationsCount = (req, res) => getApplicationCountByQuery(res, autoRejectedQuery, 'Auto Rejected');
import Seller from "../../models/seller.model.js";
import User from "../../models/user.model.js";
import { addSasUrlsToSeller } from "../../utils/azureBlob.js";
import { createSearchRegex } from "../../utils/helper.js";
import {
  sendSellerApplicationApproved,
  sendSellerApplicationRejected,
} from "../../email/send.js";

// --- GENERIC HELPER FUNCTIONS ---

// Builds the Mongoose search query object
const buildSearchFilter = (searchQuery, schemaType) => {
    if (!searchQuery) return {};
    const regex = createSearchRegex(searchQuery);
    const schemaFields = schemaType === 'old' 
        ? { name: "basicInfo.name", phone: "basicInfo.phone", email: "basicInfo.email", gst: "basicInfo.gstNumber", aadhaar: "aadharInfo.aadharNumber" }
        : { name: "companyName", phone: "mobileNumber", email: "email", gst: "gstInfo.gstNumber", aadhaar: "aadharInfo.aadhaarNumber" };
    
    return {
        $or: [
            { [schemaFields.name]: regex }, { [schemaFields.phone]: regex },
            { [schemaFields.email]: regex }, { [schemaFields.gst]: regex },
            { [schemaFields.aadhaar]: regex },
        ],
    };
};

// Fetches a paginated list of applications
const getApplicationsByQuery = async (req, res, query, schemaType, statusName) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 50;
    limit = limit > 50 ? 50 : limit;
    let skip = (page - 1) * limit;

    const searchQuery = req.query.search || "";
    const searchFilter = buildSearchFilter(searchQuery, schemaType);

    const filter = { ...query, ...searchFilter };

    try {
        const totalCount = await Seller.countDocuments(filter);
        const applicationsRaw = await Seller.find(filter)
            .populate("userInfo", "name emailId userName accessAllowed")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        let finalData = applicationsRaw;
        if (schemaType === 'new') {
            const promises = applicationsRaw.map(addSasUrlsToSeller);
            finalData = (await Promise.all(promises)).filter(Boolean);
        }

        res.status(200).json({
            status: true,
            message: `${statusName} applications fetched successfully!`,
            data: finalData,
            totalCount,
        });

    } catch (error) {
        console.error(`Error fetching applications for ${statusName}:`, error.message);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
}

// A generic function that fetches only the count of applications.
const getApplicationCountByQuery = async (res, query, statusName) => {
    try {
        const count = await Seller.countDocuments(query);
        res.status(200).json({
            status: true,
            message: `${statusName} count fetched successfully!`,
            data: count,
        });
    } catch (error) {
        // This is the line that was causing the crash.
        console.error(`Error fetching count for ${statusName}:`, error.message);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};


// --- CONTROLLER FUNCTIONS ---

// Manually approves or rejects a seller application.
// export const reviewSellerApplication = async (req, res) => {
//     // ... (This function was correct and remains unchanged)
//     const { sellerId, approvalStatus, rejectedReason } = req.body;

//     if (!["approved", "rejected"].includes(approvalStatus)) {
//         return res.status(400).json({
//             status: false,
//             message: "Invalid approval status. Use 'approved' or 'rejected'.",
//         });
//     }

//     try {
//         const seller = await Seller.findById(sellerId);
//         if (!seller) {
//             return res
//                 .status(404)
//                 .json({ status: false, message: "Seller application not found." });
//         }

//         const user = await User.findById(seller.userInfo);
//         if (!user) {
//             return res.status(404).json({ status: false, message: "User not found." });
//         }

//         seller.approvalStatus = approvalStatus;

//         if (approvalStatus === "approved") {
//             seller.rejectedReason = null;
//             user.role = "seller";
//             sendSellerApplicationApproved(user.emailId, user.userName).catch(
//                 (error) => console.error("Error sending approval email:", error.message)
//             );
//         } else { // status is 'rejected'
//             seller.rejectedReason = rejectedReason;
//             user.role = "user"; 
//             sendSellerApplicationRejected(user.emailId, user.userName, rejectedReason).catch(
//                 (error) => console.error("Error sending rejection email:", error.message)
//             );
//         }

//         await Promise.all([seller.save(), user.save()]);

//         return res.status(200).json({
//             status: true,
//             message: `Seller request has been ${approvalStatus}.`,
//         });
//     } catch (error) {
//         console.error("Error in reviewSellerApplication:", error.message);
//         return res
//             .status(500)
//             .json({ status: false, message: "Internal server error." });
//     }
// };

export const reviewSellerApplication = async (req, res) => {
    const { sellerId, approvalStatus, rejectedReason } = req.body;

    if (!["approved", "rejected"].includes(approvalStatus)) {
        return res.status(400).json({
            status: false,
            message: "Invalid approval status. Use 'approved' or 'rejected'.",
        });
    }

    try {
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res
                .status(404)
                .json({ status: false, message: "Seller application not found." });
        }

        const user = await User.findById(seller.userInfo);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        // Handle approval status changes
        seller.approvalStatus = approvalStatus;

        if (approvalStatus === "approved") {
            // Reset rejection counters on approval
            seller.rejectedReason = null;
            seller.rejectedTimes = 0;
            user.role = "seller";
            
            sendSellerApplicationApproved(user.emailId, user.userName).catch(
                error => console.error("Approval email error:", error.message)
            );
        } else { 
            // Rejection handling
            seller.rejectedReason = rejectedReason;
            
            // Initialize if doesn't exist and increment
            seller.rejectedTimes = (seller.rejectedTimes || 0) + 1;
            
            // Only reset role if it was previously set to seller
            if (user.role === "seller") {
                user.role = "user";
            }
            
            sendSellerApplicationRejected(user.emailId, user.userName, rejectedReason).catch(
                error => console.error("Rejection email error:", error.message)
            );
        }

        await Promise.all([seller.save(), user.save()]);

        return res.status(200).json({
            status: true,
            message: `Seller request has been ${approvalStatus}.`,
            rejectedTimes: seller.rejectedTimes  // Include in response
        });
    } catch (error) {
        console.error("Review error:", error.message);
        return res.status(500).json({ 
            status: false, 
            message: "Internal server error." 
        });
    }
};


// === Applications for Manual Review (Old Schema) ===
const oldPendingQuery = { approvalStatus: 'pending', basicInfo: { $exists: true } };
export const getOldPendingApplications = (req, res) => getApplicationsByQuery(req, res, oldPendingQuery, 'old', 'Old Pending');
export const getOldPendingApplicationsCount = (req, res) => getApplicationCountByQuery(res, oldPendingQuery, 'Old Pending');


// === NEW: Applications for Manual Review (New Schema) ===
const manualReviewQuery = { approvalStatus: 'manual_review', basicInfo: { $exists: false } };
export const getManualReviewApplications = (req, res) => getApplicationsByQuery(req, res, manualReviewQuery, 'new', 'Manual Review');
export const getManualReviewApplicationsCount = (req, res) => getApplicationCountByQuery(res, manualReviewQuery, 'Manual Review');


// === Old Schema Applications (Processed Manually Only) ===
const oldApprovedQuery = { approvalStatus: 'approved', basicInfo: { $exists: true } };
const oldRejectedQuery = { approvalStatus: 'rejected', basicInfo: { $exists: true } };

export const getOldApprovedApplications = (req, res) => getApplicationsByQuery(req, res, oldApprovedQuery, 'old', 'Old Approved');
export const getOldRejectedApplications = (req, res) => getApplicationsByQuery(req, res, oldRejectedQuery, 'old', 'Old Rejected');
export const getOldApprovedApplicationsCount = (req, res) => getApplicationCountByQuery(res, oldApprovedQuery, 'Old Approved');
export const getOldRejectedApplicationsCount = (req, res) => getApplicationCountByQuery(res, oldRejectedQuery, 'Old Rejected');


// === New Schema Applications - MANUALLY Processed ===
const newManualApprovedQuery = { approvalStatus: 'approved', basicInfo: { $exists: false } };
const newManualRejectedQuery = { approvalStatus: 'rejected', basicInfo: { $exists: false } };

export const getNewManualApprovedApplications = (req, res) => getApplicationsByQuery(req, res, newManualApprovedQuery, 'new', 'New Manual Approved');
export const getNewManualRejectedApplications = (req, res) => getApplicationsByQuery(req, res, newManualRejectedQuery, 'new', 'New Manual Rejected');
export const getNewManualApprovedApplicationsCount = (req, res) => getApplicationCountByQuery(res, newManualApprovedQuery, 'New Manual Approved');
export const getNewManualRejectedApplicationsCount = (req, res) => getApplicationCountByQuery(res, newManualRejectedQuery, 'New Manual Rejected');


// === New Schema Applications - AUTOMATICALLY Processed ===
const autoApprovedQuery = { approvalStatus: 'auto_approved', basicInfo: { $exists: false } };
const autoRejectedQuery = { approvalStatus: 'auto_rejected', basicInfo: { $exists: false } };

export const getAutoApprovedApplications = (req, res) => getApplicationsByQuery(req, res, autoApprovedQuery, 'new', 'Auto Approved');
export const getAutoRejectedApplications = (req, res) => getApplicationsByQuery(req, res, autoRejectedQuery, 'new', 'Auto Rejected');
export const getAutoApprovedApplicationsCount = (req, res) => getApplicationCountByQuery(res, autoApprovedQuery, 'Auto Approved');
export const getAutoRejectedApplicationsCount = (req, res) => getApplicationCountByQuery(res, autoRejectedQuery, 'Auto Rejected');