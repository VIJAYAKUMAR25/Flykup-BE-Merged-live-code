import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mention", "request", "follow", "approval", "file", "goal"],
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: true,
    },
    cutMessage: {
      type: String,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    fromSystem: {
      type: String, // e.g., "Flykup Team"
      default: null,
    },

    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    file: {
      name: String,
      size: String,
    },
    actions: {
      type: [String], // e.g., ["Accept", "Decline"]
      default: [],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Notification", notificationSchema);
