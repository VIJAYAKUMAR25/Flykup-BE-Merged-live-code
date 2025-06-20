import express from 'express';
import { checkUsernameAvailability, getProfileByUserName, paginatedProducts, paginatedShoppableVideos, paginatedShows, updateProfile } from '../controllers/profile.controller.js';
import { optionalAuth, userAuth } from '../middlewares/auth.js';

const profileRouter = express.Router();

profileRouter.get("/username-availability", userAuth, checkUsernameAvailability);
profileRouter.put("/", userAuth, updateProfile);

profileRouter.get("/:userName", optionalAuth, getProfileByUserName);


// Paginated APIs for products, shows, and videos (using sellerId)
profileRouter.get("/:sellerId/products", optionalAuth, paginatedProducts);
profileRouter.get("/:hostId/shows",optionalAuth, paginatedShows);
profileRouter.get("/:hostId/shoppableVideos", optionalAuth, paginatedShoppableVideos);


export default profileRouter;