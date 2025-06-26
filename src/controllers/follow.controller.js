import Follow from "../models/follow.model.js";
import mongoose from "mongoose";

export const followUser = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.user.id;

    // Prevent users from following themselves
    if (userId === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: userId,
      following: targetUserId,
    });

    if (existingFollow) {
      return res
        .status(400)
        .json({ success: false, message: "Already following this user" });
    }

    // Create follow entry
    await Follow.create({ follower: userId, following: targetUserId });

    res.status(201).json({ success: true, message: "Followed successfully" });
  } catch (error) {
    console.error("Error in followUser:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.user.id;

    // Check if follow relationship exists
    const existingFollow = await Follow.findOne({
      follower: userId,
      following: targetUserId,
    });

    if (!existingFollow) {
      return res
        .status(400)
        .json({ success: false, message: "You are not following this user" });
    }

    // Delete follow entry
    await Follow.deleteOne({ _id: existingFollow._id });

    res.status(200).json({ success: true, message: "Unfollowed successfully" });
  } catch (error) {
    console.error("Error in unfollowUser:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getFollowingsByUserId = async (req, res) => {
  try {
    const { userId, userName = "" } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);
    const currentUserId = req.user._id;


    const skip = (page - 1) * limit;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const userObjectId = new mongoose.Types.ObjectId(String(userId));
    const currentUserObjectId = new mongoose.Types.ObjectId(String(currentUserId));

    const result = await Follow.aggregate([
      { $match: { follower: userObjectId } },
      {
        $facet: {
          fullCount: [{ $count: "count" }], // Total followings without filter
          filteredCount: [
            // Count after userName filter
            {
              $lookup: {
                from: "users",
                localField: "following",
                foreignField: "_id",
                as: "followingData",
              },
            },
            { $unwind: "$followingData" },
            {
              $match: {
                "followingData.userName": { $regex: userName, $options: "i" },
              },
            },
            { $count: "count" },
          ],
          filteredResults: [
            // Paginated results with follow status
            {
              $lookup: {
                from: "users",
                localField: "following",
                foreignField: "_id",
                as: "followingData",
              },
            },
            { $unwind: "$followingData" },
            {
              $match: {
                "followingData.userName": { $regex: userName, $options: "i" },
              },
            },
            {
              $lookup: {
                from: "follows",
                let: { followingId: "$following" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$follower", currentUserObjectId] },
                          { $eq: ["$following", "$$followingId"] },
                        ],
                      },
                    },
                  },
                ],
                as: "currentUserFollows",
              },
            },
            {
              $lookup: {
                from: "follows",
                let: { followingId: "$following" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$follower", "$$followingId"] },
                          { $eq: ["$following", currentUserObjectId] },
                        ],
                      },
                    },
                  },
                ],
                as: "followingUserFollowsCurrent",
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 0,
                userId: "$followingData._id",
                userName: "$followingData.userName",
                profileURL: { $ifNull: ["$followingData.profileURL.key", null]},
                role: "$followingData.role",
                followStatus: {
                  $cond: [
                    { $eq: ["$followingData._id", currentUserObjectId] },
                    null,
                    {
                      $cond: [
                        { $gt: [{ $size: "$currentUserFollows" }, 0] },
                        "Following",
                        {
                          $cond: [
                            { $gt: [{ $size: "$followingUserFollowsCurrent" }, 0] },
                            "Follow Back",
                            "Follow",
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ]);

    // Extract counts and results
    const totalFollowingCount = result[0].fullCount[0]?.count || 0;
    const filteredFollowingCount = result[0].filteredCount[0]?.count || 0;
    const following = result[0].filteredResults;

    return res.status(200).json({
      status: true,
      message: "Following fetched successfully!",
      data: {
        following,
        totalFollowingCount,
        filteredFollowingCount,
      },
    });
  } catch (error) {
    console.error("Error in getFollowingsByUserId:", error.message);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const getFollowersByUserId = async (req, res) => {
  try {
    const { userId, userName = "" } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 20);
    const currentUserId = req.user._id;

    const skip = (page - 1) * limit;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing userId",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(String(userId));
    const currentUserObjectId = new mongoose.Types.ObjectId(String(currentUserId));

    const result = await Follow.aggregate([
      { $match: { following: userObjectId } },
      {
        $facet: {
          fullCount: [{ $count: "count" }], // Total followers without any filters
          filteredCount: [
            // Calculate count after userName filter
            {
              $lookup: {
                from: "users",
                localField: "follower",
                foreignField: "_id",
                as: "followerData",
              },
            },
            { $unwind: "$followerData" },
            {
              $match: {
                "followerData.userName": { $regex: userName, $options: "i" },
              },
            },
            { $count: "count" },
          ],
          filteredResults: [
            // Get paginated results with necessary data
            {
              $lookup: {
                from: "users",
                localField: "follower",
                foreignField: "_id",
                as: "followerData",
              },
            },
            { $unwind: "$followerData" },
            {
              $match: {
                "followerData.userName": { $regex: userName, $options: "i" },
              },
            },
            {
              $lookup: {
                from: "follows",
                let: { followerId: "$follower" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$follower", currentUserObjectId] },
                          { $eq: ["$following", "$$followerId"] },
                        ],
                      },
                    },
                  },
                ],
                as: "currentUserFollows",
              },
            },
            {
              $lookup: {
                from: "follows",
                let: { followerId: "$follower" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$follower", "$$followerId"] },
                          { $eq: ["$following", currentUserObjectId] },
                        ],
                      },
                    },
                  },
                ],
                as: "followerFollowsCurrentUser",
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 0,
                userId: "$followerData._id",
                userName: "$followerData.userName",
                profileURL: {$ifNull: ["$followerData.profileURL.key", null]},
                role: "$followerData.role",
                followStatus: {
                  $cond: [
                    { $eq: ["$followerData._id", currentUserObjectId] },
                    null,
                    {
                      $cond: [
                        { $gt: [{ $size: "$currentUserFollows" }, 0] },
                        "Following",
                        {
                          $cond: [
                            { $gt: [{ $size: "$followerFollowsCurrentUser" }, 0] },
                            "Follow Back",
                            "Follow",
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ]);

    // Extract counts and results
    const totalFollowersCount = result[0].fullCount[0]?.count || 0;
    const filteredFollowersCount = result[0].filteredCount[0]?.count || 0;
    const followers = result[0].filteredResults;

    return res.status(200).json({
      status: true,
      message: "Followers fetched successfully!",
      data: { followers, totalFollowersCount, filteredFollowersCount },
    });
  } catch (error) {
    console.error("Error in getFollowersByUserId:", error.message);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
