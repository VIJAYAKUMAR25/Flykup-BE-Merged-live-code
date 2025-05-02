import Inventory from "../models/inventory.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
import { validateEditOrderData, validatePlaceOrder } from "../utils/helper.js";

export const placeOrder = async (req, res) => {
  try {
    // Validate and sanitize the request body
    const {
      productInfo,
      userInfo,
      orderDetails: { productName, quantity: orderQuantity, color, size },
      orderDate,
      orderTime,
      orderAmount,
      paymentMethod,
      isPaid,
      deliveryAddress,
      sellerAddress
    } = validatePlaceOrder(req);

    const user = await User.findById(userInfo);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    }

    const product = await Product.findById(productInfo);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found." });
    }

    const inventory = await Inventory.findById(product.inventoryInfo);
    if (!inventory) {
      return res
        .status(404)
        .json({ status: false, message: "Inventory not found." });
    }

    // product type and subtract the quantity
    const { productType } = product;

    // function to subtract quantity
    const subtractQuantity = (data, key, value, qty) => {
      const item = data.find((item) => item[key] === value);
      if (item && item.quantity >= qty) {
        item.quantity -= qty;
        return true;
      }
      return false;
    };

    let updatedProduct = false;
    let updatedInventory = false;

    switch (productType) {
      case "quantity":
        if (product.totalQuantity >= orderQuantity) {
          product.totalQuantity -= orderQuantity;
          inventory.totalQuantity -= orderQuantity;
          updatedProduct = true;
          updatedInventory = true;
        } else {
          return res
            .status(400)
            .json({
              status: false,
              message: "Insufficient quantity available.",
            });
        }
        break;

      case "sizeQuantity":
        const productSizeMatch = subtractQuantity(
          product.additionalInfo,
          "size",
          size,
          orderQuantity
        );
        const inventorySizeMatch = subtractQuantity(
          inventory.inventory,
          "size",
          size,
          orderQuantity
        );

        if (productSizeMatch && inventorySizeMatch) {
          product.totalQuantity -= orderQuantity;
          inventory.totalQuantity -= orderQuantity;
          updatedProduct = true;
          updatedInventory = true;
        } else {
          return res
            .status(400)
            .json({
              status: false,
              message: "Insufficient quantity or invalid size.",
            });
        }
        break;

      case "colorQuantity":
        const productColorMatch = subtractQuantity(
          product.additionalInfo,
          "color",
          color,
          orderQuantity
        );
        const inventoryColorMatch = subtractQuantity(
          inventory.inventory,
          "color",
          color,
          orderQuantity
        );

        if (productColorMatch && inventoryColorMatch) {
          product.totalQuantity -= orderQuantity;
          inventory.totalQuantity -= orderQuantity;
          updatedProduct = true;
          updatedInventory = true;
        } else {
          return res
            .status(400)
            .json({
              status: false,
              message: "Insufficient quantity or invalid color.",
            });
        }
        break;

      case "sizeColorQuantity":
        const productSizeColorMatch = product.additionalInfo.some((info) => {
          if (info.color === color) {
            const sizeMatch = info.sizes.find((s) => s.size === size);
            if (sizeMatch && sizeMatch.quantity >= orderQuantity) {
              sizeMatch.quantity -= orderQuantity;
              return true;
            }
          }
          return false;
        });

        const inventorySizeColorMatch = inventory.inventory.some((inv) => {
          if (inv.color === color) {
            const sizeMatch = inv.sizes.find((s) => s.size === size);
            if (sizeMatch && sizeMatch.quantity >= orderQuantity) {
              sizeMatch.quantity -= orderQuantity;
              return true;
            }
          }
          return false;
        });

        if (productSizeColorMatch && inventorySizeColorMatch) {
          product.totalQuantity -= orderQuantity;
          inventory.totalQuantity -= orderQuantity;
          updatedProduct = true;
          updatedInventory = true;
        } else {
          return res
            .status(400)
            .json({
              status: false,
              message:
                "Insufficient quantity or invalid size/color combination.",
            });
        }
        break;

      default:
        return res
          .status(400)
          .json({ status: false, message: "Invalid product type." });
    }

    if (updatedProduct) await product.save();
    if (updatedInventory) await inventory.save();

    const newOrder = new Order({
      productInfo,
      userInfo,
      sellerInfo: product.sellerInfo,
      productImageUrl: product.photoUrl,
      orderDetails: { productName, quantity: orderQuantity, color, size },
      orderDate,
      orderTime,
      orderAmount,
      paymentMethod,
      isPaid,
      deliveryAddress,
      sellerAddress
    });


    newOrder.status = "created";
    await newOrder.save();

    return res.status(201).json({
      status: true,
      message: "Order placed successfully!",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error in placeOrder:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "orders fetched successfully!",
      data: orders || [],
    });
  } catch (error) {
    console.error("Error in getAllOrders:", error.message);

    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getOrdersBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return res.status(404).json({
        status: false,
        message: "seller not found",
      });
    }

    const ordersReceived = await Order.find({ sellerInfo: sellerId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      status: true,
      message: "received orders fetched successfully!",
      data: ordersReceived || [],
    });
  } catch (error) {
    console.error("Error in getOrdersPlacedBySellerId:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error, please try again later.",
    });
  }
};

export const getOrdersByUserId = async ( req,res ) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({ status: false, message:"user not found"});
    }

    const ordersPlaced = await Order.find({ userInfo: userId}).sort({createdAt: -1});

    return res.status(200).json({ status: true, message:"Your orders fetched successfully!", data: ordersPlaced || []})

  } catch (error) {
    console.error("Error in getOrdersByUserId", error.message);
    res.status(500).json({ status: false, message:"Internal server error, please try again later."})
  }
};


// admin panel
export const editOrderByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const data = req.body;

    const validation = validateEditOrderData(data);

    if (!validation.isValid) {
      return res.status(400).json({ status: false, message: "Invalid data", errors: validation.errors });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ status: false, message: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: data },
      { new: true }
    );

    return res.status(200).json({ status: true, message: "Order updated successfully", data: updatedOrder });

  } catch (error) {
    console.error("Error in editOrderByOrderId:", error.message);
    return res.status(500).json({ status: false, message: "Internal Server Error. Please try again later." });
  }
};