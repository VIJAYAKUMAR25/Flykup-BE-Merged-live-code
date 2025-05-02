import mongoose from "mongoose";
const { Schema } = mongoose;

const dropshipperConnectionSchema = new Schema({
  _id: false,
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sellers",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected",
      "revoked_by_seller",
      "revoked_by_dropshipper",
    ],
    required: true,
    default: "pending",
  },
  commissionRate: {
    type: Number, // Store as percentage, e.g., 15 for 15%
    min: 0,
    max: 100,
    default: null, // Or a platform default? Needs discussion
  },
  agreementDetails: {
    type: String,
    maxLength: 500,
    default: null,
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  respondedAt: {
    type: Date,
    default: null,
  },
});

const DropshipperSchema = new Schema(
  {
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true, // Ensure one user is only one dropshipper
      index: true,
    },
    // Dropshipper specific info (can mirror Seller or be simpler)
    businessName: {
      // Optional: If they operate under a different name
      type: String,
      maxLength: 60,
      trim: true,
    },
    mobileNumber: {
      // May differ from user's primary mobile
      type: String,
      maxLength: 15,
      trim: true,
    },
    email: {
      // May differ from user's primary email
      type: String,
      trim: true,
      maxLength: 60,
    },
    // Connections managed by the Dropshipper
    connectedSellers: [dropshipperConnectionSchema],

    // Address might be needed for correspondence or legal reasons
    address: {
      addressLine1: { type: String, trim: true, maxLength: 150 },
      addressLine2: { type: String, trim: true, maxLength: 150 },
      city: { type: String, trim: true, maxLength: 50 },
      state: { type: String, trim: true, maxLength: 50 },
      pincode: { type: String, trim: true, maxLength: 6 },
    },

    // Payout information (CRUCIAL for dropshippers)
    bankDetails: {
      accountHolderName: { type: String, trim: true },
      accountNumber: { type: String, trim: true },
      ifscCode: { type: String, trim: true },
      bankName: { type: String, trim: true },
      // Add UPI details if needed
    },

    // Admin approval status for the dropshipper account itself
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
    },
    rejectedReason: {
      type: String,
      maxLength: 200,
      default: null,
    },
    // Add other relevant fields like readiness for live selling etc.
    // e.g., experience, social media links if relevant
  },
  { timestamps: true, strict: true } // Use strict: true to prevent undefined fields
);

// Pre-hook (Example): Ensure user role is updated when dropshipper is created/approved
// This logic might be better placed in the controller after successful creation/approval
// DropshipperSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('approvalStatus')) {
//     try {
//       const User = mongoose.model('users'); // Avoid circular dependency if possible
//       await User.findByIdAndUpdate(this.userInfo, {
//         $set: { role: this.approvalStatus === 'approved' ? 'dropshipper' : 'user' } // Adjust logic as needed
//       });
//     } catch (error) {
//       return next(error);
//     }
//   }
//   next();
// });

const Dropshipper = mongoose.model("dropshippers", DropshipperSchema);

export default Dropshipper;