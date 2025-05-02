import Seller from "../models/seller.model.js";
import Product from "../models/product.model.js";


export const getSellerDetailsByProductId = async ( req, res ) => {
    try {
        const { productId } = req.params;
        
        const product = await Product.findById(productId);
        
        if(!product){
            return res.status(404).json({ status: false, message:"product not found"});
        }

        const seller = await Seller.findById(product.sellerInfo);

        if(!seller){
            return res.status(404).json({ status: false, message:"seller not found"});
        }

        return res.status(200).json({status: true, message:"seller details fetched successfully!", data: seller})
    } catch (error) {
        console.error("Error in getSellerDetailsByProductId:", error.message);
        return res.status(500).json({ status: false, message:"Internal server error. Please try again later."});
    }
}