import Express from 'express';
import {
    // Action
    reviewSellerApplication,

    // Old Schema
    getOldPendingApplications,
    getOldPendingApplicationsCount,
    getOldApprovedApplications,
    getOldApprovedApplicationsCount,
    getOldRejectedApplications,
    getOldRejectedApplicationsCount,

    // NEW DEDICATED ROUTE
    getManualReviewApplications,
    getManualReviewApplicationsCount,

    // New Schema - Manual
    getNewManualApprovedApplications,
    getNewManualApprovedApplicationsCount,
    getNewManualRejectedApplications,
    getNewManualRejectedApplicationsCount,

    // New Schema - Automated
    getAutoApprovedApplications,
    getAutoApprovedApplicationsCount,
    getAutoRejectedApplications,
    getAutoRejectedApplicationsCount

} from '../../controllers/admin/sellerApplication.controller.js';

const adminSellerApplicationRouter = Express.Router();


// --- APPLICATIONS REQUIRING ACTION ---
adminSellerApplicationRouter.post("/review", reviewSellerApplication); // Manual approve/reject action

// Pending applications from the OLD system
adminSellerApplicationRouter.get("/pending/count/old", getOldPendingApplicationsCount);
adminSellerApplicationRouter.get("/pending/old", getOldPendingApplications);

// NEW: Dedicated route for applications needing MANUAL REVIEW from the NEW system
adminSellerApplicationRouter.get("/manual-review/count", getManualReviewApplicationsCount);
adminSellerApplicationRouter.get("/manual-review", getManualReviewApplications); // Supports search


// --- PROCESSED APPLICATIONS (OLD SCHEMA) ---
adminSellerApplicationRouter.get("/approved/count/old", getOldApprovedApplicationsCount);
adminSellerApplicationRouter.get("/approved/old", getOldApprovedApplications); // Supports search
adminSellerApplicationRouter.get("/rejected/count/old", getOldRejectedApplicationsCount);
adminSellerApplicationRouter.get("/rejected/old", getOldRejectedApplications); // Supports search


// --- PROCESSED APPLICATIONS (NEW SCHEMA) ---
// Manually Processed
adminSellerApplicationRouter.get("/approved/count/new", getNewManualApprovedApplicationsCount);
adminSellerApplicationRouter.get("/approved/new", getNewManualApprovedApplications); // Supports search
adminSellerApplicationRouter.get("/rejected/count/new", getNewManualRejectedApplicationsCount);
adminSellerApplicationRouter.get("/rejected/new", getNewManualRejectedApplications); // Supports search

// Automatically Processed
adminSellerApplicationRouter.get("/approved/auto/count", getAutoApprovedApplicationsCount);
adminSellerApplicationRouter.get("/approved/auto", getAutoApprovedApplications); // Supports search
adminSellerApplicationRouter.get("/rejected/auto/count", getAutoRejectedApplicationsCount);
adminSellerApplicationRouter.get("/rejected/auto", getAutoRejectedApplications); // Supports search


export default adminSellerApplicationRouter;