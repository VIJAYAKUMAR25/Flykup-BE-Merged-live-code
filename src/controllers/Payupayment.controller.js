import User from '../models/user.model.js';
import crypto from 'crypto';

// --- Environment Variables ---
const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;
// IMPORTANT: PayU often uses different SALTs for different transaction types/products.
// Verify if SI/Mandate uses a different SALT (e.g., "SALT v2") than simple payments.
const PAYU_MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT_FOR_SI || process.env.PAYU_MERCHANT_SALT; // Use specific SI salt if available
const PAYU_API_BASE_URL = process.env.PAYU_API_BASE_URL || "https://test.payu.in"; // Or "https://secure.payu.in" for prod
const APP_BASE_URL = process.env.APP_BASE_URL; // Your frontend/app base URL

// --- Initiate PayU Mandate Setup Transaction ---
export const initiateMandateSetupPayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId); // No need to populate address if using user.address.id()

    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    if (user.verificationFlowStatus !== 'pending_payment_setup') {
      return res.status(400).json({ success: false, message: `Payment setup cannot be initiated. Current status: ${user.verificationFlowStatus}` });
    }
    if (user.isAutoPaymentEnabled && user.payuMandate && user.payuMandate.status === 'active') {
        return res.status(400).json({ success: false, message: 'Auto-payment is already active.' });
    }

    const selectedUserAddress = user.address.id(user.selectedAddressId);
    if (!selectedUserAddress) return res.status(400).json({ success: false, message: 'Selected address not found.' });

    const txnid = `MANDATE_${userId.toString().slice(-5)}_${Date.now()}`;
    const amount = process.env.PAYU_MANDATE_VERIFICATION_AMOUNT || "2.00"; // e.g., ₹2.00 - configurable
    const productinfo = "Auto-Payment Mandate Setup";
    const firstname = (selectedUserAddress.name || user.name).split(' ')[0];
    const email = user.emailId;
    const phone = selectedUserAddress.mobile || user.mobile;

    const paymentPayload = {
      key: PAYU_MERCHANT_KEY,
      txnid: txnid,
      amount: amount,
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      surl: `${APP_BASE_URL}/api/payment/mandate-callback`, // Single callback, status handled within
      furl: `${APP_BASE_URL}/api/payment/mandate-callback`,
      udf1: userId.toString(), // To identify user in callback
      udf2: '', udf3: '', udf4: '', udf5: '',
      // --- SI Specific Parameters - CRITICAL: GET THESE FROM PAYU'S LATEST SI DOCS ---
      // These are EXAMPLES and likely need adjustment.
      // "service_provider": "payu_paisa", // Often required
      // "is_user_consented_for_si": "1", // Explicit consent
      // "si": "1", // Or "enable_si": "1"
      // "si_details": JSON.stringify({ // Structure varies, this is an example
      //   "billing_amount": amount, // Amount for this verification transaction
      //   "billing_currency": "INR",
      //   "billing_limit": "MAX", // Or "ON" for specific subsequent amounts
      //   "billing_cycle": "ADHOC", // Or "MONTHLY", "YEARLY" etc. "ADHOC" means you trigger subsequent payments via API.
      //   "billing_rule": "MAX", // "MAX" means subsequent debits up to this verification amount, or you set a different rule.
      //   "payment_start_date": new Date().toISOString().split('T')[0], // YYYY-MM-DD
      //   "payment_end_date": "2099-12-31", // Long expiry for ADHOC or actual end date
      //   "debit_notification_url": `${APP_BASE_URL}/api/payment/debit-notification` // If PayU sends pre-debit notifications
      // })
    };

    // --- HASH CALCULATION FOR SI/MANDATE - CRITICAL ---
    // The order of fields in hashString MUST match PayU's documentation for SI setup.
    // It's usually: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|...any other mandatory fields...|SALT
    // The '...' part is crucial for SI. It might include si, si_details etc.
    // Example (HIGHLY LIKELY TO BE INCOMPLETE/INCORRECT FOR YOUR SPECIFIC SI PRODUCT - VERIFY WITH PAYU):
    let hashSequence = [
      paymentPayload.key, paymentPayload.txnid, paymentPayload.amount, paymentPayload.productinfo,
      paymentPayload.firstname, paymentPayload.email,
      paymentPayload.udf1, paymentPayload.udf2, paymentPayload.udf3, paymentPayload.udf4, paymentPayload.udf5,
      // paymentPayload.si, // If 'si' field is used and part of hash
      // paymentPayload.si_details // If 'si_details' field is used and part of hash
      // ... any other fields PayU specifies for SI request hash ...
    ];
    const hashString = hashSequence.join('|') + '|' + PAYU_MERCHANT_SALT;
    paymentPayload.hash = crypto.createHash('sha512').update(hashString).digest('hex');
    // --- END HASH CALCULATION ---

    user.payuMandate = { // Reset/initialize mandate info
        initialTransactionId: txnid,
        status: 'pending_confirmation', // Waiting for PayU callback
        mandateToken: null, mandateId: null, bankReferenceNumber: null, failureReason: null
    };
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Redirecting to PayU for mandate setup...',
      paymentData: paymentPayload,
      payuActionUrl: `${PAYU_API_BASE_URL}/_payment` // PayU's payment processing URL
    });

  } catch (error) {
    console.error('Initiate Mandate Setup Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Failed to initiate mandate setup.' });
  }
};

// --- Handle PayU Mandate Setup Callback (SURL & FURL) ---
export const handleMandatePaymentCallback = async (req, res) => {
  const responseParams = req.body;
  const userId = responseParams.udf1;
  const clientTxnid = responseParams.txnid; // Your transaction ID

  // Determine redirect URL base for frontend
  const frontendRedirectBase = process.env.FRONTEND_PAYMENT_STATUS_URL || `${process.env.FRONTEND_BASE_URL}/verification/payment-status`;

  if (!userId) {
    console.error('PayU Callback: Missing udf1 (userId).', responseParams);
    return res.redirect(`${frontendRedirectBase}?status=error&reason=invalid_callback_param`);
  }

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      console.error(`PayU Callback: User not found for ID ${userId}. Txn: ${clientTxnid}`);
      return res.redirect(`${frontendRedirectBase}?status=error&txnid=${clientTxnid}&reason=user_not_found`);
    }

    // --- RESPONSE HASH VERIFICATION - CRITICAL ---
    // PayU response hash is usually: SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
    // For SI, it might include additional fields like mandate_id, unmappedstatus etc. VERIFY WITH PAYU DOCS.
    const receivedHash = responseParams.hash;
    let hashSequence = [
      PAYU_MERCHANT_SALT, responseParams.status || '',
      // The following are placeholders for potential empty fields in PayU's typical reverse hash sequence.
      // If PayU includes specific fields like error_Message, net_amount_debit, etc., for SI callback hash, they must be here in order.
      responseParams.additionalCharges || '', // If present and part of hash
      responseParams.udf10 || '', responseParams.udf9 || '', responseParams.udf8 || '',
      responseParams.udf7 || '', responseParams.udf6 || '',
      responseParams.udf5 || '', responseParams.udf4 || '', responseParams.udf3 || '',
      responseParams.udf2 || '', responseParams.udf1 || '',
      responseParams.email || '', responseParams.firstname || '',
      responseParams.productinfo || '', responseParams.amount || '',
      responseParams.txnid || '', responseParams.key || ''
    ];
    // Example: If mandate_id and unmappedstatus are part of hash (check PayU docs for order!)
    // hashSequence.splice(2, 0, responseParams.unmappedstatus || '', responseParams.mandate_id || ''); // Insert after status

    const hashString = hashSequence.join('|');
    const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');
    // --- END HASH VERIFICATION ---

    if (receivedHash !== calculatedHash) {
      console.warn(`PayU Callback Hash Mismatch for Txn: ${clientTxnid}. User: ${userId}`);
      user.payuMandate.status = 'failed_hash_mismatch';
      user.payuMandate.failureReason = 'Hash verification failed.';
      await user.save();
      return res.redirect(`${frontendRedirectBase}?status=failure&txnid=${clientTxnid}&reason=tampered_response`);
    }

    // Hash is valid, process the PayU response
    user.payuMandate.bankReferenceNumber = responseParams.bank_ref_num || responseParams.bankcode;
    user.payuMandate.initialTransactionId = clientTxnid; // Ensure it matches the one we sent

    if (responseParams.status === 'success') {
      // For SI, 'unmappedstatus' is often the true indicator of mandate approval.
      const mandateStatus = responseParams.unmappedstatus || 'approved'; // Default to approved if unmappedstatus not present but status is success
      const mandateToken = responseParams.issuing_bank_token || responseParams.card_token || responseParams.upi_mandate_id || responseParams.mandate_id || responseParams.payu_si_token; // Check PayU specific field for the token

      if ((mandateStatus.toLowerCase() === 'approved' || mandateStatus.toLowerCase() === 'active') && mandateToken) {
        user.payuMandate.mandateToken = mandateToken;
        user.payuMandate.mandateId = responseParams.mandate_id || mandateToken; // Store specific mandate_id if available
        user.payuMandate.status = 'active';
        user.autoPaymentSetupDate = new Date();
        user.verificationFlowStatus = 'completed'; // Entire verification flow is now complete
        // isAutoPaymentEnabled will be set by pre-save hook
        await user.save();
        return res.redirect(`${frontendRedirectBase}?status=success&txnid=${clientTxnid}&mandateId=${user.payuMandate.mandateId}`);
      } else {
        const failureMsg = responseParams.error_Message || `Mandate not approved (status: ${mandateStatus}, token: ${mandateToken ? 'present' : 'missing'})`;
        console.warn(`PayU Mandate Not Fully Approved for Txn: ${clientTxnid}. Reason: ${failureMsg}`);
        user.payuMandate.status = 'failed_payu_status';
        user.payuMandate.failureReason = failureMsg;
        await user.save();
        return res.redirect(`${frontendRedirectBase}?status=failure&txnid=${clientTxnid}&reason=${encodeURIComponent(failureMsg)}`);
      }
    } else { // status is 'failure', 'pending', or other non-success
      const failureMsg = responseParams.error_Message || `Payment failed with status: ${responseParams.status}`;
      console.warn(`PayU Mandate Failed/Pending for Txn: ${clientTxnid}. Reason: ${failureMsg}`);
      user.payuMandate.status = 'failed_payu_status';
      user.payuMandate.failureReason = failureMsg;
      await user.save();
      return res.redirect(`${frontendRedirectBase}?status=${responseParams.status}&txnid=${clientTxnid}&reason=${encodeURIComponent(failureMsg)}`);
    }
  } catch (error) {
    console.error(`PayU Callback Processing Error for Txn: ${clientTxnid}. User: ${userId || 'unknown'}. Error:`, error);
    if (user && user.payuMandate) {
      user.payuMandate.status = 'failed';
      user.payuMandate.failureReason = 'Internal server error during callback processing.';
      await user.save().catch(e => console.error("Error saving user after callback exception:", e));
    }
    return res.redirect(`${frontendRedirectBase}?status=error&txnid=${clientTxnid || 'unknown'}&reason=internal_server_error`);
  }
};