import express from 'express';
import { searchProducts, searchShows, searchUsers, searchVideos } from '../controllers/globalSearch.controller.js'; 

const globalSearchRouter = express.Router();

globalSearchRouter.get('/shows', searchShows);
globalSearchRouter.get('/videos', searchVideos);
globalSearchRouter.get('/products', searchProducts);
globalSearchRouter.get('/users', searchUsers);

export default globalSearchRouter;