import express from 'express';
import { followUser, getFollowersByUserId, getFollowingsByUserId, unfollowUser } from '../controllers/follow.controller.js';
import { userAuth } from '../middlewares/auth.js';

const followRouter = express.Router();

followRouter.post("/", userAuth , followUser);
followRouter.delete("/", userAuth , unfollowUser);
followRouter.get("/user-followings", userAuth, getFollowingsByUserId);
followRouter.get("/user-followers", userAuth, getFollowersByUserId);




export default followRouter;
