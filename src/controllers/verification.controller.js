import User from '../models/user.model.js';
import axios from 'axios'; // For 3rd party API calls
import { v4 as uuidv4 } from 'uuid';

// --- Environment Variables ---
const AUTHBRIDGE_API_KEY = process.env.AUTHBRIDGE_API_KEY;
const AUTHBRIDGE_CLIENT_ID = process.env.AUTHBRIDGE_CLIENT_ID;
const AUTHBRIDGE_API_URL_OTP_SEND = process.env.AUTHBRIDGE_API_URL_OTP_SEND; // e.g., https://api.authbridge.com/v2/aadhaar/otp/send
const AUTHBRIDGE_API_URL_OTP_VERIFY = process.env.AUTHBRIDGE_API_URL_OTP_VERIFY; // e.g., https://api.authbridge.com/v2/aadhaar/otp/verify

// --- Aadhaar OTP Initiation ---
export const initiateAadhaarVerification = async (req, res) => {
  try {
    const { aadhaarNumber } = req.body;
    const userId = req.user._id; // From auth middleware

    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid Aadhaar number format (must be 12 digits).' });
    }

    const user = await User.findById(userId).select('+aadhaarNumberTransient +aadhaarOTPReference +aadhaarOTPExpiry');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    if (user.isAadhaarVerified) return res.status(400).json({ success: false, message: 'Aadhaar already verified.' });

    const authBridgeTransactionId = uuidv4(); // For tracking with AuthBridge

    // --- !!! ACTUAL AUTHBRIDGE API CALL TO SEND OTP !!! ---
    // const authBridgeResponse = await axios.post(AUTHBRIDGE_API_URL_OTP_SEND, {
    //   clientId: AUTHBRIDGE_CLIENT_ID,
    //   transactionId: authBridgeTransactionId,
    //   aadhaarNumber: aadhaarNumber, // Full Aadhaar sent transiently
    //   // ... other AuthBridge required parameters (e.g., consent)
    // }, { headers: { 'x-api-key': AUTHBRIDGE_API_KEY, 'Content-Type': 'application/json' } });

    // if (!authBridgeResponse.data || !authBridgeResponse.data.success || !authBridgeResponse.data.otpReferenceToken) { // Check actual success criteria
    //   console.error("AuthBridge OTP Send Error:", authBridgeResponse.data);
    //   return res.status(500).json({ success: false, message: authBridgeResponse.data.message || 'Failed to send Aadhaar OTP via AuthBridge.' });
    // }
    // const otpReferenceTokenFromAuthBridge = authBridgeResponse.data.otpReferenceToken;
    // --- END OF ACTUAL AUTHBRIDGE CALL (REPLACE MOCK BELOW) ---

    // Mocking successful AuthBridge OTP send
    const otpReferenceTokenFromAuthBridge = `mock_authb_otp_ref_${authBridgeTransactionId}`;
    console.log(`Mock AuthBridge: OTP request for Aadhaar ending ****${aadhaarNumber.slice(-4)} with OTP Ref: ${otpReferenceTokenFromAuthBridge}`);
    // End Mock

    user.aadhaarNumberTransient = aadhaarNumber; // Store full Aadhaar temporarily for verification step
    user.aadhaarOTPReference = otpReferenceTokenFromAuthBridge; // Store AuthBridge's reference
    user.aadhaarApiReference = authBridgeTransactionId; // Your internal reference for the AuthBridge transaction
    user.aadhaarOTPExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Aadhaar OTP has been sent (simulated).',
      otpReference: otpReferenceTokenFromAuthBridge, // Send this to client
    });
  } catch (error) {
    console.error('Aadhaar OTP Initiation Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Aadhaar OTP initiation failed.' });
  }
};

// --- Aadhaar OTP Verification ---
export const verifyAadhaarOTP = async (req, res) => {
  try {
    const { otp, otpReference } = req.body; // otpReference is from initiateAadhaarVerification response
    const userId = req.user._id;

    if (!otp || !otpReference) {
      return res.status(400).json({ success: false, message: 'OTP and OTP Reference are required.' });
    }

    const user = await User.findById(userId).select('+aadhaarNumberTransient +aadhaarOTPReference +aadhaarOTPExpiry');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    if (user.aadhaarOTPReference !== otpReference || !user.aadhaarOTPExpiry || Date.now() > user.aadhaarOTPExpiry) {
      user.aadhaarOTPReference = null; user.aadhaarOTPExpiry = null; user.aadhaarNumberTransient = null;
      await user.save();
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP session. Please try again.' });
    }

    const aadhaarToVerify = user.aadhaarNumberTransient;

    // --- !!! ACTUAL AUTHBRIDGE API CALL TO VERIFY OTP !!! ---
    // const authBridgeVerifyResponse = await axios.post(AUTHBRIDGE_API_URL_OTP_VERIFY, {
    //   clientId: AUTHBRIDGE_CLIENT_ID,
    //   transactionId: user.aadhaarApiReference, // The transactionId you sent during OTP send
    //   otpReference: otpReference, // The reference token AuthBridge gave you
    //   otp: otp,
    //   aadhaarNumber: aadhaarToVerify, // If needed by AuthBridge verify API
    //   // ... other AuthBridge required parameters
    // }, { headers: { 'x-api-key': AUTHBRIDGE_API_KEY, 'Content-Type': 'application/json' } });

    // if (!authBridgeVerifyResponse.data || !authBridgeVerifyResponse.data.success) { // Check actual success criteria
    //   console.error("AuthBridge OTP Verify Error:", authBridgeVerifyResponse.data);
    //   user.aadhaarOTPReference = null; user.aadhaarOTPExpiry = null; user.aadhaarNumberTransient = null; // Clear temp fields
    //   await user.save();
    //   return res.status(400).json({ success: false, message: authBridgeVerifyResponse.data.message || 'Aadhaar OTP verification failed with AuthBridge.' });
    // }
    // --- END OF ACTUAL AUTHBRIDGE CALL (REPLACE MOCK BELOW) ---

    // Mocking successful AuthBridge OTP verification
    const isOTPVerifiedMock = (otp === "123456"); // Simulate OTP check
    console.log(`Mock AuthBridge: Verifying OTP ${otp} for Aadhaar ending ****${aadhaarToVerify.slice(-4)} (Ref: ${otpReference}). Verified: ${isOTPVerifiedMock}`);
    // End Mock

    user.aadhaarOTPReference = null; user.aadhaarOTPExpiry = null; user.aadhaarNumberTransient = null; // Clear temp fields

    if (isOTPVerifiedMock /* && authBridgeVerifyResponse.data.isAadhaarVerified (or similar flag) */) {
      user.isAadhaarVerified = true;
      user.aadhaarVerificationDate = new Date();
      user.aadhaarNumberLast4 = aadhaarToVerify.slice(-4); // Store only last 4 digits
      user.verificationFlowStatus = 'pending_address';
      await user.save();
      return res.status(200).json({ success: true, message: 'Aadhaar verified successfully.' });
    } else {
      await user.save(); // Save with cleared temp fields
      return res.status(400).json({ success: false, message: 'Aadhaar OTP verification failed. Invalid OTP.' });
    }
  } catch (error) {
    console.error('Aadhaar OTP Verification Error:', error.response ? error.response.data : error.message);
    // Attempt to clear temp fields on error
    try { const userToClear = await User.findById(req.user._id).select('+aadhaarNumberTransient +aadhaarOTPReference +aadhaarOTPExpiry'); if(userToClear) { userToClear.aadhaarOTPReference = null; userToClear.aadhaarOTPExpiry = null; userToClear.aadhaarNumberTransient = null; await userToClear.save();}} catch(e){}
    res.status(500).json({ success: false, message: 'Aadhaar OTP verification process failed.' });
  }
};

// --- Select Address for Verification ---
// Called from frontend Step 2, after user chooses an address from their list.
export const selectAddressForVerification = async (req, res) => {
  try {
    const { addressId } = req.body; 
    const userId = req.user._id;

    if (!addressId) return res.status(400).json({ success: false, message: 'Address ID is required.' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    if (!user.isAadhaarVerified) return res.status(400).json({ success: false, message: 'Aadhaar must be verified first.' });

    const addressExists = user.address.id(addressId); // Mongoose way to find subdocument by _id
    if (!addressExists) return res.status(404).json({ success: false, message: 'Address not found or invalid.' });

    user.selectedAddressId = addressId;
    user.isAddressSelected = true;
    user.addressSelectedDate = new Date();
    user.verificationFlowStatus = 'pending_payment_setup';
    await user.save();

    res.status(200).json({ success: true, message: 'Address selected. Proceed to payment setup.' });
  } catch (error) {
    console.error('Select Address Error:', error);
    res.status(500).json({ success: false, message: 'Failed to select address.' });
  }
};

// --- Get Current Verification Status ---
export const getVerificationStatus = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('verificationFlowStatus isAadhaarVerified isAddressSelected isAutoPaymentEnabled name emailId');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        res.status(200).json({ success: true, status: user });
    } catch (error) {
        console.error('Get Verification Status Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch verification status.' });
    }
};