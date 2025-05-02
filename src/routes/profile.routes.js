import express from 'express';
import { checkUsernameAvailability, getProfileByUserName, paginatedProducts, paginatedShoppableVideos, paginatedShows, updateProfile } from '../controllers/profile.controller.js';
import { userAuth } from '../middlewares/auth.js';

const profileRouter = express.Router();

profileRouter.get("/username-availability", userAuth, checkUsernameAvailability);
profileRouter.put("/", userAuth, updateProfile);

profileRouter.get("/:userName", userAuth, getProfileByUserName);


// Paginated APIs for products, shows, and videos (using sellerId)
profileRouter.get("/:sellerId/products", userAuth, paginatedProducts);
profileRouter.get("/:hostId/shows", userAuth, paginatedShows);
profileRouter.get("/:hostId/shoppableVideos", userAuth, paginatedShoppableVideos);


export default profileRouter;