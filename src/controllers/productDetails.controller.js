import ProductListing from "../models/productListing.model.js";
import { PRODUCT_PUBLIC_FIELDS, SELLER_PUBLIC_FIELDS, USER_PUBLIC_FIELDS } from "../utils/constants.js";

// Get Product Details by id
export const getProductDetailsById = async (req, res) => {
    const { id } = req.params;    
    try {
        const product = await ProductListing.findById(id)
            .select(PRODUCT_PUBLIC_FIELDS)
            .populate({
                path: "sellerId",
                select: SELLER_PUBLIC_FIELDS, 
                populate: {
                    path: "userInfo",
                    select: USER_PUBLIC_FIELDS,
                },
            });

        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }

        res.status(200).json({
            status: true,
            message: "Product fetched successfully!",
            data: product,
        });
    } catch (error) {
        console.error("Error in getProductDetailsById:", error.message);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
};
