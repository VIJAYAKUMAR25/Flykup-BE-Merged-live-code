import express from 'express';
import { sellerAuth,canHostShow } from '../middlewares/auth.js';
import { createVideo, generateSasToken, getPublishedVideos, getVideoDetails } from '../controllers/video.controller.js';


const videoRouter = express.Router();

videoRouter.post('/', sellerAuth, createVideo);
videoRouter.post('/generate-sas', canHostShow, generateSasToken);
videoRouter.get('/published', getPublishedVideos);
videoRouter.get('/:id', getVideoDetails);


export default videoRouter;