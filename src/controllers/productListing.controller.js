import ProductListing from "../models/productListing.model.js";
import Seller from "../models/seller.model.js";
import Stock from "../models/stock.model.js";

// create product

export const createProductListing = async (req, res) => {
  const { seller } = req;
  const { _id: sellerId } = seller;
  const data = req.body;

  try {
    // Step 1: Create product listing with sellerId
    const productData = { ...data, sellerId };

    let newProductListing;
    try {
      newProductListing = new ProductListing(productData);
      await newProductListing.validate(); // validate first to catch any schema issues
      await newProductListing.save();
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: "Invalid product data provided.",
        error: err.message,
      });
    }

    // Step 2: Create a corresponding stock entry
    let createdStock;
    try {
      createdStock = new Stock({
        sellerId,
        productListingId: newProductListing._id,
        title: newProductListing.title,
        quantity: newProductListing.quantity,
        images: newProductListing.images,
      });
      await createdStock.save();
    } catch (err) {
      // Rollback product listing if stock creation fails
      await ProductListing.findByIdAndDelete(newProductListing._id);
      return res.status(500).json({
        status: false,
        message: "Failed to create stock document. Product listing rolled back.",
        error: err.message,
      });
    }

    // Step 3: Link stockId back to product listing
    try {
      newProductListing.stockId = createdStock._id;
      await newProductListing.save();
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: "Failed to update product with stock reference.",
        error: err.message,
      });
    }

    // Step 4: Fetch final version of the product listing
    const updatedProductListing = await ProductListing.findById(newProductListing._id);

    res.status(201).json({
      status: true,
      message: "Product created successfully!",
      data: updatedProductListing,
    });
  } catch (error) {
    console.error("Unexpected error in createProductListing:", error);
    res.status(500).json({
      status: false,
      message: "An unexpected server error occurred.",
      error: error.message,
    });
  }
};

// Get Product by id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductListing.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "product not found" });
    }
    res
      .status(200)
      .json({
        status: true,
        message: "product fetched successfully!",
        data: product,
      });
  } catch (error) {
    console.error("Error in getProductById:", error.message);
    res.status(500).json({ status: false, message: "Internal server Error." });
  }
};

//Get all Products
export const getAllProductListing = async (req, res) => {
  try {
    const allProducts = await ProductListing.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({
        status: true,
        message: "all products fetched successfully!",
        data: allProducts || [],
      });
  } catch (error) {
    console.error("Error in getAllProductListing:", error.message);
    res.status(500).json({ status: false, message: "Internal server Error." });
  }
};

// Get Product(s) by seller id
export const getProductBySellerId = async (req, res) => {
  const { seller } = req;
  const { _id: sellerId } = seller;
  try {
    const sellerProducts = await ProductListing.find({ sellerId }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({
        status: true,
        message: "seller's product's fetched successfully!",
        data: sellerProducts || [],
      });
  } catch (error) {
    console.error("Error in getProductBySellerId:", error.message);
    res.status(500).json({ status: false, message: error.message || "Internal server Error." });
  }
};

// --- UPDATED FUNCTION: Get Products FOR Dropshipper (Grouped by Seller) ---
// @desc    Get Products available for the logged-in Dropshipper, grouped by Seller
// @route   GET /api/v1/products/dropshipper (Example path defined in router)
// @access  Private (Dropshipper - Requires isDropshipper middleware)
export const getProductsForDropshipper = async (req, res) => {
  const { dropshipper } = req; // Attached by isDropshipper middleware

  if (!dropshipper || !dropshipper.connectedSellers) {
    return res.status(403).json({ status: false, message: "Dropshipper profile not found or invalid." });
  }

  try {
    // 1. Find approved seller IDs
    const approvedSellerIds = dropshipper.connectedSellers
      .filter(conn => conn.status === 'approved')
      .map(conn => conn.sellerId); // Extract the ObjectId
      

    // 2. If no approved sellers, return empty array
    if (approvedSellerIds.length === 0) {
      return res.status(200).json({
        status: true,
        message: "No approved seller connections found.",
        data: [], // Return empty array structure
      });
    }

    // 3. Fetch details of the approved sellers
    const approvedSellers = await Seller.find({ _id: { $in: approvedSellerIds } })
        .select('companyName businessType userInfo') // Select desired seller fields
        .populate({ path: 'userInfo', select: 'name userName profileURL' }) // Populate user info within seller
        .lean(); // Use lean for performance

    // 4. Fetch all relevant products for these sellers in one go
    const availableProducts = await ProductListing.find({
        sellerId: { $in: approvedSellerIds }, // Product's seller must be in the approved list
        isActive: true,                       // Product must be active
        allowDropshipping: true               // Seller must allow dropshipping
      })
      // Select fields needed for the frontend product display + sellerId for grouping
      .select('title images productPrice startingPrice reservedPrice category subcategory quantity commissionRate sellerId _id')
      .sort({ sellerId: 1, createdAt: -1 }); // Sort primarily by seller, then newest first

    // 5. Group products by seller ID
    const productsBySeller = availableProducts.reduce((acc, product) => {
        const sellerIdStr = product.sellerId.toString();
        if (!acc[sellerIdStr]) {
            acc[sellerIdStr] = [];
        }
        // We can remove the sellerId from the product object itself now if desired,
        // as it's grouped under the seller. Let's keep it for simplicity for now.
        acc[sellerIdStr].push(product);
        return acc;
    }, {}); // Structure: { "sellerIdString": [product1, product2], ... }

    // 6. Combine seller info with their products
    const groupedResult = approvedSellers.map(seller => ({
        sellerInfo: seller, // The populated seller document from step 3
        products: productsBySeller[seller._id.toString()] || [] // Assign products, default to empty array
    }))
    // Optional: Filter out sellers who have no available products matching the criteria
    .filter(group => group.products.length > 0);


    res.status(200).json({
      status: true,
      message: "Available dropshipping products fetched successfully!",
      data: groupedResult, // Send the grouped data structure
    });

  } catch (error) {
    console.error("Error in getProductsForDropshipper:", error.message);
    res.status(500).json({ status: false, message:error.message || "Internal server Error..." });
  }
};

// Update product by Id
export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    // update the product and return the updated document
    const updatedProduct = await ProductListing.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: false, message: "product not found." });
    }

    // update the title in the stock
    const stock = await Stock.findOne({ productListingId: updatedProduct._id });
    if (stock) {
      stock.title = updatedProduct.title;
      await stock.save();
    }

    res.status(200).json({
      status: true,
      message: "product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updateProductById:", error.message);
    res.status(500).json({ status: false, message: "Internal server Error." });
  }
};
