import Express from 'express';
import { getAllProducts, getAllShoppableVideos, getAllShows } from '../controllers/userFeed.controller.js';
import { userAuth } from '../middlewares/auth.js';

const userFeedRouter = Express.Router();

userFeedRouter.get("/products", userAuth, getAllProducts);
userFeedRouter.get("/shows", userAuth, getAllShows);
userFeedRouter.get("/shoppable-videos", userAuth, getAllShoppableVideos);

export default userFeedRouter;