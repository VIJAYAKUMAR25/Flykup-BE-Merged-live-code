import express from 'express';
import { getProductDetailsById } from '../controllers/productDetails.controller.js';
import { userAuth } from '../middlewares/auth.js';

const productDetailsRouter = express.Router();

productDetailsRouter.get("/:id", getProductDetailsById);


export default productDetailsRouter;