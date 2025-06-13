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

    // ---- Exclude requesting user from this list ----
    if ( requestingUser?._id ) {
      queryConditions._id = { $ne: requestingUser._id }
    }

    const users = await User.find(queryConditions)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select(USER_PUBLIC_FIELDS)
      .populate({
        path: "sellerInfo",
        select: "sellerType companyName _id",
      })
      .populate({
        path: "dropshipperInfo",
        select: "businessName _id",
      })
      .lean();

    // Transform data into desired format
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

    return res
      .status(200)
      .json({
        status: true,
        message:
          formattedData?.length === 0
            ? "No user found"
            : "Sellers and Dropshippers fetched successfully!",
        data: formattedData || [],
      });
  } catch (error) {
    console.error("Error in getSellersAndDropshippers:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error." });
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
  try {
    const { inviteId } = req.params;
    const { action } = req.body; // action = 'accepted' or 'rejected'
    const cohostUserId = req?.user?._id;

    if (!["accepted", "rejected"].includes(action)) {
      return res.status(400).json({ status: false, message: "Invalid action" });
    }

    const invite = await CoHostInvite.findById(inviteId);

    if (!invite) {
      return res
        .status(404)
        .json({ status: false, message: "Invite not found" });
    }

    // Only cohost can accept/reject
    if (String(invite.cohost.userId) !== String(cohostUserId)) {
      return res.status(403).json({ status: false, message: "Not authorized" });
    }

    invite.status = action;
    if (action === "accepted") {
      invite.joinedAt = new Date();
    }
    await invite.save();

    return res.status(200).json({ status: true, message: `Invite ${action}` });
  } catch (error) {
    console.error("respondToCoHostInvite error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
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
  try {
    const { inviteId } = req.params;
    const cohostUserId = req?.user?._id;

    const invite = await CoHostInvite.findById(inviteId);

    if (!invite) {
      return res
        .status(404)
        .json({ status: false, message: "Invite not found" });
    }

    // Only cohost can leave
    if (String(invite.cohost.userId) !== String(cohostUserId)) {
      return res.status(403).json({ status: false, message: "Not authorized" });
    }

    if (invite.status !== "accepted") {
      return res
        .status(400)
        .json({ status: false, message: "You haven't joined yet" });
    }

    invite.status = "left";
    invite.leftAt = new Date();
    await invite.save();

    return res
      .status(200)
      .json({ status: true, message: "You have left the co-hosting" });
  } catch (error) {
    console.error("leaveCoHost error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const removeCoHostByHost = async (req, res) => {
  try {
    const { inviteId } = req.params;
    const hostUserId = req?.user?._id;

    const invite = await CoHostInvite.findById(inviteId);

    if (!invite) {
      return res
        .status(404)
        .json({ status: false, message: "Invite not found" });
    }

    // Only host can remove cohost
    if (String(invite.host.userId) !== String(hostUserId)) {
      return res.status(403).json({ status: false, message: "Not authorized" });
    }

    if (invite.status !== "accepted") {
      return res
        .status(400)
        .json({ status: false, message: "Cohost is not currently active" });
    }

    invite.status = "left"; // Same as cohost leaving
    invite.leftAt = new Date();
    await invite.save();

    return res
      .status(200)
      .json({ status: true, message: "Cohost removed successfully" });
  } catch (error) {
    console.error("removeCoHostByHost error", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
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
          "title scheduledAt thumbnailImageURL previewVideoURL liveStreamId showStatus",
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
          thumbnailImageURL: invite.show?.thumbnailImageURL,
          liveStreamId: invite.show?.liveStreamId,
          showStatus: invite.show?.showStatus,
        },
        host: {
          userId: hostUser?._id,
          userName: hostUser?.userName,
          profileURL: hostUser?.profileURL?.azureUrl || null,
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
