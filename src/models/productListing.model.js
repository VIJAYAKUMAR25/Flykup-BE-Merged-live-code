// backend/models/ProductListing.js (or similar path)
import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductListingSchema = new Schema(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: "sellers" },
    stockId: { type: Schema.Types.ObjectId, ref: "stocks" },
    title: String,
    description: String,
    quantity: {
      type: Number,
      min: 0,
      default: null,
    },
    images: [
      {
        key: { type: String, maxLength: 255, default: null },
        jpgURL: { type: String, maxLength: 1024, default: null },
        blobName: { type: String, maxLength: 255, default: null },
        azureUrl: { type: String, maxLength: 1024, default: null },
      }
    ],
    category: String,
    subcategory: String,
    hsnNo: String,
    MRP: {
      type: Number,
      min: 0,
      default: null,
    },
    productPrice: {
      type: Number,
      min: 0,
      default: null,
    },
    startingPrice: {
      type: Number,
      min: 0,
      default: null,
    },
    reservedPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    // --- ADDED/UPDATED FIELDS FROM FRONTEND ---
    brand: { type: String, default: null }, // ADDED
    manufacturer: String,
    manufacturerAddress: String, // ADDED in frontend, already exists here
    countryOfOrigin: String,
    netQuantity: { type: String, default: null }, // ADDED (String to accommodate units like '500g')
    packagingType: { type: String, default: null }, // ADDED
    weight: { // For shipping calculations
      value: { type: Number, default: null },
      unit: { type: String, default: null },
    },
    dimensions: { // For shipping calculations
      length: { type: Number, default: null },
      width: { type: Number, default: null },
      height: { type: Number, default: null },
    },
    expiryDate: { type: Date, default: null }, // ADDED in frontend, already exists here (changed to allow null)
    shelfLife: { type: String, default: null }, // ADDED in frontend, already exists here (changed to allow null)
    batchNumber: { type: String, default: null }, // ADDED in frontend, already exists here (changed to allow null)
    gstRate: { type: Number, default: null }, // Changed to allow null if needed
    sellerName: String,
    sellerContact: { type: String, default: null }, // ADDED
    sellerGSTIN: { type: String, default: null }, // ADDED
    returnPolicy: [String],
    warranty: {
      hasWarranty: { type: Boolean, default: false }, // Default added
      duration: { type: String, default: null }, // Default added
    },
    fssaiLicenseNo: { type: String, default: null }, // ADDED in frontend, already exists here (changed to allow null)
    bisCertification: { type: String, default: null }, // ADDED in frontend, already exists here (changed to allow null)
    importerName: { type: String, default: null }, // Default added
    importerAddress: { type: String, default: null }, // Default added
    importerGSTIN: { type: String, default: null }, // Default added
    eWasteCompliance: { type: Boolean, default: false }, // Default added
    recyclablePackaging: { type: Boolean, default: false }, // Default added
    hazardousMaterials: { type: String, default: null }, // Default added
    allowDropshipping: {
      type: Boolean,
      default: false,
      index: true,
    },
    commissionRate: {
      type: Number,
      min: [0, 'Commission rate cannot be negative.'],
      // max: [100, 'Commission rate cannot exceed 100%.'], // Max was 25, changed to 100 based on frontend
      max: [100, 'Commission rate cannot exceed 100%.'],
      default: null,
      // Removed Mongoose-level required validation dependent on allowDropshipping
      // Let application logic handle this if needed, or adjust validator
      // required: [
      //   function () { return this.allowDropshipping === true; },
      //   'Commission rate is required when allowing dropshipping.'
      // ],
      // validate: { ... } // Keep or remove validation as needed
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

// Optional: Ensure strict mode is not preventing fields if you intended flexibility (default is true)
// ProductListingSchema.set('strict', false); // Use with caution

const ProductListing = mongoose.model("productlistings", ProductListingSchema);

export default ProductListing;