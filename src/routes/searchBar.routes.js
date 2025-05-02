import express from 'express';
import { searchProducts, searchShows, searchUsers, searchVideos } from '../controllers/searchBar.controller.js';

const searchBarRouter = express.Router();

searchBarRouter.get('/shows', searchShows);
searchBarRouter.get('/videos', searchVideos);
searchBarRouter.get('/products', searchProducts);
searchBarRouter.get('/users', searchUsers);


export default searchBarRouter;