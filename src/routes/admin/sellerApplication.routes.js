import Express from 'express';
import { getNewApprovedApplications, getNewApprovedApplicationsCount, getNewPendingApplications, getNewPendingApplicationsCount, getOldApprovedApplications, getOldApprovedApplicationsCount, getOldPendingApplications, getOldPendingApplicationsCount, reviewSellerApplication } from '../../controllers/admin/sellerApplication.controller.js';

const adminSellerApplicationRouter = Express.Router();

// Count pending applications
adminSellerApplicationRouter.get("/pending/count/old", getOldPendingApplicationsCount);
adminSellerApplicationRouter.get("/pending/count/new", getNewPendingApplicationsCount);

// Count approved applications
adminSellerApplicationRouter.get("/approved/count/old", getOldApprovedApplicationsCount);
adminSellerApplicationRouter.get("/approved/count/new", getNewApprovedApplicationsCount);

// List approved applications
adminSellerApplicationRouter.get("/approved/old", getOldApprovedApplications);
adminSellerApplicationRouter.get("/approved/new", getNewApprovedApplications);

// List pending applications
adminSellerApplicationRouter.get("/pending/old", getOldPendingApplications);
adminSellerApplicationRouter.get("/pending/new", getNewPendingApplications);

// Approve or reject an application
adminSellerApplicationRouter.post("/review", reviewSellerApplication);

export default adminSellerApplicationRouter;