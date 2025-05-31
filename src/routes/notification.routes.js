import express from "express";
import {
  getMyNotifications,
  clearMyNotifications,
  getUnseenNotificationCount,
  markAllNotificationsSeen,
} from "../controllers/notification.controller.js";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();


// ✅ GET /api/notifications - Get my notifications
router.get("/get", userAuth ,getMyNotifications);


router.get("/count", userAuth ,getUnseenNotificationCount);

router.put("/mark-as-seen", userAuth ,markAllNotificationsSeen);


// ✅ DELETE /api/notifications - Clear my notifications
router.delete("/delete", userAuth, clearMyNotifications);

export default router;
