import Seller from "../../models/seller.model.js";

// approved sellers count
export const approvedSellersCount = async(req,res) =>{
    try {
      const sellersCount = await Seller.find({approvalStatus:'approved'}).countDocuments();
      return res.status(200).json({status: true, message: 'approved sellers count fetched successfully!', data: sellersCount || 0});
    } catch (error) {
      console.error("Error in approvedSellersCount:", error.message);
      return res.status(500).json({status: false, message:'Internal server error.'})
    }
  }