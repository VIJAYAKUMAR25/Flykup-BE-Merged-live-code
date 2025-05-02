import User from "../models/user.model.js";
import {
  applicationAcceptedSES,
  applicationReceivedSES,
  applicationRejectedSES,
  otpSES,
  passwordChangedSES,
  welcomeSES,
} from "../ses/sendEmail.js";
import { validateAddress } from "../utils/helper.js";

export const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const addressData = req.body;

    // sanitizing data from req.body
    const sanitizedAddress = validateAddress(addressData);

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    }

    user.address.push(sanitizedAddress);
    await user.save();

    return res.status(201).json({
      status: true,
      message: "Address added successfully!",
      data: sanitizedAddress,
    });
  } catch (error) {
    console.error("Error in addAddress:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getAddressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("address");
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    }

    return res.status(200).json({
      status: true,
      message: "Addresses retrieved successfully!",
      data: user.address || [],
    });
  } catch (error) {
    console.error("Error in getAllAddresses:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updatedAddressData = req.body;

    const sanitizedAddress = validateAddress(updatedAddressData);

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    }

    // Find the index of the address to update
    const addressIndex = user.address.findIndex(
      (addr) => addr._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res
        .status(404)
        .json({ status: false, message: "Address not found." });
    }

    // Update the address
    user.address[addressIndex] = {
      ...user.address[addressIndex].toObject(),
      ...sanitizedAddress,
    };
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Address updated successfully!",
      data: user.address[addressIndex],
    });
  } catch (error) {
    console.error("Error in editAddress:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    }

    // Filter out the address to delete
    const initialLength = user.address.length;
    user.address = user.address.filter(
      (addr) => addr._id.toString() !== addressId
    );

    if (user.address.length === initialLength) {
      return res
        .status(404)
        .json({ status: false, message: "Address not found." });
    }

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Address deleted successfully!",
    });
  } catch (error) {
    console.error("Error in deleteAddress:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getSingleAddressById = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findById(userId).select("address");
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found." });
    }

    const address = user.address.find(
      (addr) => addr._id.toString() === addressId
    );
    if (!address) {
      return res
        .status(404)
        .json({ status: false, message: "Address not found." });
    }

    return res.status(200).json({
      status: true,
      message: "Address retrieved successfully!",
      data: address,
    });
  } catch (error) {
    console.error("Error in getSingleAddressById:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const testAmazonSes = async (req, res) => {
  try {
    // otpSES("kpushparaj18@gmail.com", "pk").catch((error) =>
    //   console.error("Error in otpSES:", error.message)
    // );
    // passwordChangedSES("kpushparaj18@gmail.com", "pk").catch((error) =>
    //   console.error("Error in passwordChangedSES:", error.message)
    // );
    // welcomeSES("kpushparaj18@gmail.com", "pk").catch((error) =>
    //   console.error("Error in welcomeSES:", error.message)
    // );
    applicationReceivedSES("kpushparaj18@gmail.com", "pk").catch((error) =>
      console.error("Error in applicationReceivedSES:", error.message)
    );
    // applicationAcceptedSES("kpushparaj18@gmail.com", "pk").catch((error) =>
    //   console.error("Error in applicationAcceptedSES:", error.message)
    // );
    // applicationRejectedSES(
    //   "kpushparaj18@gmail.com",
    //   "pk",
    //   "Incorrect aadhar details"
    // ).catch((error) =>
    //   console.error("Error in applicationRejectedSES:", error.message)
    // );

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);

    if (error.name === "MessageRejected") {
      res.status(400).json({
        message: "Email was rejected by SES",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};
