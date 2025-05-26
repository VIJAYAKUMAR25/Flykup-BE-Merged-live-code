// import { Schema, model } from "mongoose";

// const processedVideoContainer = process.env.AZURE_PUBLIC_CONTAINER_VIDEOS;


// const ShoppableVideoSchema = new Schema(
//   {
//     host: { // New field for the host (Seller or Dropshipper)
//       type: Schema.Types.ObjectId,
//       required: true,
//       refPath: 'hostModel' // Dynamic reference based on hostModel field
//     },
//     hostModel: { // New field to define the type of host
//       type: String,
//       required: true,
//       enum: ['sellers', 'dropshippers'], // Allowed host types
//       index: true // Index for efficient querying by host type
//     },
//     // === MODIFIED END: Host Information ===
//     title: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     category: { type: String, required: true, trim: true },
//     subcategory: { type: String, required: true, trim: true },
//     thumbnailURL: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     productsListed: {
//       type: [
//         {
//           type: Schema.Types.ObjectId,
//           ref: "productlistings",
//         },
//       ],
//       // validate: [arrayLimit, '{PATH} exceeds the limit of 20 products'], // Optional: Limit number of products
//       default: [],
//     },
//     hashTags: {
//       type: [
//         {
//           type: String,
//           trim: true
//         }
//       ]
//     },
//     // === END SUGGESTED ADDITION ===
//     processingStatus: {
//       type: String,
//       enum: ["queued", "processing", "published", "failed"],
//       default: "queued",
//       index: true,
//     },
//     visibility: {
//       type: String,
//       enum: ["public", "private", "deleted"],
//       default: "public",
//       index: true,
//    },
//     thumbnailURL: {
//       type: String,
//       required: true,
//       trim: true,
//     },
   
//     thumbnailBlobName: {
//       type: String,
//       default: null,
//     },
//     originalVideoBlobName: {
//       // Path within the private container
//       type: String,
//       default: null,
//     },
//     originalFileSize: {
//       // Size of the original uploaded file
//       type: Number, // Store as number (bytes) for potential calculations
//       default: null,
//     },
//     // --- HLS Output Fields ---
//     hlsMasterPlaylistUrl: {
//       // Public URL to the master m3u8
//       type: String,
//       default: null,
//     },
//     processedVideoContainer: {
//       // Name of the public container used
//       type: String,
//       default: processedVideoContainer || null, // Example: Get from env
//     },
//     processedVideoBasePath: {
//       // Base path within the public container (e.g., sellerId/videoId/)
//       type: String,
//       default: null,
//     },
//     processingError: {
//       // Store error details if status is 'failed'
//       type: String,
//       default: null,
//     },
//     processedFileSize: {
//       // Total size of all HLS files (.m3u8, .ts) in bytes
//       type: Number,
//       default: null,
//     },
//     durationSeconds: {
//       // Duration of the video in seconds (useful metadata)
//       type: Number,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// const ShoppableVideo = model("shoppablevideos", ShoppableVideoSchema);

// ShoppableVideoSchema.index({ processingStatus: 1, updatedAt: 1 });

// export default ShoppableVideo;


import { Schema, model } from "mongoose";

const processedVideoContainer = process.env.AZURE_PUBLIC_CONTAINER_VIDEOS;

// Define the Rendition sub-schema
const RenditionSchema = new Schema({
  resolution: { type: String, required: false },    // e.g. "1080p"
  bitrate: { type: Number, required: false },       // e.g. 3000000 (bps)
  playlistKey: { type: String, required: false },   // e.g. "video123/1080p.m3u8"
  hlsUrl: { type: String, required: false },        // Full HLS URL for this rendition
  size: { type: Number, required: false },          // bytes of all .ts + playlist
  ratio: { type: Number, required: false },         // size/originalSize
}, { _id: false }); // No separate _id for subdocuments unless needed

const ShoppableVideoSchema = new Schema(
  {
    host: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'hostModel'
    },
    hostModel: {
      type: String,
      required: true,
      enum: ['sellers', 'dropshippers'],
      index: true
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
    // thumbnailURL might be set initially or updated by the processing service
    thumbnailURL: {
      type: String,
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
          trim: true
        }
      ]
    },
    processingStatus: {
      type: String,
      enum: ["queued", "processing", "published", "failed", "transcoding_complete","uploaded"], // Added new status
      default: "uploaded",
      index: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private", "deleted"],
      default: "public",
      index: true,
    },
    thumbnailBlobName: {
      type: String,
      default: null,
    },
    originalVideoBlobName: {
      type: String,
      default: null,
    },
    originalFileSize: {
      type: Number,
      default: null,
    },
    optimizedKey: {
      type: String,
      default: null,
    },
    processingError: {
      type: String,
      default: null,
    },
   optimizedSize: {
      type: Number,
      default: null,
    },
    durationSeconds: {
      type: Number,
      default: null,
    },

    // === NEW FIELDS FOR VIDEO PROCESSING CALLBACK ===
    renditions: {
      type: [RenditionSchema], // Array of rendition objects
      default: [],
    },
    videoId: { // Optimized video URL for playback from other db
      type: String,
      default: null,
      trim: true,
    },
    optimizationStatus: { // Status of optimization process
      type: String,
      enum: ["success", "failed","progress"],
      default: "progress",

    },
    reductionPercentage:{
      type:String,
      default: null,
      trim: true,
    },
    masterPlaylistKey: { // Key for the master playlist in the public container
      type: String,
      default: null,
      trim: true,
    },
    durationTook: {
      type: String, // Duration took for the optimization process
      trim: true,
      default: null, // Duration in seconds for the optimization process
    },
    // === END NEW FIELDS ===
  },
  { timestamps: true }
);

// Index for querying videos that need processing status updates
ShoppableVideoSchema.index({ processingStatus: 1, updatedAt: 1 });
// Index for host and their videos
ShoppableVideoSchema.index({ host: 1, hostModel: 1 });

const ShoppableVideo = model("shoppablevideos", ShoppableVideoSchema);

export default ShoppableVideo;