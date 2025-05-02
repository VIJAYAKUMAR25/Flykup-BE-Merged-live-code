import Express from 'express';
import { createSeller, deleteSeller, getAllApprovedSellers, getSellerById, getSellerDetailsById, toggleSellerAccessAdmin, updateSeller } from '../controllers/seller.controller.js';
import { sellerAuth, userAuth } from '../middlewares/auth.js';

const sellerRouter = Express.Router();

// user panel 

// get seller details by id
sellerRouter.get("/details/:id", userAuth, getSellerDetailsById);
// get seller details by cookie
sellerRouter.get("/details", sellerAuth, getSellerDetailsById)




// admin panel

// Create a new seller
sellerRouter.post("/create", createSeller);
// Get a single seller by ID
sellerRouter.get("/get/:id", getSellerById);
// get all approved sellers
sellerRouter.get("/all-approved", getAllApprovedSellers);
// Update a seller by ID
sellerRouter.put("/update/:id", updateSeller);
// Delete a seller by ID
sellerRouter.delete("/delete/:id", deleteSeller);
// allow or restrict seller access 
sellerRouter.put("/access/:sellerId", toggleSellerAccessAdmin);



export default sellerRouter;