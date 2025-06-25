import Notification from "../models/notification.model.js";
import User from "../models/user.model.js"; // adjust the path based on your structure
import {
  sendSingleNotification,
  sendMulticastNotification,
  notifyAllUsersWithTokens,
} from "../firebase/notification.js";

// export const sendNotificationToAll = async (req, res) => {
//   const notificationTitle = req.body.title || "New Feature is launched.";
//   const notificationBody = req.body.body || "Something is happend";
//   const notificationImage = req.body.imageUrl || "";
//   try {
//     const customData = {
//       imageUrl: notificationImage,
//     };
//     const result = await notifyAllUsersWithTokens(
//       notificationTitle,
//       notificationBody,
//       customData
//     );

//     return res.status(200).json({
//       status: true,
//       message: "Notification is sent to all.",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error in sending notifications to all:", error);
//     return res
//       .status(500)
//       .json({ status: false, message: "Sending notification failed." });
//   }
// };




// Save and send a single notification

// export const createNotification = async ({ fromUser, toUser, type, title, message, cutMessage, link = null, file = null, actions = [] }) => {
//   const notification = await Notification.create({
//     fromUser,
//     toUser,
//     type,
//     title,
//     message,
//     cutMessage,
//     link,
//     file,
//     actions,
//   });
//   // send notification to user
//   console.log("Sending notification to user:", toUser);
  
//   const user = await User.findById(toUser);
//   if (user?.fcmTokens) {  //fcmTokens
//     await sendMulticastNotification(user.fcmTokens, title, message, { type });
//   }

//   return notification;
// };

export const createNotification = async (notificationData) => {
  try {
    const { toUser, type, title, message, cutMessage, link } = notificationData;
    
    // Create notification
    const notification = new Notification({
      toUser,
      type,
      title,
      message,
      cutMessage: cutMessage || message.substring(0, 100),
      link: link || null,
      status: 'unread'
    });
    
    await notification.save();
    return notification;
  } catch (error) {
    console.error("Notification creation failed:", error);
    throw error; // Rethrow to handle in calling function
  }
};


// Save and send multiple notifications
export const createBulkNotification = async (notificationsData = []) => {
  const notifications = await Notification.insertMany(notificationsData);

  const tokens = [];
  notificationsData.forEach((n) => {
    if (n.fcmTokens) tokens.push(n.fcmToken);
  });

  if (tokens.length) {
    await sendMulticastNotification(tokens, notificationsData[0].title, notificationsData[0].message, { type: notificationsData[0].type });
  }

  return notifications;
};

// Save and notify all users
export const notifyAllUsers = async ({ fromUser, type, title, message, link = null }) => {
  const users = await User.find({}); // optionally filter out admins or bots
  const tokens = [];
  const bulkNotifications = [];

  users.forEach((user) => {
    bulkNotifications.push({
      fromUser,
      toUser: user._id,
      type,
      title,
      message,
      link,
    });
    if (user.fcmTokens) tokens.push(user.fcmTokens);
  });

  await Notification.insertMany(bulkNotifications);

  if (tokens.length) {
    await notifyAllUsersWithTokens(title, message, { type });
  }
};

// Fetch notifications for the logged-in user
export const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ toUser: userId })
      .populate("fromUser", "name image emailId userName profileURL") // Select only required fields
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error in getMyNotifications:", err);
    res.status(500).json({ error: "Failed to get notifications." });
  }
};

// Route: GET /api/notifications/count
export const getUnseenNotificationCount = async (req, res) => {
  try {
    const userId = req.user._id;

    const unseenCount = await Notification.countDocuments({
      toUser: userId,
      isRead: false,
    });

    res.status(200).json({ unseenCount });
  } catch (error) {
    console.error("Error getting unseen notifications:", error);
    res.status(500).json({ error: "Failed to fetch notification count." });
  }
};

// PUT /api/notifications/mark-all-seen
export const markAllNotificationsSeen = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.updateMany({ toUser: userId, isRead: false }, { isRead: true });

    res.status(200).json({ message: "All notifications marked as seen." });
  } catch (error) {
    console.error("Error marking notifications seen:", error);
    res.status(500).json({ error: "Failed to update notifications." });
  }
};

// Clear all notifications for current user
export const clearMyNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ toUser: userId });
    res.status(200).json({ message: "Notifications cleared successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear notifications." });
  }
};
