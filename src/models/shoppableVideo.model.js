import { Schema, model } from "mongoose";

const processedVideoContainer = process.env.AZURE_PUBLIC_CONTAINER_VIDEOS;


const ShoppableVideoSchema = new Schema(
  {
    host: { // New field for the host (Seller or Dropshipper)
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'hostModel' // Dynamic reference based on hostModel field
    },
    hostModel: { // New field to define the type of host
      type: String,
      required: true,
      enum: ['sellers', 'dropshippers'], // Allowed host types
      index: true // Index for efficient querying by host type
    },
    // === MODIFIED END: Host Information ===
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, trim: true },
    thumbnailURL: {
      type: String,
      required: true,
      trim: true,
    },
    productsListed: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "productlistings",
        },
      ],
      // validate: [arrayLimit, '{PATH} exceeds the limit of 20 products'], // Optional: Limit number of products
      default: [],
    },
    hashTags: {
      type: [
        {
          type: String,
          trim: true
        }
      ]
    },
    // === END SUGGESTED ADDITION ===
    processingStatus: {
      type: String,
      enum: ["queued", "processing", "published", "failed"],
      default: "queued",
      index: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private", "deleted"],
      default: "public",
      index: true,
   },
    thumbnailURL: {
      type: String,
      required: true,
      trim: true,
    },
   
    thumbnailBlobName: {
      type: String,
      default: null,
    },
    originalVideoBlobName: {
      // Path within the private container
      type: String,
      default: null,
    },
    originalFileSize: {
      // Size of the original uploaded file
      type: Number, // Store as number (bytes) for potential calculations
      default: null,
    },
    // --- HLS Output Fields ---
    hlsMasterPlaylistUrl: {
      // Public URL to the master m3u8
      type: String,
      default: null,
    },
    processedVideoContainer: {
      // Name of the public container used
      type: String,
      default: processedVideoContainer || null, // Example: Get from env
    },
    processedVideoBasePath: {
      // Base path within the public container (e.g., sellerId/videoId/)
      type: String,
      default: null,
    },
    processingError: {
      // Store error details if status is 'failed'
      type: String,
      default: null,
    },
    processedFileSize: {
      // Total size of all HLS files (.m3u8, .ts) in bytes
      type: Number,
      default: null,
    },
    durationSeconds: {
      // Duration of the video in seconds (useful metadata)
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const ShoppableVideo = model("shoppablevideos", ShoppableVideoSchema);

ShoppableVideoSchema.index({ processingStatus: 1, updatedAt: 1 });

export default ShoppableVideo;
