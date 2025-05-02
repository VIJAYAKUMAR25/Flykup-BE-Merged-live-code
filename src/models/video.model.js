import mongoose, { Schema } from "mongoose";

const processedVideoContainer = process.env.AZURE_PUBLIC_CONTAINER_VIDEOS;

const VideoSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "sellers",
      required: true,
    },
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
    productsListed: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "productlistings",
        },
      ],
      default: [],
    },
    hashTags: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
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

// Optional: Index for finding videos to process
VideoSchema.index({ processingStatus: 1, updatedAt: 1 }); // Find queued items, oldest first

const Video = mongoose.model("Video", VideoSchema);

export default Video;
