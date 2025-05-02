import Express from 'express';
import { getAllStocks, getStockById, getStockBySellerId, updateStockById } from '../controllers/stock.controller.js';
import { sellerAuth } from '../middlewares/auth.js';

const stockRouter = Express.Router();

stockRouter.put("/:id", sellerAuth, updateStockById);
stockRouter.get("/seller", sellerAuth, getStockBySellerId);
stockRouter.get("/:id", sellerAuth, getStockById);

// to get all stocks (But not used anywhere in frontend)
stockRouter.get("/", getAllStocks);


export default stockRouter;