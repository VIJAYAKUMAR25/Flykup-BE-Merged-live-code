import asyncHandler from "express-async-handler"; // Assuming you use this for error handling
import Dropshipper from "../models/shipper.model.js";
import Seller from "../models/seller.model.js"; // Adjust path as needed
import User from "../models/user.model.js"; // Adjust path as needed
import ProductListing from "../models/productListing.model.js"; // Adjust path to your Product model
import mongoose from "mongoose";

// @desc    Register or Apply to be a Dropshipper
// @route   POST /api/v1/shippers/apply
// @access  Private
export const applyForDropshipper = asyncHandler(async (req, res) => {
    const userId = req.user._id; // From protect middleware
    const { businessName, mobileNumber, email, address, bankDetails } = req.body;

    // 1. Check if user already exists and validation
    const existingUser = await User.findById(userId);
    if (!existingUser) {
        res.status(404);
        // Throwing error here will be caught by asyncHandler and sent to error middleware
        throw new Error("User not found.");
    }

    // 2. Check if user already has an active role or pending application
    if (existingUser.role === 'seller' || existingUser.role === 'dropshipper') {
        res.status(400); // Bad Request - logical error
        throw new Error(`User already has an active role: ${existingUser.role}`);
    }
    if (existingUser.dropshipperInfo) { // Check if already linked to a dropshipper profile
        const existingDropshipper = await Dropshipper.findById(existingUser.dropshipperInfo);
        if (existingDropshipper) {
            res.status(400);
            throw new Error(`Dropshipper application/profile already exists for this user (Status: ${existingDropshipper.approvalStatus}).`);
        } else {
            // Data inconsistency: User has dropshipperInfo but profile doesn't exist. Log and potentially clear it.
            console.warn(`Data inconsistency: User ${userId} has dangling dropshipperInfo ${existingUser.dropshipperInfo}`);
            // Optionally clear the dangling reference:
            // await User.findByIdAndUpdate(userId, { $unset: { dropshipperInfo: "" } });
        }
    }
    // You might also want a check specific to Dropshipper collection if user link is missing
    // const existingDropshipperByUserInfo = await Dropshipper.findOne({ userInfo: userId });
    // if (existingDropshipperByUserInfo) { ... }


    // 3. Create new dropshipper application in Dropshipper collection
    let dropshipper;
    try {
        dropshipper = await Dropshipper.create({
            userInfo: userId,
            businessName,
            mobileNumber: mobileNumber || existingUser.mobile, // Use provided or prefill from user
            email: email || existingUser.emailId,           // Use provided or prefill from user
            address,
            bankDetails,
            approvalStatus: "pending", // Starts as pending admin approval
        });
    } catch (createError) {
        // Handle potential validation errors from Mongoose during creation
        console.error("Error creating dropshipper profile:", createError);
        if (createError.name === 'ValidationError') {
            res.status(400); // Bad Request due to validation
        } else {
            res.status(500); // Other server error during creation
        }
        throw createError; // Let asyncHandler forward it
    }


    // 4. Update the User document with the reference to the new Dropshipper profile
    if (dropshipper && dropshipper._id) {
        try {
            // Update the user document to link to the new dropshipper profile
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        dropshipperInfo: dropshipper._id,
                        // Optionally set a temporary role like 'pending_dropshipper' if your logic requires it
                        // role: 'pending_dropshipper'
                    }
                },
                { new: true } // Return the updated user document (optional)
            );

            if (!updatedUser) {
                // This is unlikely if the user existed before, but handle defensively
                console.error(`Failed to find user ${userId} for update after creating dropshipper ${dropshipper._id}`);
                // Decide how to handle: maybe delete the just-created dropshipper profile for consistency?
                await Dropshipper.findByIdAndDelete(dropshipper._id); // Attempt cleanup
                res.status(500);
                throw new Error("Failed to update user profile after dropshipper creation.");
            }

            // Successfully created dropshipper and updated user link
            res.status(201).json({
                message: "Dropshipper application submitted successfully. Awaiting admin approval.",
                data: dropshipper, // Send back the created dropshipper data
            });

        } catch (updateError) {
            // Error occurred specifically during the User update
            console.error(`Failed to update user ${userId} with dropshipperInfo ${dropshipper._id}:`, updateError);
            // Attempt to clean up the created dropshipper profile for consistency
            try {
                await Dropshipper.findByIdAndDelete(dropshipper._id);
                console.log(`Cleaned up orphaned dropshipper profile ${dropshipper._id}`);
            } catch (cleanupError) {
                console.error(`Failed to cleanup orphaned dropshipper profile ${dropshipper._id}:`, cleanupError);
            }
            // Set appropriate status code and re-throw for asyncHandler
            res.status(500);
            throw new Error("Failed to update user profile linking. Application rolled back.");
        }
    } else {
        // Should not happen if create worked, but safety check
        res.status(500);
        throw new Error("Failed to get ID from created dropshipper profile.");
    }
});

// --- NEW CONTROLLER FUNCTION ---
// @desc    Get the logged-in user's Dropshipper application status
// @route   GET /api/v1/shippers/me/status
// @access  Private (Requires protect/userAuth middleware)
export const getMyShipperStatus = asyncHandler(async (req, res) => {
    // req.user should be attached by 'protect' or 'userAuth' middleware
    const userId = req.user?._id;

    if (!userId) {
        // Should be caught by auth middleware, but good practice
        return res.status(401).json({ status: false, message: "Unauthorized: User not authenticated." });
    }

    // Find the user and select only the dropshipperInfo field
    const user = await User.findById(userId).select('dropshipperInfo role').lean(); // Use lean for read-only

    if (!user) {
        // Should not happen if auth middleware worked, but handle defensively
        return res.status(404).json({ status: false, message: "Authenticated user record not found." });
    }

    // Check if user has applied (has dropshipperInfo linked)
    if (!user.dropshipperInfo) {
        return res.status(200).json({
            status: true,
            message: "No dropshipper application found for this user.",
            data: { status: "NEW" } // Clear status indicating no application
        });
    }

    // User has applied, now find the Dropshipper document
    const shipperProfileId = user.dropshipperInfo;
    const shipperApplication = await Dropshipper.findById(shipperProfileId)
        .select('approvalStatus rejectedReason businessName email mobileNumber address bankDetails createdAt') // Select desired fields
        .lean(); // Use lean for read-only

    if (!shipperApplication) {
        // Data inconsistency: User has link, but profile missing
        console.warn(`Data inconsistency: User ${userId} has dropshipperInfo ${shipperProfileId}, but Dropshipper doc not found.`);
        // Optionally clear the invalid link in the User document here
        // await User.findByIdAndUpdate(userId, { $unset: { dropshipperInfo: "" } });
        return res.status(404).json({ // Return 404 or maybe a specific status indicating inconsistency
            status: false,
            message: "Dropshipper application details not found (data inconsistency)."
            // data: { status: "INCONSISTENT" } // Or provide a specific status
        });
    }

    // Application found, return its status and details
    res.status(200).json({
        status: true,
        message: "Dropshipper application status fetched successfully.",
        data: {
            status: shipperApplication.approvalStatus, // e.g., 'pending', 'approved', 'rejected', 'suspended'
            reason: shipperApplication.rejectedReason || null, // Include rejection reason if present
            applicationDetails: shipperApplication // Include the fetched details
        }
    });

});

// @desc    Get logged-in Dropshipper's profile
// @route   GET /api/v1/shippers/me
// @access  Private (Dropshipper)
export const getMyDropshipperProfile = asyncHandler(async (req, res) => {
    const dropshipper = await Dropshipper.findOne({ userInfo: req.user._id })
        .populate('userInfo', 'name userName emailId profileURL')
        .populate('connectedSellers.sellerId', 'companyName userInfo'); // Populate basic seller info

    if (!dropshipper) {
        res.status(404);
        throw new Error("Dropshipper profile not found.");
    }
    if (dropshipper.approvalStatus !== 'approved') {
        res.status(403)
        throw new Error(`Your dropshipper account status is: ${dropshipper.approvalStatus}`);
    }

    res.status(200).json(dropshipper);
});

// @desc    Update logged-in Dropshipper's profile
// @route   PUT /api/v1/shippers/me
// @access  Private (Dropshipper)
export const updateMyDropshipperProfile = asyncHandler(async (req, res) => {
    const { businessName, mobileNumber, email, address, bankDetails } = req.body;

    const dropshipper = await Dropshipper.findOne({ userInfo: req.user._id });

    if (!dropshipper) {
        res.status(404);
        throw new Error("Dropshipper profile not found.");
    }
    if (dropshipper.approvalStatus !== 'approved') {
        res.status(403)
        throw new Error(`Account updates not allowed. Status: ${dropshipper.approvalStatus}`);
    }

    // Update allowed fields
    dropshipper.businessName = businessName ?? dropshipper.businessName;
    dropshipper.mobileNumber = mobileNumber ?? dropshipper.mobileNumber;
    dropshipper.email = email ?? dropshipper.email;
    if (address) dropshipper.address = { ...dropshipper.address, ...address }; // Merge address fields
    if (bankDetails) dropshipper.bankDetails = { ...dropshipper.bankDetails, ...bankDetails }; // Merge bank details

    const updatedDropshipper = await dropshipper.save();

    res.status(200).json({
        message: "Dropshipper profile updated successfully.",
        data: updatedDropshipper
    });
});


// @desc    Send connection request to a Seller
// @route   POST /api/v1/shippers/connections/request/:sellerId
// @access  Private (Dropshipper)
export const requestConnectionWithSeller = asyncHandler(async (req, res) => {
    const dropshipperId = req.dropshipper._id; // Assuming middleware adds this
    const { sellerId } = req.params;
    const { commissionRate, agreementDetails } = req.body; // Optional from dropshipper

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        res.status(400);
        throw new Error("Invalid Seller ID format.");
    }

    const seller = await Seller.findById(sellerId);
    const dropshipper = await Dropshipper.findById(dropshipperId);

    if (!seller) {
        res.status(404);
        throw new Error("Seller not found.");
    }
    if (!dropshipper || dropshipper.approvalStatus !== 'approved') {
        res.status(403);
        throw new Error("Dropshipper account not found or not approved.");
    }

    // Check if connection already exists (either way)
    const existingConnectionDs = dropshipper.connectedSellers.find(conn => conn.sellerId.equals(sellerId));
    const existingConnectionSeller = seller.dropshipperConnections.find(conn => conn.dropshipperId.equals(dropshipperId));


    if (existingConnectionDs || existingConnectionSeller) {
        const status = existingConnectionDs?.status || existingConnectionSeller?.status;
        if (status === 'approved') {
            res.status(400).send("Connection already approved.");
            return;
        } else if (status === 'pending') {
            res.status(400).send("Connection request already pending.");
            return;
        } else if (status === 'rejected' || status?.startsWith('revoked')) {
            // Allow re-requesting after rejection/revocation? Business decision needed.
            // For now, let's prevent re-requesting easily.
            res.status(400).send(`Cannot re-request connection. Status: ${status}`);
            return;
            // OR: Implement logic to remove the old rejected/revoked entry and add a new pending one.
        }
    }

    // Add pending request to Dropshipper's record
    const dsConnection = {
        sellerId: seller._id,
        status: 'pending',
        commissionRate, // Can be null, Seller might set it upon approval
        agreementDetails,
        requestedAt: Date.now()
    };
    dropshipper.connectedSellers.push(dsConnection);

    // Add pending request to Seller's record
    const sellerConnection = {
        dropshipperId: dropshipper._id,
        status: 'pending',
        commissionRate, // Seller can see the requested rate
        agreementDetails,
        requestedAt: Date.now()
    };
    seller.dropshipperConnections.push(sellerConnection);


    // Use a transaction for atomicity if required, especially if more complex updates happen
    await dropshipper.save();
    await seller.save();

    // TODO: Implement Notification system for the Seller

    res.status(201).json({ message: "Connection request sent to seller." });
});

/**
 * ======================================================
 * SELLER ACTIONS (Ideally belong in seller.controller.js)
 * ======================================================
 */

// @desc    Seller responds to a Dropshipper connection request (Approve/Reject)
// @route   PUT /api/v1/shippers/connections/respond/:dropshipperId
// @access  Private (Seller) - Requires sellerAuth middleware
export const respondToConnectionRequest = asyncHandler(async (req, res) => {
    const sellerId = req.seller._id; // From sellerAuth middleware
    const { dropshipperId } = req.params;
    // Seller no longer provides commissionRate on approval. agreementDetails might still be relevant for notes.
    const { status, agreementDetails, rejectionReason } = req.body;

    // --- Input Validation ---
    if (!mongoose.Types.ObjectId.isValid(dropshipperId)) {
        res.status(400);
        throw new Error("Invalid Dropshipper ID format.");
    }
    if (!['approved', 'rejected'].includes(status)) {
        res.status(400);
        throw new Error("Invalid status provided. Must be 'approved' or 'rejected'.");
    }
    if (status === 'rejected' && !rejectionReason) {
        // Optional: Make rejection reason mandatory if desired by uncommenting below
        res.status(400);
        throw new Error("Rejection reason is required when rejecting.");
    }
    // Removed validation for commissionRate from req.body as seller doesn't set it here.
    // Add validation for agreementDetails length if needed

    // --- Fetch Documents ---
    const [seller, dropshipper] = await Promise.all([
        Seller.findById(sellerId),
        Dropshipper.findById(dropshipperId)
    ]);

    if (!seller) {
        res.status(404);
        throw new Error("Seller performing the action not found.");
    }
    if (!dropshipper) {
        res.status(404);
        throw new Error("Dropshipper who made the request not found.");
    }

    // --- Locate Connection Request in Both Documents ---
    const sellerConnIndex = seller.dropshipperConnections.findIndex(conn => conn.dropshipperId.equals(dropshipperId));
    const dsConnIndex = dropshipper.connectedSellers.findIndex(conn => conn.sellerId.equals(sellerId));

    if (sellerConnIndex === -1 || dsConnIndex === -1) {
        res.status(404);
        throw new Error("Connection request not found between this seller and dropshipper.");
    }

    // --- Check Current Status ---
    const currentSellerStatus = seller.dropshipperConnections[sellerConnIndex].status;
    const currentDsStatus = dropshipper.connectedSellers[dsConnIndex].status;

    if (currentSellerStatus !== 'pending' || currentDsStatus !== 'pending') {
        res.status(400);
        throw new Error(`Cannot respond to request. Current status is already '${currentSellerStatus}'.`);
    }

    // --- Update Status and Data ---
    const responseTimestamp = Date.now();
    let notificationMessage = '';

    // Get the commission rate originally proposed by the dropshipper
    // It should be the same in both records at this 'pending' stage
    const proposedCommissionRate = seller.dropshipperConnections[sellerConnIndex].commissionRate;

    if (status === 'approved') {
        // Seller approves the connection WITH the existing proposed commission rate.

        // Update Seller's record
        seller.dropshipperConnections[sellerConnIndex].status = 'approved';
        seller.dropshipperConnections[sellerConnIndex].respondedAt = responseTimestamp;
        // Keep the commissionRate as it was proposed (redundant but ensures consistency)
        seller.dropshipperConnections[sellerConnIndex].commissionRate = proposedCommissionRate;
        if (agreementDetails !== undefined) seller.dropshipperConnections[sellerConnIndex].agreementDetails = agreementDetails; // Seller can still add notes on approval

        // Update Dropshipper's record
        dropshipper.connectedSellers[dsConnIndex].status = 'approved';
        dropshipper.connectedSellers[dsConnIndex].respondedAt = responseTimestamp;
        // Ensure the commissionRate is the one that was approved
        dropshipper.connectedSellers[dsConnIndex].commissionRate = proposedCommissionRate;
        if (agreementDetails !== undefined) dropshipper.connectedSellers[dsConnIndex].agreementDetails = agreementDetails; // Sync notes

        notificationMessage = `Your connection request with seller ${seller.companyName || sellerId} at ${proposedCommissionRate !== null ? proposedCommissionRate + '%' : 'the proposed'} commission rate has been approved!`;

    } else { // status === 'rejected'
        // Seller rejects the connection.

        // Update Seller's record
        seller.dropshipperConnections[sellerConnIndex].status = 'rejected';
        seller.dropshipperConnections[sellerConnIndex].respondedAt = responseTimestamp;
        if (rejectionReason) seller.dropshipperConnections[sellerConnIndex].rejectionReason = rejectionReason; // Add reason to seller's record

        // Update Dropshipper's record
        dropshipper.connectedSellers[dsConnIndex].status = 'rejected';
        dropshipper.connectedSellers[dsConnIndex].respondedAt = responseTimestamp;
        // Optionally add rejectionReason to dropshipper's record too if needed

        notificationMessage = `Your connection request with seller ${seller.companyName || sellerId} was rejected.`;
        if (rejectionReason) notificationMessage += ` Reason: ${rejectionReason}`;
    }

    // --- Save Documents ---
    try {
        await Promise.all([
            seller.save(),
            dropshipper.save()
        ]);
    } catch (saveError) {
        console.error("Error saving connection status update:", saveError);
        res.status(500);
        throw new Error("Failed to save connection status update.");
    }

    // --- TODO: Implement Notification system for the Dropshipper ---
    console.log(`NOTIFICATION for Dropshipper ${dropshipperId}: ${notificationMessage}`);


    // --- Response ---
    res.status(200).json({ message: `Connection request successfully ${status}.` });
});

// @desc    List all connections for the logged-in Dropshipper
// @route   GET /api/v1/shippers/connections
// @access  Private (Dropshipper)
export const getMyConnections = asyncHandler(async (req, res) => {
    const dropshipper = await Dropshipper.findById(req.dropshipper._id)
        .populate('connectedSellers.sellerId', 'companyName userInfo businessType'); // Populate Seller info

    if (!dropshipper) {
        res.status(404);
        throw new Error("Dropshipper profile not found.");
    }

    res.status(200).json(dropshipper.connectedSellers);
});


// @desc    Withdraw a pending request OR revoke an approved connection by Dropshipper
// @route   DELETE /api/v1/shippers/connections/:sellerId
// @access  Private (Dropshipper)
export const revokeOrWithdrawConnection = asyncHandler(async (req, res) => {
    const dropshipperId = req.dropshipper._id;
    const { sellerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        res.status(400);
        throw new Error("Invalid Seller ID format.");
    }

    const seller = await Seller.findById(sellerId);
    const dropshipper = await Dropshipper.findById(dropshipperId);

    if (!seller || !dropshipper) {
        res.status(404);
        throw new Error("Seller or Dropshipper not found.");
    }

    // Find the connection in both documents
    const dsConnIndex = dropshipper.connectedSellers.findIndex(conn => conn.sellerId.equals(sellerId));
    const sellerConnIndex = seller.dropshipperConnections.findIndex(conn => conn.dropshipperId.equals(dropshipperId));

    if (dsConnIndex === -1 || sellerConnIndex === -1) {
        res.status(404);
        throw new Error("Connection not found.");
    }

    const currentStatus = dropshipper.connectedSellers[dsConnIndex].status;

    if (currentStatus === 'pending') {
        // Withdraw pending request: Remove from both arrays
        dropshipper.connectedSellers.splice(dsConnIndex, 1);
        seller.dropshipperConnections.splice(sellerConnIndex, 1);
        await dropshipper.save();
        await seller.save();
        // TODO: Notify Seller if needed
        res.status(200).json({ message: "Connection request withdrawn." });

    } else if (currentStatus === 'approved') {
        // Revoke approved connection: Update status in both
        const revokedStatus = 'revoked_by_dropshipper';
        dropshipper.connectedSellers[dsConnIndex].status = revokedStatus;
        dropshipper.connectedSellers[dsConnIndex].respondedAt = Date.now(); // Mark when revoked
        seller.dropshipperConnections[sellerConnIndex].status = revokedStatus;
        seller.dropshipperConnections[sellerConnIndex].respondedAt = Date.now();

        await dropshipper.save();
        await seller.save();
        // TODO: Notify Seller
        res.status(200).json({ message: "Connection revoked successfully." });

    } else {
        // Cannot withdraw/revoke if rejected or already revoked
        res.status(400);
        throw new Error(`Cannot modify connection with status: ${currentStatus}`);
    }
});


// @desc    Get list of products available for dropshipping from a connected Seller
// @route   GET /api/v1/shippers/sellers/:sellerId/products
// @access  Private (Dropshipper)
export const getProductsFromConnectedSeller = asyncHandler(async (req, res) => {
    const dropshipperId = req.dropshipper._id;
    const { sellerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        res.status(400);
        throw new Error("Invalid Seller ID format.");
    }

    // 1. Verify the connection is approved
    const dropshipper = await Dropshipper.findOne({
        _id: dropshipperId,
        'connectedSellers.sellerId': sellerId,
        'connectedSellers.status': 'approved'
    });

    if (!dropshipper) {
        res.status(403);
        throw new Error("No approved connection found with this seller.");
    }

    // 2. Fetch products from the seller, potentially filtered by 'allowDropshipping' flag
    // Add pagination later
    const products = await ProductListing.find({
        sellerId: sellerId,
        // Add filter if sellers can mark products specifically for dropshipping:
        allowDropshipping: true,
        // isActive: true // Only list active products
    }).select('title images productPrice description quantity category'); // Select relevant fields


    res.status(200).json(products);
});

// @desc    Get list of ALL available products from ALL approved connected Sellers
// @route   GET /api/v1/shippers/connections/products/all
// @access  Private (Dropshipper)
export const getAllProductsFromConnectedSellers = asyncHandler(async (req, res) => {
    const dropshipperId = req.dropshipper._id; // From isDropshipper middleware

    // 1. Find the dropshipper and their approved connections
    const dropshipper = await Dropshipper.findById(dropshipperId)
        .select('connectedSellers'); // Only select the connections field

    if (!dropshipper) {
        // Should be caught by middleware, but good practice
        res.status(404);
        throw new Error("Dropshipper profile not found.");
    }

    // 2. Extract IDs of approved sellers
    const approvedSellerIds = dropshipper.connectedSellers
        .filter(conn => conn.status === 'approved')
        .map(conn => conn.sellerId);

    // 3. Handle case where there are no approved sellers
    if (approvedSellerIds.length === 0) {
        res.status(200).json([]); // Return empty array if no connections
        return;
    }

    // 4. Fetch active products from these approved sellers
    // Ensure your ProductListing schema has 'sellerId' referencing 'sellers' model
    // and includes fields like 'title', 'productPrice', 'quantity' etc.
    const products = await ProductListing.find({
        sellerId: { $in: approvedSellerIds }, // Use $in operator
        // Optional: Add filter if sellers can mark products specifically for dropshipping
        allowDropshipping: true,
        // isActive: true // Only list active products

    })
        .populate({ // Populate seller information for each product
            path: 'sellerId',
            select: 'companyName businessType _id' // Select specific seller fields you want to show
            // You could also populate seller's userInfo: 'populate: { path: 'userInfo', select: 'name userName' }'
        })
        .select('title images productPrice description quantity category sellerId'); // Select desired product fields + sellerId for population key

    // 5. Return the flat list of products, each enriched with seller info
    res.status(200).json(products);
});




// --- Admin Controllers ---

const DROPSHIPPERS_PER_PAGE = 10; // Or import from a constants file

// --- New Controller ---

// @desc    Get PENDING Dropshipper applications (Admin - Paginated & Searchable)
// @route   GET /api/v1/shippers/admin/pending
// @access  Private (Admin)
export const getPendingDropshippersAdmin = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || DROPSHIPPERS_PER_PAGE;
    const searchTerm = req.query.search || '';

    // Base query for pending status
    const query = { approvalStatus: 'pending' };

    // Add search functionality (case-insensitive search on relevant fields)
    if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, 'i');
        query.$or = [
            { businessName: searchRegex },
            { email: searchRegex },
            { mobileNumber: searchRegex },
            // Add more fields to search if needed
            // Example: Searching populated user fields requires different approach or aggregation
        ];
    }

    // Get total count for pagination based on the query
    const totalCount = await Dropshipper.countDocuments(query);

    // Find pending dropshippers with pagination and population
    const dropshippers = await Dropshipper.find(query)
        .populate('userInfo', 'name userName emailId createdAt') // Select specific User fields
        .sort({ createdAt: -1 }) // Show newest first
        .skip((page - 1) * limit)
        .limit(limit);

    res.status(200).json({
        data: dropshippers,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount: totalCount,
    });
});

export const getApprovedDropshippersAdmin = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || DROPSHIPPERS_PER_PAGE;
    const searchTerm = req.query.search || '';

    // Base query for pending status
    const query = { approvalStatus: 'approved' };

    // Add search functionality (case-insensitive search on relevant fields)
    if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, 'i');
        query.$or = [
            { businessName: searchRegex },
            { email: searchRegex },
            { mobileNumber: searchRegex },
            // Add more fields to search if needed
            // Example: Searching populated user fields requires different approach or aggregation
        ];
    }

    // Get total count for pagination based on the query
    const totalCount = await Dropshipper.countDocuments(query);

    // Find approved dropshippers with pagination and population
    const dropshippers = await Dropshipper.find(query)
        .populate('userInfo', 'name userName emailId createdAt') // Select specific User fields
        .sort({ createdAt: -1 }) // Show newest first
        .skip((page - 1) * limit)
        .limit(limit);

    res.status(200).json({
        data: dropshippers,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount: totalCount,
    });
});


// --- New Controller ---

// @desc    Get a single Dropshipper application/profile by ID (Admin)
// @route   GET /api/v1/shippers/admin/:dropshipperId
// @access  Private (Admin)
export const getDropshipperByIdAdmin = asyncHandler(async (req, res) => {
    const { dropshipperId } = req.params;

    // Validate if dropshipperId is a valid MongoDB ObjectId (optional but recommended)
    if (!mongoose.Types.ObjectId.isValid(dropshipperId)) {
        res.status(400);
        throw new Error("Invalid Dropshipper ID format.");
    }

    const dropshipper = await Dropshipper.findById(dropshipperId)
        .populate('userInfo', 'name userName emailId createdAt role'); // Populate necessary user info

    if (!dropshipper) {
        res.status(404);
        throw new Error("Dropshipper application or profile not found.");
    }

    res.status(200).json(dropshipper);
});


// @desc    Get all Dropshipper applications/profiles (Admin)
// @route   GET /api/v1/shippers/admin/all
// @access  Private (Admin)
export const getAllDropshippersAdmin = asyncHandler(async (req, res) => {
    // Add filtering and pagination as needed
    const dropshippers = await Dropshipper.find({})
        .populate('userInfo', 'name userName emailId createdAt')
        .sort({ createdAt: -1 }); // Sort by creation date
    res.status(200).json(dropshippers);
});

// @desc    Approve a Dropshipper application (Admin)
// @route   PUT /api/v1/shippers/admin/approve/:dropshipperId
// @access  Private (Admin)
export const approveDropshipperAdmin = asyncHandler(async (req, res) => {
    const { dropshipperId } = req.params;

    const dropshipper = await Dropshipper.findById(dropshipperId);

    if (!dropshipper) {
        res.status(404);
        throw new Error("Dropshipper application not found.");
    }

    if (dropshipper.approvalStatus === 'approved') {
        res.status(400).send('Dropshipper already approved.');
        return;
    }

    dropshipper.approvalStatus = 'approved';
    dropshipper.rejectedReason = null; // Clear any previous rejection reason
    await dropshipper.save();

    // Update the User role
    await User.findByIdAndUpdate(dropshipper.userInfo, { $set: { role: 'dropshipper' } });

    // TODO: Send notification to the user

    res.status(200).json({ message: "Dropshipper approved successfully.", data: dropshipper });
});


// @desc    Reject or Suspend a Dropshipper (Admin)
// @route   PUT /api/v1/shippers/admin/reject/:dropshipperId
// @access  Private (Admin)
export const rejectOrSuspendDropshipperAdmin = asyncHandler(async (req, res) => {
    const { dropshipperId } = req.params;
    const { reason, status } = req.body; // status should be 'rejected' or 'suspended'

    if (!['rejected', 'suspended'].includes(status)) {
        res.status(400);
        throw new Error("Invalid status. Must be 'rejected' or 'suspended'.");
    }
    if (!reason && status === 'rejected') {
        res.status(400);
        throw new Error("Rejection reason is required.");
    }


    const dropshipper = await Dropshipper.findById(dropshipperId);

    if (!dropshipper) {
        res.status(404);
        throw new Error("Dropshipper application/profile not found.");
    }

    if (dropshipper.approvalStatus === status) {
        res.status(400).send(`Dropshipper already ${status}.`);
        return;
    }

    dropshipper.approvalStatus = status;
    dropshipper.rejectedReason = reason || dropshipper.rejectedReason; // Keep old reason if suspending without new one
    await dropshipper.save();

    // Update the User role (e.g., back to 'user' if rejected/suspended)
    // Decide if suspension keeps the 'dropshipper' role flag or changes it
    await User.findByIdAndUpdate(dropshipper.userInfo, { $set: { role: 'user' } }); // Or a custom 'suspended' role?

    // TODO: Send notification to the user

    res.status(200).json({ message: `Dropshipper ${status} successfully.`, data: dropshipper });
});