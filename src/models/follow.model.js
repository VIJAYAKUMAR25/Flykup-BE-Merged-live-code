import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate follows
FollowSchema.index({ follower: 1, following: 1 }, { unique: true });

// Add helpful indexes for efficient querying
FollowSchema.index({ follower: 1 });
FollowSchema.index({ following: 1 });

FollowSchema.pre('save', function(next) {
  if (this.follower.equals(this.following)) {
    const err = new Error("Cannot follow yourself");
    next(err);
  } else {
    next();
  }
});

const Follow = mongoose.model("follows", FollowSchema);

export default Follow;
