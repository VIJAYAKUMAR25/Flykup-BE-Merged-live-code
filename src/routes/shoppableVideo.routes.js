import Express from 'express';
import { sellerAuth, userAuth ,canHostShow , isVideoHost} from '../middlewares/auth.js';
import { createShoppableVideo, deleteShoppableVideo, getMyHostedShoppableVideos, getAllShoppableVideos, getShoppableVideoById, updateShoppableVideo, updateVideoVisibility, handleVideoProcessingUpdate, getPublicShoppableVideoById } from '../controllers/shoppableVideo.controller.js';

const shoppableVideoRouter = Express.Router();

// === Specific Routes FIRST ===
// In shoppableVideo.routes.js - MOVE THIS UP
shoppableVideoRouter.put("/processing-callback", handleVideoProcessingUpdate);

// Create a new shoppable video (Requires Seller or Dropshipper)
shoppableVideoRouter.post("/", canHostShow, createShoppableVideo);

// Update a shoppable video by ID (Requires ownership)
shoppableVideoRouter.put("/:id", userAuth, isVideoHost, updateShoppableVideo);

// Delete a shoppable video (Requires ownership)
shoppableVideoRouter.delete("/:id", userAuth, isVideoHost, deleteShoppableVideo);

// Get all shoppable videos uploaded by the logged-in host (Seller or Dropshipper)
shoppableVideoRouter.get("/my-videos", userAuth, getMyHostedShoppableVideos);


// === General User / Public Routes ===

// Get a single shoppable video by ID (Only authenticated users)
shoppableVideoRouter.get("/:id", userAuth, getShoppableVideoById);

//Get all shoppable videos (For users & sellers)
shoppableVideoRouter.get("/", userAuth, getAllShoppableVideos);

// Update visibility of a shoppable video (Requires ownership)
shoppableVideoRouter.put("/:id/visibility", userAuth, isVideoHost, updateVideoVisibility);


// Public route to get video details (no authentication)
shoppableVideoRouter.get("/public/:id", getPublicShoppableVideoById);


export default shoppableVideoRouter;