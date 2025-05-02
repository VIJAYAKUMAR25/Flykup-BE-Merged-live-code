import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Seller from "./seller.model.js";

const UserSchema = new mongoose.Schema(
  {
    sellerInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sellers",
    },
    dropshipperInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dropshippers",
    },
    userName: {
      type: String,
      minLength: 1,
      maxLength: 50,
      trim: true,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      minLength: 1,
      maxLength: 50,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 60,
      index: true,
    },
    password: {
      type: String,
      required: function () {
        return this.oAuth === null;
      },
      maxLength: 120,
    },
    mobile: {
      type: String,
      trim: true,
      maxLength: 80,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "seller", "dropshipper", null],
        message: `{VALUE} is invalid`,
      },
      default: null,
    },
    accessAllowed: {
      type: Boolean,
      default: true,
    },
    oAuth: {
      type: String,
      enum: {
        values: ["google", "facebook", null],
        message: `{VALUE} is invalid`,
      },
      default: null,
    },
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
    emailVerificationOtp: {
      type: String,
      maxLength: 6,
      default: null,
    },
    emailVerificationOtpExpiry: {
      type: Date,
      default: null,
    },
    isPasswordResetAllowed: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      maxLength: 255,
      default: null,
    },
    address: [
      {
        name: {
          type: String,
          maxLength: 30,
          trim: true,
        },
        mobile: {
          type: String,
          trim: true,
          maxLength: 15,
        },
        alternateMobile: {
          type: String,
          trim: true,
          maxLength: 15,
          default: null,
        },
        line1: {
          type: String,
          trim: true,
          maxLength: 100,
        },
        line2: {
          type: String,
          trim: true,
          maxLength: 100,
          default: "",
        },
        city: {
          type: String,
          trim: true,
          maxLength: 20,
        },
        state: {
          type: String,
          trim: true,
          maxLength: 25,
        },
        pincode: {
          type: String,
          maxLength: 6,
          trim: true,
        },
      },
    ],
    filledNewSellerForm: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

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

UserSchema.methods.createJwtToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "4d",
  });

  return token;
};

UserSchema.methods.comparePassword = async function (loginPassword) {
  const user = this;
  const { password: hashedPassword } = user;
  const isValidPassword = await bcrypt.compare(loginPassword, hashedPassword);
  return isValidPassword;
};

const User = mongoose.model("users", UserSchema);

export default User;
