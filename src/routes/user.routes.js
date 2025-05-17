import Express from 'express';
import { getUserById, createUser, updateUser, deleteUser, getAllUsersAdmin, getUserByIdAdmin, toggleUserAccessAdmin } from '../controllers/user.controller.js';
import { userAuth } from '../middlewares/auth.js';
import { addAddress, addCategories, deleteAddress, getAddressById, getAllAddresses, getCategories, updateAddress, updateCategories } from '../controllers/authentication.controller.js';
import { getVerificationStatus, initiateAadhaarVerification, selectAddressForVerification, verifyAadhaarOTP } from '../controllers/verification.controller.js';
import { handleMandatePaymentCallback, initiateMandateSetupPayment } from '../controllers/Payupayment.controller.js';

const userRouter = Express.Router();

userRouter.get("/id", userAuth, getUserById);

//  Admin routes

//  Create a new user from admin end
userRouter.post("/admin/create", createUser);

//  Update user details from admin end
userRouter.put("/admin/update/:id", updateUser);

//  allow or restrict user access 
userRouter.put("/access/:id", toggleUserAccessAdmin);

//  Delete user from admin end
userRouter.delete("/admin/delete/:id", deleteUser);

//  Get all users from admin end
userRouter.get("/admin/get/all", getAllUsersAdmin);

//  Get user by id from admin end
userRouter.get("/admin/get/:id", getUserByIdAdmin);


// Create a new Category
userRouter.post("/categories/add", userAuth, addCategories);
// Update a Category
userRouter.get("/categories", userAuth, getCategories);
//update a Category
userRouter.put("/categories/update", userAuth, updateCategories);


// ----------------------Address Api--------------------------


userRouter.post("/addresses", userAuth, addAddress);       // Create new address
userRouter.get("/addresses", userAuth, getAllAddresses);   // Get all addresses for the user
userRouter.get("/addresses/:id", userAuth, getAddressById); // Get a single address by its ID
userRouter.put("/addresses/:id", userAuth, updateAddress);   // Update a specific address
userRouter.delete("/addresses/:id", userAuth, deleteAddress); // Delete a specific address


// //--------------------Aaadhaar & PayU Verification for Verified users-------------------

// userRouter.post('/aadhaar/initiate', userAuth, initiateAadhaarVerification);
// userRouter.post('/aadhaar/verify', userAuth, verifyAadhaarOTP);
// userRouter.post('/complete', userAuth, completeVerification);
// userRouter.post('/payment/initiate', userAuth, initiatePayment);
// userRouter.post('/payment/callback', paymentCallback);



// --- User Verification Flow Routes ---

// Step 0: Get current verification status (NEW)
userRouter.get('/verification/status', userAuth, getVerificationStatus);

// Step 1: Aadhaar Verification
userRouter.post('/verification/aadhaar/initiate', userAuth, initiateAadhaarVerification);
userRouter.post('/verification/aadhaar/verify', userAuth, verifyAadhaarOTP);

// Step 2: Address Selection (REPLACES/REFINES your old '/complete' route)
// This route is for when the user has selected an address from their list to be used for verification.
userRouter.post('/verification/select-address', userAuth, selectAddressForVerification);

// Step 3: PayU Auto-Payment (Mandate) Setup
// Renamed for clarity to reflect mandate setup; uses the 'initiateMandateSetupPayment' controller.
userRouter.post('/payment/initiate-mandate', userAuth, initiateMandateSetupPayment);
// PayU will callback to this route. It does not need userAuth middleware as PayU makes the call.
userRouter.post('/payment/mandate-callback', handleMandatePaymentCallback);
export default userRouter;