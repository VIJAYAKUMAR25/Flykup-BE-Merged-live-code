import express from "express";
import { getLoginLogs } from "../../controllers/loginLogs.controller.js";

const router = express.Router();

// GET /loginlogs - Only admin can view login logs
router.get("/loginlogs", getLoginLogs);

export default router;
