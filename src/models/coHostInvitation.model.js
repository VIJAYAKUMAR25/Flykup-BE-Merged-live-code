// import mongoose, { Schema } from "mongoose";

// const coHostInviteSchema = new Schema(
//   {
//     show: { type: Schema.Types.ObjectId, ref: "shows", required: true },
//     host: {
//       userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
//       hostId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         refPath: "host.hostModel",
//       },
//       hostModel: {
//         type: String,
//         required: true,
//         enum: {
//           values: ["sellers", "dropshippers"],
//           message: `{VALUE} is invalid host model`,
//         },
//       }
//     },
//     cohost: {
//       userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
//       hostId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         refPath: "cohost.hostModel",
//       },
//       hostModel: {
//         type: String,
//         required: true,
//         enum: {
//           values: ["sellers", "dropshippers"],
//           message: `{VALUE} is invalid cohost model`,
//         },
//       }
//     },
//     status: {
//       type: String,
//       enum: ["pending", "accepted", "rejected", "cancelled", "left"],
//       default: "pending",
//       index: true
//     },
//     joinedAt: Date,
//     leftAt: Date,
//     liveStreamId: String,
//   },
//   { timestamps: true }
// );

// coHostInviteSchema.index({ show: 1, status: 1 });
// coHostInviteSchema.index({ "cohost.userId": 1, status: 1 });

// const CoHostInvite = mongoose.model("cohostinvites", coHostInviteSchema);

// export default CoHostInvite;


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
 enum: ["sellers", "dropshippers"],
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
 enum: ["sellers", "dropshippers"],
}
 },
 status: {
type: String,
enum: ["pending", "accepted", "rejected", "cancelled", "left"],
 default: "pending",
index: true
},
    // *** NEW FIELD: Add this to your schema ***
    reason: {
      type: String,
      enum: [
        'HOST_CANCELLED_PENDING', // Host cancelled an invite that was pending
        'HOST_REPLACED',          // Host invited someone else, cancelling this accepted invite
        'COHOST_LEFT_VOLUNTARILY',// The co-host chose to leave
        'HOST_REMOVED_COHOST',    // The host removed the co-host from the stream
        null
      ],
      default: null
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