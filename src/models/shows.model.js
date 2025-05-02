import mongoose from "mongoose";
const { Schema } = mongoose;

// Comment Schema
const commentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User model
    // required: true,
  },
  text: {
    type: String,
    // required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bidSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auction Schema
const auctionSchema = new mongoose.Schema(
  {
    streamId: {
      type: String,
      required: true,
    },
    // If referencing productlistings, add owner:
    // productOwnerSellerId: { type: Schema.Types.ObjectId, ref: 'sellers', required: true },
    product: {
      type: String,
      // required: true,
    },
    auctionType: {
      type: String, // 'default' or other types
      // required: true,
    },
    startingBid: {
      type: Number,
      // required: true,
    },
    increment: {
      type: Number,
      default: 500,
    },
    currentHighestBid: {
      type: Number,
      default: 0,
    },
    nextBid1: {
      type: Number,
      default: 0,
    },
    nextBid2: {
      type: Number,
      default: 0,
    },
    highestBidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Store reference to the highest bidder
      default: null,
    },
    bidderWon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Store reference to the highest bidder
      default: null,
    },
    bids: [bidSchema], // Array of bids
    endsAt: {
      type: Date,
      // required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    uniqueStreamId: {
      type: String,
    },
  },
  { timestamps: true }
);

// Show Schema
const showSchema = new Schema(
  {
    host: { // New field for the host (Seller or Dropshipper)
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'hostModel' // Dynamic reference
    },
    hostModel: { // New field to define the type of host
      type: String,
      required: true,
      enum: ['sellers', 'dropshippers'] // Allowed host types
    },
    // === MODIFIED END: Host Information ===
    title: {
      type: String,
      required: true,
    },
    scheduledAt:{
      type: Date,
      required: true
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
      default: "",
    },
    // streamName: {
    //   type: String,
    //   default: "",
    // },
    liveStreamId: {
      type: String,
      default: null
    },
    tags: {
      type: [String],
      default: [],
    },

    thumbnailImage: {
      type: String, // URL or file path
      default: null,
    },
    previewVideo: {
      type: String,
      default: null,
    },
    thumbnailImageURL: {
      type: String, 
      default: null,
    },
    previewVideoURL: {
      type: String,
      default: null,
    },
    language: {
      type: String,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    // streamUrl: {
    //   type: String, // URL for the live stream
    //   default: null,
    // },
    showStatus: {
      type: String,
      enum: ["created", "live", "cancelled", "ended"],
      default: "created",
    },
    comments: [commentSchema], // Array of comments
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "users",
      default: [],
    },
    // auctions: [auctionSchema], // Array of auctions
    currentAuction: auctionSchema,

    // === MODIFIED START: Product Arrays ===
    buyNowProducts: {
      type: [
        {
          _id: false,
          productId: { type: Schema.Types.ObjectId, ref: "productlistings", required: true },
          // --- ADDED productOwnerSellerId ---
          productOwnerSellerId: { type: Schema.Types.ObjectId, ref: 'sellers', required: true },
          productPrice: { type: Number, min: 0, default: null }, // Price set by host for this show
        },
      ],
      default: [],
    },
    auctionProducts: { // Assuming these are pre-defined products for potential auctions
      type: [
        {
          _id: false,
          productId: { type: Schema.Types.ObjectId, ref: "productlistings", required: true },
          // --- ADDED productOwnerSellerId ---
          productOwnerSellerId: { type: Schema.Types.ObjectId, ref: 'sellers', required: true },
          startingPrice: { type: Number, min: 0, default: null }, // Set by host
          reservedPrice: { type: Number, min: 0, default: null }, // Optional, set by host
        },
      ],
      default: [],
    },
    giveawayProducts: {
      type: [
        {
          _id: false,
          productId: { type: Schema.Types.ObjectId, ref: "productlistings", required: true },
          // --- ADDED productOwnerSellerId ---
          productOwnerSellerId: { type: Schema.Types.ObjectId, ref: 'sellers', required: true },
          followersOnly: { type: Boolean, default: false }, // Set by host
        },
      ],
      default: [],
    },
    liveDrop: {
      type: Boolean,
      default: false
    }
    // === MODIFIED END: Product Arrays ===
  },
  { timestamps: true }
);

// Create and export the Show model
const Show = mongoose.model("shows", showSchema);

showSchema.pre('save', function (next) {
  const doc = this;

  const hasBuyNow = doc.buyNowProducts && doc.buyNowProducts.length > 0;
  const hasAuction = doc.auctionProducts && doc.auctionProducts.length > 0;
  const hasGiveaway = doc.giveawayProducts && doc.giveawayProducts.length > 0;

  doc.liveDrop = hasBuyNow && hasAuction && hasGiveaway;

  next();
});

export default Show;
