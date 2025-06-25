// import mongoose from "mongoose";
// const { Schema } = mongoose;


// const dropshipperConnectionSchema = new Schema({
//   _id: false,
//   dropshipperId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "dropshippers",
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: [
//       "pending",
//       "approved",
//       "rejected",
//       "revoked_by_seller",
//       "revoked_by_dropshipper",
//     ],
//     required: true,
//     default: "pending",
//   },
//   commissionRate: {
//     type: Number, // Store as percentage, e.g., 15 for 15%
//     min: 0,
//     max: 100,
//     default: null, // Or a platform default? Needs discussion
//   },
//   agreementDetails: {
//     type: String,
//     maxLength: 500,
//     default: null,
//   },
//   requestedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   respondedAt: {
//     type: Date,
//     default: null,
//   },
// });

// const SellerSchema = new mongoose.Schema(
//   {
//     userInfo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//       required: true,
//     },
//     dropshipperConnections: [
//       dropshipperConnectionSchema
//     ],
//     isAdult: {
//       type: Boolean,
//       // required: function (){
//       //   return this.sellerType === 'social'
//       // }
//     },
//     companyName: {
//       type: String,
//       maxLength: 50,
//     },
//     mobileNumber: {
//       type: String,
//       maxLength: 15,
//     },
//     email: {
//       type: String,
//       trim: true,
//       // required: true,
//       maxLength: 60,
//     },
//     sellerType: {
//       type: String,
//       enum: ["brand", "social"],
//       // required: true,
//     },
//     businessType: {
//       type: String,
//       enum: [
//         "Individual",
//         "Sole Proprietor",
//         "Private Limited",
//         "LLP",
//         "Partnership",
//       ],
//       // required: true,
//     },
//     productCategories: [
//       {
//         type: String,
//       },
//     ],
//     productCatalog: {
//       link: {
//         type: String
//       },
//       file: {
//         type: String
//       }
//     },
//     wantToSell: [
//       { type: String }
//     ],
//     sellerExperienceInfo: {
//       online: [
//         {
//           platform: { type: String },
//           profile: { type: String },
//         },
//       ],
//       offline: [{ type: String }],
//       experience: {
//         type: String,
//         trim: true,
//       },
//     },
//     gstInfo: {
//       hasGST: {
//         type: Boolean,
//         default: null,
//       },
//       gstDeclaration: {
//         type: String,
//         default: null,
//       },
//       gstNumber: {
//         type: String,
//         trim: true,
//         maxLength: 25,
//         default: null,
//       },
//       gstDocument: {
//         type: String,
//         trim: true,
//         default: null,
//       },
//     },
//     aadhaarInfo: {
//       aadhaarNumber: {
//         type: String,
//         //   required: true,
//         trim: true,
//         maxLength: 12,
//       },
//       aadhaarFront: {
//         type: String,
//         default: null,
//         trim: true,
//       },
//       aadhaarBack: {
//         type: String,
//         default: null,
//         trim: true,
//       },
//     },
//     panInfo: {
//       panNumber: {
//         type: String,
//         //   required: true,
//         trim: true,
//       },
//       panFront: {
//         type: String,
//         default: null,
//         trim: true,
//       },
//     },
//     shippingInfo: {
//       preferredShipping: {
//         type: String,
//       },
//       dispatchTime: {
//         type: String,
//       },
//       returnPolicy: {
//         type: String,
//       },
//       courierPartner: {
//         type: String,
//       },
//     },
//     readiness: {
//       liveSellingFrequency: {
//         type: String,
//       },
//       cameraSetup: {
//         type: Boolean,
//       },
//       isWillingToGoLive: {
//         type: Boolean
//       }
//     },
//     promotions: {
//       promoteLiveSelling: {
//         type: Boolean,
//         default: false
//       },
//       brandPromotion: {
//         type: Boolean,
//         default: false
//       },
//       flykupCollab: {
//         type: Boolean,
//         default: false
//       }
//     },
//     address: {
//       addressLine1: {
//         type: String,
//         // required: true,
//         trim: true,
//         maxLength: 150,
//       },
//       addressLine2: {
//         type: String,
//         trim: true,
//         maxLength: 150,
//       },
//       city: {
//         type: String,
//         // required: true,
//         trim: true,
//         maxLength: 50,
//       },
//       state: {
//         type: String,
//         // required: true,
//         trim: true,
//         maxLength: 50,
//       },
//       pincode: {
//         type: String,
//         // required: true,
//         trim: true,
//         maxLength: 6,
//       },
//     },
//     approvalStatus: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },
//     rejectedReason: {
//       type: String,
//       maxLength: 200,
//       default: null,
//     },
//     azureMigrationStatus: {
//       type: String,
//       enum: ['pending', 'completed', 'failed'],
//       default: 'pending', 
//     }
//   },
//   { timestamps: true, strict: true }
// );

// const Seller = mongoose.model("sellers", SellerSchema);

// export default Seller;



import mongoose from "mongoose";
const { Schema } = mongoose;


const dropshipperConnectionSchema = new Schema({
  _id: false,
  dropshipperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dropshippers",
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

const RedFlagsSchema = new mongoose.Schema({
  type: { type: String, required: true},
  description: { type: String, required: true },
  severity: { type: String, enum: [ 'low', 'medium', 'high' ], required: true}
}, { _id: false });

const ScoringSchema = new mongoose.Schema({
  totalScore: { type: Number, default: 0, min: 0},
  breakdown: { type: mongoose.Schema.Types.Mixed, default: {}},
  redFlags: [ RedFlagsSchema ],
  manualChecks: [ String ],
  recommendation: { 
    type: String, 
    enum: ['auto_approved','auto_rejected','manual_review']
  },
  rejectedReason: { type: String, default: null}
}, { _id: false });

const SellerSchema = new mongoose.Schema(
  {
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    dropshipperConnections: [
      dropshipperConnectionSchema
    ],
    isAdult: {
      type: Boolean,
      // required: function (){
      //   return this.sellerType === 'social'
      // }
    },
    companyName: {
      type: String,
      maxLength: 50,
    },
    mobileNumber: {
      type: String,
      maxLength: 15,
    },
    email: {
      type: String,
      trim: true,
      // required: true,
      maxLength: 60,
    },
    sellerType: {
      type: String,
      enum: ["brand", "social"],
      // required: true,
    },
    businessType: {
      type: String,
      enum: [
        "Individual",
        "Sole Proprietor",
        "Private Limited",
        "LLP",
        "Partnership",
      ],
      // required: true,
    },
    productCategories: [
      {
        type: String,
      },
    ],
    productCatalog: {
      link: {
        type: String
      },
      file: {
        type: String
      }
    },
    wantToSell: [
      { type: String }
    ],
    sellerExperienceInfo: {
      online: [
        {
          platform: { type: String },
          profile: { type: String },
        },
      ],
      offline: [{ type: String }],
      experience: {
        type: String,
        trim: true,
      },
    },
    gstInfo: {
      hasGST: {
        type: Boolean,
        default: null,
      },
      gstDeclaration: {
        type: String,
        default: null,
      },
      gstNumber: {
        type: String,
        trim: true,
        maxLength: 25,
        default: null,
      },
      gstDocument: {
        type: String,
        trim: true,
        default: null,
      },
    },
    aadhaarInfo: {
      aadhaarNumber: {
        type: String,
        //   required: true,
        trim: true,
        maxLength: 12,
      },
      aadhaarFront: {
        type: String,
        default: null,
        trim: true,
      },
      aadhaarBack: {
        type: String,
        default: null,
        trim: true,
      },
    },
    panInfo: {
      panNumber: {
        type: String,
        //   required: true,
        trim: true,
      },
      panFront: {
        type: String,
        default: null,
        trim: true,
      },
    },
    shippingInfo: {
      preferredShipping: {
        type: String,
      },
      dispatchTime: {
        type: String,
      },
      returnPolicy: {
        type: String,
      },
      courierPartner: {
        type: String,
      },
    },
    readiness: {
      liveSellingFrequency: {
        type: String,
      },
      cameraSetup: {
        type: Boolean,
      },
      isWillingToGoLive: {
        type: Boolean
      }
    },
    promotions: {
      promoteLiveSelling: {
        type: Boolean,
        default: false
      },
      brandPromotion: {
        type: Boolean,
        default: false
      },
      flykupCollab: {
        type: Boolean,
        default: false
      }
    },
    address: {
      addressLine1: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 150,
      },
      addressLine2: {
        type: String,
        trim: true,
        maxLength: 150,
      },
      city: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 50,
      },
      state: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 50,
      },
      pincode: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 6,
      },
    },
        // Terms Acceptance
    generalAccepted: { type: Boolean, default: false },
    sellerAccepted: { type: Boolean, default: false },
    digitalAccepted: { type: Boolean, default: false },
     approvalStatus: {
      type: String,
      enum: [
        "pending",
        "auto_approved",
        "auto_rejected",
        "manual_review",
        "approved",    // Manual approval
        "rejected",    // Manual rejection
      ],
      default: "pending",
    },
    rejectedReason: {
      type: String,
      default: null,
    },
    rejectedTimes: { type: Number, default: 0 },
    azureMigrationStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    scoring: { type: ScoringSchema, default: {} }
  },
  { timestamps: true, strict: true }
);


SellerSchema.pre('save', function(next) {
  // Ensure approvalStatus always has a value
  if (!this.approvalStatus) {
    this.approvalStatus = 'pending';
  }
  
  // Ensure scoring exists
  if (!this.scoring) {
    this.scoring = {
      totalScore: 0,
      breakdown: {},
      redFlags: [],
      manualChecks: [],
      recommendation: "manual_review",
      rejectedReason: null
    };
  }
  
  next();
});

SellerSchema.index({ userInfo: 1 }, { unique: true });
SellerSchema.index({ "aadhaarInfo.aadhaarNumber": 1 });
SellerSchema.index({ approvalStatus: 1 });

const Seller = mongoose.model("sellers", SellerSchema);

export default Seller;
