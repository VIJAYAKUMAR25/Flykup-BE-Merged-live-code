import mongoose, { Schema } from "mongoose";

const coHostInviteSchema = new Schema(
  {
    show: { type: Schema.Types.ObjectId, ref: "shows", required: true },
    host: {
      userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
      hostId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "host.hostModel",
      },
      hostModel: {
        type: String,
        required: true,
        enum: {
          values: ["sellers", "dropshippers"],
          message: `{VALUE} is invalid host model`,
        },
      }
    },
    cohost: {
      userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
      hostId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "cohost.hostModel",
      },
      hostModel: {
        type: String,
        required: true,
        enum: {
          values: ["sellers", "dropshippers"],
          message: `{VALUE} is invalid cohost model`,
        },
      }
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled", "left"],
      default: "pending",
      index: true
    },
    joinedAt: Date,
    leftAt: Date,
    liveStreamId: String,
  },
  { timestamps: true }
);

coHostInviteSchema.index({ show: 1, status: 1 });
coHostInviteSchema.index({ "cohost.userId": 1, status: 1 });

const CoHostInvite = mongoose.model("cohostinvites", coHostInviteSchema);

export default CoHostInvite;
