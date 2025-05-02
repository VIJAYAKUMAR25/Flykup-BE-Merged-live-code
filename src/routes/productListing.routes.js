import Express from 'express';
import { createProductListing, getAllProductListing, getProductById, getProductBySellerId, updateProductById, getProductsForDropshipper } from '../controllers/productListing.controller.js';
import { userAuth, sellerAuth, isDropshipper } from '../middlewares/auth.js';


const productListingRouter = Express.Router();


productListingRouter.get('/seller', sellerAuth, getProductBySellerId);
productListingRouter.get('/seller/:id', sellerAuth, getProductById);
productListingRouter.get('/get/:id', userAuth, getProductById);
productListingRouter.put('/:id', sellerAuth, updateProductById);
productListingRouter.post('/', sellerAuth, createProductListing);


// --- Dropshipper Specific Route ---
// Get products available FROM connected sellers (Dropshipper only)
productListingRouter.get('/dropshipper', isDropshipper, getProductsForDropshipper); 


// to get all products (But not used anywhere in frontend)
productListingRouter.get('/', getAllProductListing);

export default productListingRouter;

