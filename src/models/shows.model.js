import mongoose from "mongoose";
const { Schema } = mongoose;

// Define a schema for the co-host details
const coHostDetailSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Or your relevant user/seller model
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  profileURL: {
    type: String,
    default: null,
  },
  companyName: {
    type: String,
  },
  sellerType: {
    type: String,
  },
}, { _id: false }); // _id is not needed for this subdocument

// Comment Schema
const commentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User model
  },
  text: {
    type: String,
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
    product: {
      type: String,
    },
    auctionType: {
      type: String, // 'default' or other types
    },
    startingBid: {
      type: Number,
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
    host: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'hostModel'
    },
    hostModel: {
      type: String,
      required: true,
      enum: ['sellers', 'dropshippers']
    },
    hasCoHost: { 
        type: Boolean,
        default: false,
    },
    coHost: { 
        type: coHostDetailSchema,
        default: null,
    },
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
    liveStreamId: {
      type: String,
      default: null
    },
    tags: {
      type: [String],
      default: [],
    },
    thumbnailImage: {
      type: String,
      default: null,
    },
    previewVideo: {
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
    showStatus: {
      type: String,
      enum: ["created", "live", "cancelled", "ended"],
      default: "created",
    },
    comments: [commentSchema],
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "users",
      default: [],
    },
    currentAuction: auctionSchema,
    buyNowProducts: {
      type: [
        {
          _id: false,
          productId: { type: Schema.Types.ObjectId, ref: "productlistings", required: true },
          productOwnerSellerId: { type: Schema.Types.ObjectId, ref: 'sellers', required: true },
          productPrice: { type: Number, min: 0, default: null },
        },
      ],
      default: [],
    },
    auctionProducts: {
      type: [
        {
          _id: false,
          productId: { type: Schema.Types.ObjectId, ref: "productlistings", required: true },
          productOwnerSellerId: { type: Schema.Types.ObjectId, ref: 'sellers', required: true },
          startingPrice: { type: Number, min: 0, default: null },
          reservedPrice: { type: Number, min: 0, default: null },
        },
      ],
      default: [],
    },
    giveawayProducts: {
      type: [
        {
          _id: false,
          productId: { type: Schema.Types.ObjectId, ref: "productlistings", required: true },
          productOwnerSellerId: { type: Schema.Types.ObjectId, ref: 'sellers', required: true },
          followersOnly: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    liveDrop: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

showSchema.pre('save', function (next) {
  const doc = this;

  // Set liveDrop based on product types
  const hasBuyNow = doc.buyNowProducts && doc.buyNowProducts.length > 0;
  const hasAuction = doc.auctionProducts && doc.auctionProducts.length > 0;
  const hasGiveaway = doc.giveawayProducts && doc.giveawayProducts.length > 0;
  doc.liveDrop = hasBuyNow && hasAuction && hasGiveaway;

  // Ensure coHost is null if hasCoHost is false
  if (!doc.hasCoHost) {
      doc.coHost = null;
  }

  next();
});

const Show = mongoose.model("shows", showSchema);

export default Show;