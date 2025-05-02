import ProductListing from "../models/productListing.model.js";
import Stock from "../models/stock.model.js";

export const updateStockById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedStock = await Stock.findByIdAndUpdate(id, data, { new: true });

    if (!updatedStock) {
      return res
        .status(404)
        .json({ status: false, message: "stock not found" });
    }

    // update quantity in respective product 
    const product = await ProductListing.findById(updatedStock.productListingId);

    if(!product){
      return res.status(404).json({ status: false, message: "product not found. can't update quantity"})
    }
 
      product.quantity = updatedStock.quantity;
      await product.save();
  

    return res.status(200).json({
      status: true,
      message: "Stock and product quantity updated successfully!",
      data: updatedStock,
    });
  } catch (error) {
    console.error("Error in updateStockById:", error.message);
    res.status(500).json({ status: false, message: "Internal server Error." });
  }
};

export const getStockById = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findById(id);
    if (!stock) {
      return res
        .status(404)
        .json({ status: false, message: "Stock not found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Stock fetched successfully", data: stock });
  } catch (error) {
    console.error("Error in getStockById:", error.message);
    res.status(500).json({ status: false, message: "Internal server Error." });
  }
};

export const getStockBySellerId = async (req, res) => {
  const { seller } = req;
  const { _id: sellerId} = seller;
  try {
    const sellerStocks = await Stock.find({ sellerId }).sort({ createdAt: -1 });
    return res
      .status(200)
      .json({
        status: true,
        message: "Seller's stock's fetched successfully.",
        data: sellerStocks || [],
      });
  } catch (error) {
    console.error("Error in getStockBySellerId:", error.message);
    res.status(500).json({ status: false, message: "Internal server Error." });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const allStocks = await Stock.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: true,
      message: "All stocks fetched successfully",
      data: allStocks || [],
    });
  } catch (error) {
    console.error("Error in getAllStocks:", error.message);
    res.status(500).json({ status: false, message: "Internal server Error." });
  }
};