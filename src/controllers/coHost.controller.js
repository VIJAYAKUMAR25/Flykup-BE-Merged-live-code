import mongoose from "mongoose";
import CoHostInvite from "../models/coHostInvitation.model.js";
import Show from "../models/shows.model.js";
import User from "../models/user.model.js";
import { USER_PUBLIC_FIELDS } from "../utils/constants.js";
import { createSearchRegex } from "../utils/helper.js";

export const getSellersAndDropshippers = async (req, res) => {
  try {
    const { search = "" } = req.query;
    const limit = 30;
    const requestingUser = req?.user ;

    const queryConditions = {
      role: { $in: ["seller", "dropshipper"] },
    };

    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      queryConditions.userName = createSearchRegex(trimmedSearch);
    }

    if ( requestingUser?._id ) {
      queryConditions._id = { $ne: requestingUser._id }
    }

    const users = await User.find(queryConditions)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select(USER_PUBLIC_FIELDS)
      .populate({ path: "sellerInfo", select: "sellerType companyName _id" })
      .populate({ path: "dropshipperInfo", select: "businessName _id" })
      .lean();

    const formattedData = users.map((user) => {
      const isSeller = user.role === "seller";
      const isDropshipper = user.role === "dropshipper";
      const sellerData = user.sellerInfo;
      const dropshipperData = user.dropshipperInfo;
      let companyName = null;
      let sellerType = null;
      if (isSeller && sellerData) {
        companyName = sellerData?.companyName;
        sellerType = sellerData.sellerType;
      } else if (isDropshipper && dropshipperData) {
        companyName = dropshipperData?.businessName;
        sellerType = undefined;
      }
      return {
        userId: user._id,
        userName: user.userName,
        role: user.role,
        profileURL: user.profileURL?.key || null,
        companyName,
        sellerType,
      };
    });

    return res.status(200).json({
      status: true,
      message: formattedData?.length === 0 ? "No user found" : "Sellers and Dropshippers fetched successfully!",
      data: formattedData || [],
    });
  } catch (error) {
    console.error("Error in getSellersAndDropshippers:", error.message);
    return res.status(500).json({ status: false, message: "Internal server error." });
  }
};

export const sendInvite = async (req, res) => {
  try {
    const { cohostUserId } = req.body;
    const { showId } = req.params;
    const hostUserId = req?.user?._id;
    const hostId = req?.hostId;

    const show = await Show.findById(showId).lean();
    if (!show)
      return res.status(404).json({ status: false, message: "Show not found" });

    // validate host using hostAuth middleware
    if (String(show.host) !== String(hostId)) {
      return res
        .status(403)
        .json({ status: false, message: "Only host can invite" });
    }

    if ( String(hostUserId) === String(cohostUserId)){
      return res.status(400).json({ status: false, message: "Can't invite yourself as cohost"})
    }

    const existingInvite = await CoHostInvite.findOne({
      show: showId,
      status: { $in: ["pending", "accepted"] },
    });

    if (existingInvite) {
       let message = "Already has a pending invitation for this show.";
       if (existingInvite.status === 'accepted') {
           message = "Already has a co-host for this show.";
       }
      return res.status(400).json({ status: false, message });
    }
    // --- Fetch Host User Info ---

    const hostUser = await User.findById(hostUserId)
        .select('role sellerInfo dropshipperInfo')
        .populate( { path: "sellerInfo", select: "_id"})
        .populate( { path: "dropshipperInfo", select: "_id"})
        .lean();

    if (!hostUser){
      return res.status(404).json( { status: false, message: 'Host user not found.'})
    }

    let hostHostId = null;
    let hostHostModel = null;
    if( hostUser.role === 'seller' && hostUser.sellerInfo ){
      hostHostId = hostUser.sellerInfo._id;
      hostHostModel = "sellers"
    } else if ( hostUser.role === 'dropshipper' && hostUser.dropshipperInfo){
      hostHostId = hostUser.dropshipperInfo._id;
      hostHostModel = 'dropshippers';
    }else {
      return res.status(400).json({ status: false, message: "Inviting host must be a seller or dropshipper."})
    }

    // --- Fetch Co-host User Info ---
    const cohostUser = await User.findById(cohostUserId)
      .select('role sellerInfo dropshipperInfo') 
      .populate({ path: "sellerInfo", select: "_id" })
      .populate({ path: "dropshipperInfo", select: "_id" })
      .lean();

    if (!cohostUser) {
      return res.status(404).json({ status: false, message: "Co-host user not found" });
    }

    let cohostHostId = null;
    let cohostHostModel = null;
     if (cohostUser.role === "seller" && cohostUser.sellerInfo) {
      cohostHostId = cohostUser.sellerInfo._id;
      cohostHostModel = "sellers";
    } else if (cohostUser.role === "dropshipper" && cohostUser.dropshipperInfo) {
      cohostHostId = cohostUser.dropshipperInfo._id;
      cohostHostModel = "dropshippers";
    } else {
       return res.status(400).json({ status: false, message: "Invited co-host must be a Seller or Dropshipper." });
    }

    // --- create the invite ---
    const newInvite = await CoHostInvite.create({
      show: show._id,
      host: {
        userId: hostUser._id,
        hostId: hostHostId,
        hostModel: hostHostModel
      },
      cohost: {
        userId: cohostUser._id,
        hostId: cohostHostId,
        hostModel: cohostHostModel
      }   
    })

    // --- TODO: Send Notification to cohostUser.userId ---

    return res
      .status(201)
      .json({
        status: true,
        message: "Invite sent successfully",
        data: newInvite,
      });
  } catch (error) {
    console.error("sendInvite error", error.message);
    if (error.code === 11000) {
      return res.status(400).json({ status: false, message: "Duplicate invite detected." });
   }
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

// export const getActiveCoHostInvite = async (req, res) => {
//   try {
//     const { showId } = req.params;

//     const invite = await CoHostInvite.findOne({
//       show: showId,
//       status: { $in: ["pending", "accepted", "rejected"] },
//     }).lean();

//     if (!invite) {
//       return res
//         .status(404)
//         .json({ status: false, message: "No active invite found" });
//     }

//     return res
//       .status(200)
//       .json({ status: true, message: "Active invite fetched", data: invite });
//   } catch (error) {
//     console.error("getActiveCoHostInvite error", error.message);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server error" });
//   }
// };

export const getShowCoHostInvites = async (req, res) => {
  try {
    const { showId } = req.params;

    const invites = await CoHostInvite.find({
      show: showId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "show",
        select:
          "title scheduledAt thumbnailImageURL previewVideoURL liveStreamId showStatus",
      })
      .populate({
        path: 'host.userId',
        select: "userName profileURL role sellerInfo dropshipperInfo",
        populate: [
          { path: 'sellerInfo', select: 'companyName sellerType' },
          { path: 'dropshipperInfo', select: 'businessName' }
        ]
      })
      .populate({
        path: 'cohost.userId',
        select: "userName profileURL role sellerInfo dropshipperInfo",
        populate: [
          { path: 'sellerInfo', select: 'companyName sellerType' },
          { path: 'dropshipperInfo', select: 'businessName' }
        ]
      })
      .lean();

    // Handle case where no invites are found
    if (!invites || invites.length === 0) {
      return res
        .status(200) 
        .json({
          status: true, 
          message: "No co-host invites found for this show",
          data: []
        });
    }

    // Map over the array of invites and format each one
    const formattedInvites = invites.map(invite => {
      const cohostUser = invite.cohost?.userId;
      const hostUser = invite.host?.userId;

      let hostCompanyName = null;
      let hostSellerType = null;

      // Determine company name and seller type based on host's role
      if (hostUser?.role === 'seller' && hostUser.sellerInfo) {
        hostCompanyName = hostUser.sellerInfo.companyName;
        hostSellerType = hostUser.sellerInfo.sellerType;
      } else if (hostUser?.role === 'dropshipper' && hostUser.dropshipperInfo) {
        hostCompanyName = hostUser.dropshipperInfo?.businessName;
      }

      let cohostCompanyName = null;
      let cohostSellerType = null;

      // Determine company name and seller type based on cohost's role
      if (cohostUser?.role === 'seller' && cohostUser.sellerInfo) {
        cohostCompanyName = cohostUser.sellerInfo.companyName;
        cohostSellerType = cohostUser.sellerInfo.sellerType;
      } else if (cohostUser?.role === 'dropshipper' && cohostUser.dropshipperInfo) {
        cohostCompanyName = cohostUser.dropshipperInfo?.businessName;
      }

      // Construct the final data object for this specific invite
      return { 
        inviteId: invite._id,
        status: invite.status,
        invitedAt: invite.createdAt,
        joinedAt: invite.joinedAt,
        leftAt: invite.leftAt,  
        show: invite.show ? {
          showId: invite.show._id,
          title: invite.show.title,
          scheduledAt: invite.show.scheduledAt,
          thumbnailImageURL: invite.show.thumbnailImageURL,
          liveStreamId: invite.show.liveStreamId,
          showStatus: invite.show.showStatus,
        } : null,
        host: hostUser ? {
          userId: hostUser._id,
          userName: hostUser.userName,
          profileURL: hostUser.profileURL?.azureUrl || null,
          role: hostUser.role,
          companyName: hostCompanyName,
          sellerType: hostSellerType,
        } : null,
        cohost: cohostUser ? {
          userId: cohostUser._id,
          userName: cohostUser.userName,
          profileURL: cohostUser.profileURL?.azureUrl || null,
          companyName: cohostCompanyName,
          role: cohostUser.role,
          sellerType: cohostSellerType,
        } : null,
      };
    });

    return res
      .status(200)
      .json({
        status: true,
        message: "Co-host invites fetched successfully",
        data: formattedInvites 
      });

  } catch (error) {
    console.error("getShowCoHostInvites error:", error.message, error.stack);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const respondToCoHostInvite = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { inviteId } = req.params;
    const { action } = req.body; // 'accepted' or 'rejected'
    const cohostUserId = req?.user?._id;

    if (!["accepted", "rejected"].includes(action)) {
      return res.status(400).json({ status: false, message: "Invalid action" });
    }

    const invite = await CoHostInvite.findById(inviteId).populate({
        path: 'cohost.userId',
        select: 'userName profileURL role sellerInfo dropshipperInfo',
        populate: [
            { path: 'sellerInfo', select: 'companyName sellerType' },
            { path: 'dropshipperInfo', select: 'businessName' }
        ]
    }).session(session);

    if (!invite) {
      return res.status(404).json({ status: false, message: "Invite not found" });
    }
    if (String(invite.cohost.userId._id) !== String(cohostUserId)) {
      return res.status(403).json({ status: false, message: "Not authorized to respond to this invite" });
    }
    if (invite.status !== 'pending') {
        return res.status(400).json({ status: false, message: `This invite is no longer pending. Current status: ${invite.status}` });
    }

    invite.status = action;
    if (action === "accepted") {
      invite.joinedAt = new Date();
      
      const cohostUser = invite.cohost.userId;
      const cohostDetailsForShow = {
        userId: cohostUser._id,
        userName: cohostUser.userName,
        role: cohostUser.role,
        profileURL: cohostUser.profileURL?.azureUrl || null,
        companyName: cohostUser.sellerInfo?.companyName || cohostUser.dropshipperInfo?.businessName || null,
        sellerType: cohostUser.sellerInfo?.sellerType || null,
      };

      await Show.findByIdAndUpdate(invite.show, { coHost: cohostDetailsForShow }, { session });
    }

    await invite.save({ session });
    await session.commitTransaction();
    return res.status(200).json({ status: true, message: `Invite ${action} successfully.` });
  } catch (error) {
    await session.abortTransaction();
    console.error("respondToCoHostInvite error", error.message);
    return res.status(500).json({ status: false, message: "Internal server error" });
  } finally {
      session.endSession();
  }
};
export const cancelCoHostInvite = async (req, res) => {
  try {
    const { inviteId } = req.params;
    const hostUserId = req?.user?._id;

    const invite = await CoHostInvite.findById(inviteId);

    if (!invite) {
      return res
        .status(404)
        .json({ status: false, message: "Invite not found" });
    }

    // Only host can cancel
    if (String(invite.host.userId) !== String(hostUserId)) {
      return res.status(403).json({ status: false, message: "Not authorized" });
    }

    // cancel only pending requets 
    if (invite.status !== "pending") {
      return res
        .status(400)
        .json({
          status: false,
          message: `Only pending invites can be cancelled. This invite currently has status: '${invite.status}'.`
        });
    }

    invite.status = "cancelled";
     invite.reason = 'HOST_CANCELLED_PENDING'; 
     invite.liveStreamId = null; 
    await invite.save();

    return res.status(200).json({ status: true, message: "Invite cancelled" });
  } catch (error) {
    console.error("cancelCoHostInvite error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const leaveCoHost = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { inviteId } = req.params;
    const cohostUserId = req?.user?._id;
    const invite = await CoHostInvite.findById(inviteId).session(session);
    if (!invite) return res.status(404).json({ status: false, message: "Invite not found" });
    if (String(invite.cohost.userId) !== String(cohostUserId)) return res.status(403).json({ status: false, message: "Not authorized" });
    if (invite.status !== "accepted") return res.status(400).json({ status: false, message: "Cannot leave a show that you have not accepted." });

    invite.status = "left";
    invite.reason = 'COHOST_LEFT_VOLUNTARILY';
     invite.liveStreamId = null;
    invite.leftAt = new Date();
    await Show.findByIdAndUpdate(invite.show, { coHost: null }, { session });
    await invite.save({ session });
    await session.commitTransaction();
    return res.status(200).json({ status: true, message: "You have left the co-hosting." });
  } catch (error) {
    await session.abortTransaction();
    console.error("leaveCoHost error", error.message);
    return res.status(500).json({ status: false, message: "Internal server error" });
  } finally {
      session.endSession();
  }
};
export const removeCoHostByHost = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { inviteId } = req.params;
    const hostUserId = req?.user?._id;
    const invite = await CoHostInvite.findById(inviteId).session(session);
    if (!invite) return res.status(404).json({ status: false, message: "Invite not found" });
    if (String(invite.host.userId) !== String(hostUserId)) return res.status(403).json({ status: false, message: "Only the host can remove a co-host." });
    if (invite.status !== "accepted") return res.status(400).json({ status: false, message: "Co-host is not currently active in this show." });

    invite.status = "left";
    invite.reason = 'HOST_REMOVED_COHOST'; 
     invite.liveStreamId = null;
    invite.leftAt = new Date();
    await invite.save();
    await Show.findByIdAndUpdate(invite.show, { coHost: null }, { session });
    await invite.save({ session });
    await session.commitTransaction();
    return res.status(200).json({ status: true, message: "Co-host removed successfully." });
  } catch (error) {
    await session.abortTransaction();
    console.error("removeCoHostByHost error", error.message);
    return res.status(500).json({ status: false, message: "Internal server error" });
  } finally {
      session.endSession();
  }
};


export const getReceivedCoHostRequests = async (req, res) => {
  try {

    const cohostUserId = req?.user?._id;

    const invites = await CoHostInvite.find({
      "cohost.userId": cohostUserId
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "show",
        select:
          "title scheduledAt thumbnailImage previewVideo liveStreamId showStatus",
      })
      .populate({
        path: 'host.userId',
        select: "userName profileURL role sellerInfo dropshipperInfo",
        populate: [
          { path: 'sellerInfo', select: 'companyName sellerType'},
          { path: 'dropshipperInfo', select: 'businessName' }
        ]
      })
      .lean();

    const formattedInvites = invites.map( invite => {
      const hostUser = invite.host.userId;
      let hostCompanyName = null;
      let hostSellerType = null;

      if( hostUser?.role === 'seller' && hostUser.sellerInfo ) {
        hostCompanyName = hostUser.sellerInfo.companyName;
        hostSellerType = hostUser.sellerInfo.sellerType;
      }else if ( hostUser?. role === 'dropshipper' && hostUser.dropshipperInfo ){
        hostCompanyName = hostUser.dropshipperInfo?.businessName
      }

      // construct the obj for each invite
      return {
        inviteId: invite._id,
        status: invite.status,
        invitedAt: invite.createdAt,
        show: {
          showId: invite.show?._id,
          title: invite.show?.title,
          scheduledAt: invite.show?.scheduledAt,
          thumbnailImage: invite.show?.thumbnailImage,
          previewVideo: invite.show?.previewVideo,
          liveStreamId: invite.show?.liveStreamId,
          showStatus: invite.show?.showStatus,
        },
        host: {
          userId: hostUser?._id,
          userName: hostUser?.userName,
          profileURL: hostUser?.profileURL?.key || null,
          companyName: hostCompanyName,
          role: hostUser?.role,
          sellerType: hostSellerType
      },
      }
    })

    return res.status(200).json({
      status: true,
      message: invites.length
        ? "Co-host invites fetched successfully"
        : "No co-host invites found",
      data: formattedInvites,
    });
  } catch (error) {
    console.error("getReceivedCoHostRequests error:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

/**
 * NEW CONTROLLER for inviting a co-host to a LIVE stream.
 * This action cancels any previous invites and immediately accepts the new one.
 */
export const inviteAndJoinLive = async (req, res) => {
  const { showId } = req.params;
  const { cohostUserId } = req.body;
  const hostUserId = req?.user?._id;

  // A transaction ensures all database operations succeed or fail together
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const show = await Show.findById(showId).session(session);
    if (!show) {
      throw new Error("Show not found.");
    }
    if (show.showStatus !== "live") {
      throw new Error("This action is only available for shows that are currently live.");
    }
    if (String(show.host) !== String(req.hostId)) {
        throw new Error("Only the main host can perform this action.");
    }
    if (String(hostUserId) === String(cohostUserId)) {
        throw new Error("You cannot invite yourself as a co-host.");
    }

    // Step 1: Cancel any existing pending or accepted invites for this show
    await CoHostInvite.updateMany(
      { show: showId, status: { $in: ["pending", "accepted"] } },
      { $set: { status: "cancelled", leftAt: new Date() } },
      { session }
    );

    // Step 2: Fetch details for the new co-host to be invited
    const cohostUser = await User.findById(cohostUserId).populate("sellerInfo").populate("dropshipperInfo").lean();
    if (!cohostUser) throw new Error("Invited user not found.");
    
    // Determine the co-host's specific role ID (Seller or Dropshipper)
    let cohostHostId = null;
    let cohostHostModel = null;
    if (cohostUser.role === "seller" && cohostUser.sellerInfo) {
        cohostHostId = cohostUser.sellerInfo._id;
        cohostHostModel = "sellers";
    } else if (cohostUser.role === "dropshipper" && cohostUser.dropshipperInfo) {
        cohostHostId = cohostUser.dropshipperInfo._id;
        cohostHostModel = "dropshippers";
    } else {
        throw new Error("Invited co-host must be a registered Seller or Dropshipper.");
    }

    // Step 3: Create a new, immediately 'accepted' invite
    const newInvite = new CoHostInvite({
      show: showId,
      host: { userId: hostUserId, hostId: req.hostId, hostModel: req.showHostModel },
      cohost: { userId: cohostUserId, hostId: cohostHostId, hostModel: cohostHostModel },
      status: "accepted", // Immediately mark as accepted
      joinedAt: new Date(),
      liveStreamId: show.liveStreamId, // Add the stream ID so they can join
    });
    await newInvite.save({ session });

    // Step 4: Update the main Show document with the new co-host's details
    const cohostDetailsForShow = {
        userId: cohostUser._id,
        userName: cohostUser.userName,
        role: cohostUser.role,
        profileURL: cohostUser.profileURL?.azureUrl || null,
        companyName: cohostUser.sellerInfo?.companyName || cohostUser.dropshipperInfo?.businessName || null,
        sellerType: cohostUser.sellerInfo?.sellerType || null,
    };
    show.coHost = cohostDetailsForShow;
    await show.save({ session });

    // --- TODO: SEND A REAL-TIME NOTIFICATION TO THE NEW CO-HOST ---
    // This is where you would trigger your WebSocket or Push Notification service
    console.log(`Live invite notification trigger for co-host: ${cohostUserId}`);

    await session.commitTransaction();
    res.status(200).json({
      status: true,
      message: "Live co-host invitation sent and accepted successfully!",
      data: newInvite,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in inviteAndJoinLive:", error.message);
    res.status(400).json({ status: false, message: error.message || "Failed to send live invitation." });
  } finally {
    session.endSession();
  }
};

