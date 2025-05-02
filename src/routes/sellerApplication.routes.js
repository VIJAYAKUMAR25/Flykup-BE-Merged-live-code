import Express from 'express';
import { applyAsSeller, reapplyAsSeller, sellerApplicationStatus } from '../controllers/sellerApplication.controller.js';
import { userAuth } from '../middlewares/auth.js';

const sellerApplicationRouter = Express.Router();

sellerApplicationRouter.post('/seller', userAuth, applyAsSeller);
sellerApplicationRouter.put('/seller', userAuth, reapplyAsSeller);
sellerApplicationRouter.get('/seller', userAuth, sellerApplicationStatus);

export default sellerApplicationRouter;