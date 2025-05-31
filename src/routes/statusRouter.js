import express from 'express';
import { userAuth } from '../middlewares/auth.js'; // Or 'protect' - needs auth

const statusRouter = express.Router();

// GET /api/status/check-access
// This route needs authentication (userAuth/protect) AND
// the global blockAccessMiddleware applied to '/api' in server.js
statusRouter.get('/check-access', (req, res) => {
    // If the request reaches this handler, it means:
    // 1. The user is authenticated (due to userAuth/protect).
    // 2. The user was NOT blocked by blockAccessMiddleware.
    res.status(200).json({
        status: true,
        blocked: false,
        message: "Access permitted for user region."
    });
});

export default statusRouter;