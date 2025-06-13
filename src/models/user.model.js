import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Seller from "./seller.model.js"; 

const UserSchema = new mongoose.Schema(
  {
    fcmTokens: [
      {
        type: String,
        unique: true,
      },
    ],
    sellerInfo: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
    dropshipperInfo: { type: mongoose.Schema.Types.ObjectId, ref: "dropshippers" },
    categories: { type: [String], default: [], maxLength: 100 },
    userName: { type: String, minLength: 1, maxLength: 50, trim: true, required: true, unique: true, index: true },
    name: { type: String, minLength: 1, maxLength: 50, required: true, trim: true },
    emailId: { type: String, required: true, unique: true, trim: true, maxLength: 60, index: true },
    password: { type: String, required: function () { return !this.oAuth; }, maxLength: 120 },
    mobile: { type: String, trim: true, maxLength: 15 }, 
    isEmailVerified: { type: Boolean, default: false },
    role: { type: String, enum: { values: ["user", "seller", "dropshipper", null], message: '{VALUE} is invalid' }, default: null },
    accessAllowed: { type: Boolean, default: true },
    oAuth: { type: String, enum: { values: ["google", "facebook", null], message: '{VALUE} is invalid' }, default: null },
    profileURL: {
      key: {
        type: String,
        maxLength: 255,
        default: null,
      },
      jpgURL: {
        type: String,
        maxLength: 1024,
        default: null,
      },
      blobName: {
        type: String,
        maxLength: 255,
        default: null,
      },
      azureUrl: {
        type: String,
        maxLength: 1024,
        default: null,
      },
    },
    backgroundCoverURL: {
      key: {
        type: String,
        maxLength: 255,
        default: null,
      },
      jpgURL: {
        type: String,
        maxLength: 1024,
        default: null,
      },
      blobName: {
        type: String,
        maxLength: 255,
        default: null,
      },
      azureUrl: {
        type: String,
        maxLength: 1024,
        default: null,
      },
    },
    emailVerificationOtp: { type: String, maxLength: 6, default: null },
    emailVerificationOtpExpiry: { type: Date, default: null },
    isPasswordResetAllowed: { type: Boolean, default: false },
    bio: { type: String, maxLength: 255, default: null },
    address: [
      {
        name: { type: String, maxLength: 50, trim: true, required: true },
        mobile: { type: String, trim: true, maxLength: 15, required: true },
        alternateMobile: { type: String, trim: true, maxLength: 15, default: null },
        line1: { type: String, trim: true, maxLength: 100, required: true },
        line2: { type: String, trim: true, maxLength: 100, default: "" },
        city: { type: String, trim: true, maxLength: 50, required: true },
        state: { type: String, trim: true, maxLength: 50, required: true },
        pincode: { type: String, maxLength: 6, trim: true, required: true },
        addressType: { type: String, enum: ['home', 'work', 'other'], default: 'home' } 
      },
    ],
    filledNewSellerForm: { type: Boolean, default: false },

    // --- Verification Flow Fields ---
    verificationFlowStatus: {
      type: String,
      enum: ['pending_aadhaar', 'pending_address', 'pending_payment_setup', 'completed', 'failed'],
      default: 'pending_aadhaar'
    },

    // Aadhaar Verification
    aadhaarNumberTransient: { type: String, select: false }, 
    aadhaarNumberLast4: { type: String, trim: true, maxLength: 4 },
    isAadhaarVerified: { type: Boolean, default: false },
    aadhaarApiReference: { type: String }, 
    aadhaarVerificationDate: { type: Date },
    aadhaarOTPReference: { type: String, select: false }, 
    aadhaarOTPExpiry: { type: Date, select: false }, 

    // Address Selection
    selectedAddressId: { type: mongoose.Schema.Types.ObjectId, default: null },
    isAddressSelected: { type: Boolean, default: false },
    addressSelectedDate: { type: Date },

    // Payment Mandate Setup (Auto-Payment)
    payuMandate: {
      mandateToken: { type: String, default: null },     
      mandateId: { type: String, default: null },        
      bankReferenceNumber: { type: String, default: null },// Bank ref for the mandate setup transaction
      initialTransactionId: { type: String, default: null },// Your txnid for the mandate setup
      status: { type: String, enum: ['pending_confirmation', 'active', 'failed', 'cancelled', 'failed_hash_mismatch', 'failed_missing_token', 'failed_payu_status'], default: 'pending_confirmation' },
      failureReason: { type: String, default: null },
      _id: false // No separate _id for this sub-object unless needed
    },
    isAutoPaymentEnabled: { type: Boolean, default: false },
    autoPaymentSetupDate: { type: Date },
  },
  { timestamps: true }
);

// --- Instance Methods ---
UserSchema.methods.createJwtToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: "4d" });
};

UserSchema.methods.comparePassword = async function (loginPassword) {
  if (!this.password) return false;
  return bcrypt.compare(loginPassword, this.password);
};

UserSchema.methods.getPublicProfile = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.aadhaarNumberTransient;
    delete userObject.aadhaarOTPReference;
    delete userObject.aadhaarOTPExpiry;
    delete userObject.emailVerificationOtp;
    delete userObject.emailVerificationOtpExpiry;
    return userObject;
};

UserSchema.methods.getSelectedAddress = function () {
  if (this.isAddressSelected && this.selectedAddressId && this.address && this.address.length > 0) {
    return this.address.find(addr => addr._id.equals(this.selectedAddressId));
  }
  return null;
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }
  // Update isAutoPaymentEnabled based on payuMandate status
  if (this.isModified("payuMandate.status")) {
    this.isAutoPaymentEnabled = this.payuMandate.status === 'active';
  }
  next();
});

// Assuming Seller model might need cleanup if a User is deleted.
UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Seller.deleteOne({ userInfo: this._id }).exec(); 
      next();
    } catch (error) {
      next(error);
    }
  }
);

const User = mongoose.model("users", UserSchema);
export default User;