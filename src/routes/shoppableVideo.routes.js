import Express from 'express';
import { sellerAuth, userAuth ,canHostShow , isVideoHost} from '../middlewares/auth.js';
import { createShoppableVideo, deleteShoppableVideo, getMyHostedShoppableVideos,updateVideoProcessingDetails , getAllShoppableVideos, getShoppableVideoById, updateShoppableVideo, updateVideoVisibility } from '../controllers/shoppableVideo.controller.js';

const shoppableVideoRouter = Express.Router();

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
shoppableVideoRouter.post("/:id/processing-callback", updateVideoProcessingDetails);

export default shoppableVideoRouter;