import express from "express";
import * as shipperController from "../controllers/shipper.controller.js";
import { userAuth, sellerAuth, isDropshipper } from "../middlewares/auth.js"; // Assuming you have auth middleware

const router = express.Router();

// --- Dropshipper Profile Management ---

// @desc    Register or Apply to be a Dropshipper (linked to logged-in user)
// @route   POST /api/v1/shippers/apply
// @access  Private (Logged-in User)
router.post("/apply", userAuth, shipperController.applyForDropshipper);

// @desc    Get Dropshipper application status
// @route   GET /api/v1/shippers/application/:userId
// @access  Private (Admin)
router.get("/status", userAuth, shipperController.getMyShipperStatus);

// @desc    Get logged-in Dropshipper's profile
// @route   GET /api/v1/shippers/me
// @access  Private (Dropshipper)
router.get("/me", userAuth, isDropshipper, shipperController.getMyDropshipperProfile);

// @desc    Update logged-in Dropshipper's profile
// @route   PUT /api/v1/shippers/me
// @access  Private (Dropshipper)
router.put("/me", userAuth, isDropshipper, shipperController.updateMyDropshipperProfile);

// --- Connection Management (Dropshipper's Perspective) ---

// @desc    Send connection request to a Seller
// @route   POST /api/v1/shippers/connections/request/:sellerId
// @access  Private (Dropshipper)
router.post(
  "/connections/request/:sellerId",
  userAuth,
  isDropshipper,
  shipperController.requestConnectionWithSeller
);


/**
 * ======================================================
 * SELLER ACTIONS (Routes related to Seller responding to Dropshippers)
 * (Ideally belong in seller.routes.js)
 * ======================================================
 */

// @desc    Seller responds to a Dropshipper connection request (Approve/Reject)
// @route   PUT /api/v1/shippers/connections/respond/:dropshipperId
// @access  Private (Seller) - Requires sellerAuth middleware
router.put(
  "/connections/respond/:dropshipperId",
  sellerAuth, // <<<--- USE SELLER AUTH MIDDLEWARE HERE
  shipperController.respondToConnectionRequest
);

// @desc    List all connections for the logged-in Dropshipper
// @route   GET /api/v1/shippers/connections
// @access  Private (Dropshipper)
router.get(
  "/connections",
  userAuth,
  isDropshipper,
  shipperController.getMyConnections
);

// @desc    Withdraw a pending connection request OR revoke an approved connection
// @route   DELETE /api/v1/shippers/connections/:sellerId
// @access  Private (Dropshipper)
router.delete(
  "/connections/:sellerId",
  userAuth,
  isDropshipper,
  shipperController.revokeOrWithdrawConnection
);

// --- Product Access ---

// @desc    Get list of ALL available products from ALL approved connected Sellers
// @route   GET /api/v1/shippers/connections/products/all
// @access  Private (Dropshipper)
router.get(
  "/connections/products/all",
  isDropshipper, // Use isDropshipper middleware
  shipperController.getAllProductsFromConnectedSellers
);

// @desc    Get list of products available for dropshipping from a connected Seller
// @route   GET /api/v1/shippers/sellers/:sellerId/products
// @access  Private (Dropshipper)
router.get(
  "/sellers/:sellerId/products",
  userAuth,
  isDropshipper,
  shipperController.getProductsFromConnectedSeller
);


// --- Admin Routes ---

// @desc    Get all Dropshipper applications/profiles (Admin)
// @route   GET /api/v1/shippers/admin/all
// @access  Private (Admin)
router.get("/admin/all",  shipperController.getAllDropshippersAdmin);

// @desc    Approve a Dropshipper application (Admin)
// @route   PUT /api/v1/shippers/admin/approve/:dropshipperId
// @access  Private (Admin)
router.put("/admin/approve/:dropshipperId",  shipperController.approveDropshipperAdmin);

// @desc    Reject or Suspend a Dropshipper (Admin)
// @route   PUT /api/v1/shippers/admin/reject/:dropshipperId
// @access  Private (Admin)
router.put("/admin/reject/:dropshipperId", shipperController.rejectOrSuspendDropshipperAdmin);

// --- New Routes ---

// @desc    Get PENDING Dropshipper applications (Admin - Paginated & Searchable)
// @route   GET /api/v1/shippers/admin/pending
// @access  Private (Admin)
router.get("/admin/pending", /* protect, admin, */ shipperController.getPendingDropshippersAdmin);
router.get("/admin/approved", /* protect, admin, */ shipperController.getApprovedDropshippersAdmin);

// @desc    Get a single Dropshipper application/profile by ID (Admin)
// @route   GET /api/v1/shippers/admin/:dropshipperId
// @access  Private (Admin)
router.get("/admin/:dropshipperId", /* protect, admin, */ shipperController.getDropshipperByIdAdmin);




export default router;