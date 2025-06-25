// import {
//   generateUniqueUsername,
//   validateResetPassword,
//   validateSignup,
// } from "../utils/helper.js";
// import User from "../models/user.model.js";
// import { generateAndSaveOtp } from "../utils/otp.js";
// import {
//   sendEmailOtp,
//   sendWelcomeEmail,
//   sendPasswordResetSuccess,
//   sendForgotPasswordEmailOtp,
// } from "../email/send.js";
// import generateTokens from "../utils/generateTokens.js";
// import { COOKIE_OPTIONS, USER_PUBLIC_FIELDS } from "../utils/constants.js";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose"; 
// const jwtSecret = process.env.JWT_SECRET;
// const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

// export const signupUser = async (req, res) => {
//   try {
//     validateSignup(req);
//     const { name, emailId, password } = req.body;
//     const lowerCaseEmail = emailId.toLowerCase().trim();

//     const existingEmail = await User.findOne({ emailId: lowerCaseEmail });
//     if (existingEmail) {
//       return res.status(400).json({
//         status: false,
//         message: "Email is already registered, Please sign in",
//       });
//     }

//     const uniqueUsername = await generateUniqueUsername(name);

//     const newUser = new User({
//       name,
//       emailId: lowerCaseEmail,
//       password,
//       userName: uniqueUsername,
//     });

//     const otp = await generateAndSaveOtp(newUser);

//     const emailSent = await sendEmailOtp(lowerCaseEmail, otp, uniqueUsername);

//     if (!emailSent) {
//       return res.status(500).json({
//         status: false,
//         message: "Failed to send OTP.Try to login.",
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       action: "verifyOtp",
//       message: "OTP sent to your email. Verify to complete signup.",
//     });
//   } catch (error) {
//     console.error("Error in signup:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server Error.",
//     });
//   }
// };

// export const googleAuth = async (req, res) => {
//   try {
//     const { name, emailId } = req.body;
//     const lowerCaseEmail = emailId.toLowerCase().trim();

//     // Try to find an existing user
//     let existingUser = await User.findOne({ emailId: lowerCaseEmail });

//     // If the user doesn't exist, create a new user
//     if (!existingUser) {
//       const uniqueUsername = await generateUniqueUsername(name);

//       existingUser = new User({
//         name,
//         emailId: lowerCaseEmail,
//         isEmailVerified: true,
//         role: "user",
//         oAuth: "google",
//         userName: uniqueUsername,
//       });

//       await existingUser.save();

//       // decoupling welcome email sending
//       sendWelcomeEmail(existingUser.emailId, existingUser.userName).catch(
//         (error) => console.error("Error sending welcome email:", error.message)
//       );
//     }

//     // send user safe fields data on successfull google login
//     const publicUserData = await User.findById(existingUser._id)
//       .select(USER_PUBLIC_FIELDS)
//       .populate({
//         path: "sellerInfo",
//         select: "approvalStatus rejectedReason",
//         options: { strictPopulate: false },
//       });

//     // Generate tokens
//     const { accessToken, refreshToken } = generateTokens(existingUser._id);

//     // Set the token in a cookie
//     res.cookie("accessToken", accessToken, {
//       ...COOKIE_OPTIONS,
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     res.cookie("refreshToken", refreshToken, {
//       ...COOKIE_OPTIONS,
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Google login successful!",
//       data: publicUserData,
//       action: "login",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error. Please try again later.",
//     });
//   }
// };

// export const facebookAuth = async (req, res) => {
//   try {
//     const { name, emailId, accessToken } = req.body;
//     const lowerCaseEmail = emailId.toLowerCase().trim();

//     // Step 1: Validate the Facebook access token with Facebook's API
//     const response = await fetch(
//       `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
//     );
//     const data = await response.json();

//     // console.log(data);

//     if (data.error) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid Facebook token. Please try again.",
//       });
//     }

//     // Step 2: Check if the user exists in the database
//     let existingUser = await User.findOne({ emailId: lowerCaseEmail });
//     // Step 3: Handle login/signup
//     if (!existingUser) {
//       // If the user doesn't exist, create a new user

//       const uniqueUsername = await generateUniqueUsername(name);

//       existingUser = new User({
//         name,
//         emailId: lowerCaseEmail,
//         isEmailVerified: true, // Assume email is verified by Facebook
//         role: "user",
//         oAuth: "facebook",
//         userName: uniqueUsername,
//       });
//       await existingUser.save();

//       // decoupling welcome email sending
//       sendWelcomeEmail(existingUser.emailId, existingUser.userName).catch(
//         (error) => console.error("Error sending welcome email:", error.message)
//       );
//     }

//     // send user safe fields data on successfull facebook login
//     const publicUserData = await User.findById(existingUser._id)
//       .select(USER_PUBLIC_FIELDS)
//       .populate({
//         path: "sellerInfo",
//         select: "approvalStatus rejectedReason",
//         options: { strictPopulate: false },
//       });

//     // Generate tokens
//     const { accessToken: authToken, refreshToken } = generateTokens(
//       existingUser._id
//     );

//     // Set the token in a cookie
//     res.cookie("accessToken", authToken, {
//       ...COOKIE_OPTIONS,
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     res.cookie("refreshToken", refreshToken, {
//       ...COOKIE_OPTIONS,
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Facebook login successful!",
//       data: publicUserData,
//       action: "login",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error. Please try again later.",
//     });
//   }
// };

// export const verifySignupOTP = async (req, res) => {
//   try {
//     const { emailId, otp } = req.body;
//     const lowerCaseEmail = emailId.toLowerCase().trim();

//     const user = await User.findOne({ emailId: lowerCaseEmail });

//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found. Please sign up again.",
//       });
//     }

//     if (
//       user.emailVerificationOtp !== otp ||
//       Date.now() > user.emailVerificationOtpExpiry
//     ) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid OTP.",
//       });
//     }

//     user.isEmailVerified = true;
//     user.role = "user";
//     user.emailVerificationOtp = null;
//     user.emailVerificationOtpExpiry = null;

//     await user.save();

//     // decoupling welcome email sending
//     sendWelcomeEmail(user.emailId, user.userName).catch((error) =>
//       console.error("Error in sendWelcomeEmail:", error.message)
//     );

//     // send user safe fields data on successfull signup
//     const publicUserData = await User.findById(user._id)
//       .select(USER_PUBLIC_FIELDS)
//       .populate({
//         path: "sellerInfo",
//         select: "approvalStatus rejectedReason",
//         options: { strictPopulate: false },
//       });

//     // Generate tokens
//     const { accessToken, refreshToken } = generateTokens(user._id);

//     // Set the token in a cookie
//     res.cookie("accessToken", accessToken, {
//       ...COOKIE_OPTIONS,
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     res.cookie("refreshToken", refreshToken, {
//       ...COOKIE_OPTIONS,
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Email verified. Signup successful!",
//       data: publicUserData,
//       action: "login",
//     });
//   } catch (error) {
//     console.error("Error in verifySignupOTP:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     });
//   }
// };

// export const resendEmailOTP = async (req, res) => {
//   try {
//     const { emailId } = req.body;
//     const lowerCaseEmail = emailId.toLowerCase().trim();

//     const user = await User.findOne({ emailId: lowerCaseEmail });
//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found. Please sign up again.",
//       });
//     }

//     const otp = await generateAndSaveOtp(user);

//     const emailSent = await sendEmailOtp(lowerCaseEmail, otp, user.userName);
//     if (!emailSent) {
//       return res.status(500).json({
//         status: false,
//         message: "Failed to send OTP. Please try again.",
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       message: "A new OTP has been sent to your email.",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     });
//   }
// };

// export const loginUser = async (req, res) => {
//   const { emailId, password } = req.body;

//   const lowerCaseEmail = emailId.toLowerCase().trim();

//   try {
//     const user = await User.findOne({ emailId: lowerCaseEmail });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Invalid credentials!" });
//     }

//     if (user.oAuth) {
//       return res.status(400).json({
//         status: false,
//         message: `Please sign in via ${user.oAuth}`,
//       });
//     }

//     const isValidPassword = await user.comparePassword(password);
//     if (!isValidPassword) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Invalid credentials!" });
//     }

//     if (!user.isEmailVerified) {
//       const otp = await generateAndSaveOtp(user);

//       const emailSent = await sendEmailOtp(lowerCaseEmail, otp, user.userName);
//       if (!emailSent) {
//         return res.status(500).json({
//           status: false,
//           message: "Failed to send OTP. Please try again.",
//         });
//       }

//       return res.status(200).json({
//         status: true,
//         action: "verifyOtp",
//         message:
//           "Your email is not verified. An OTP has been sent to your email. Please verify to proceed.",
//       });
//     }

//     // send user safe fields data on successfull login
//     const publicUserData = await User.findById(user._id)
//       .select(USER_PUBLIC_FIELDS)
//       .populate({
//         path: "sellerInfo",
//         select: "approvalStatus rejectedReason",
//         options: { strictPopulate: false },
//       });

//     // Generate tokens
//     const { accessToken, refreshToken } = generateTokens(user._id);

//     // Set the token in a cookie
//     res.cookie("accessToken", accessToken, {
//       ...COOKIE_OPTIONS,
//       maxAge: 60 * 60 * 1000, // 1 hour
      
//     });

//     res.cookie("refreshToken", refreshToken, {
//       ...COOKIE_OPTIONS,
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     return res.status(200).json({
//       status: true,
//       message: `${publicUserData.userName} logged in successfully!`,
//       data: publicUserData,
//       action: "login",
//     });
//   } catch (error) {
//     console.error("Error in loginUser:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     });
//   }
// };


// export const forgotPasswordRequest = async (req, res) => {
//   const { emailId } = req.body;
//   const lowerCaseEmail = emailId.toLowerCase().trim();

//   try {
//     const user = await User.findOne({ emailId: lowerCaseEmail });
//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found.",
//       });
//     }

//     if (user.oAuth) {
//       return res.status(400).json({
//         status: false,
//         message: `You registered using ${user.oAuth}. Please login using ${user.oAuth}`,
//       });
//     }

//     const otp = await generateAndSaveOtp(user);

//     const emailSent = await sendForgotPasswordEmailOtp(lowerCaseEmail, otp, user.userName);
//     if (!emailSent) {
//       return res.status(500).json({
//         status: false,
//         message: "Failed to send OTP. Please try again.",
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       action: "verifyOtp",
//       data: "An OTP has been sent to your email. Please verify to reset your password.",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// export const verifyForgotPasswordOtp = async (req, res) => {
//   const { emailId, otp } = req.body;
//   const lowerCaseEmail = emailId.toLowerCase().trim();

//   try {
//     const user = await User.findOne({ emailId: lowerCaseEmail });
//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found.",
//       });
//     }

//     if (
//       user.emailVerificationOtp !== otp ||
//       Date.now() > user.emailVerificationOtpExpiry
//     ) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid OTP.",
//       });
//     }

//     user.emailVerificationOtp = null;
//     user.emailVerificationOtpExpiry = null;
//     user.isPasswordResetAllowed = true;
//     await user.save();

//     return res.status(200).json({
//       status: true,
//       action: "resetPassword",
//       data: "OTP verified. You can now reset your password.",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     });
//   }
// };

// export const resetPassword = async (req, res) => {
//   try {
//     // validating data with custom function
//     validateResetPassword(req);

//     const { emailId, confirmPassword } = req.body;
//     const lowerCaseEmail = emailId.toLowerCase().trim();

//     const user = await User.findOne({ emailId: lowerCaseEmail });
//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found",
//       });
//     }

//     if (!user.isPasswordResetAllowed) {
//       return res.status(400).json({
//         status: false,
//         message: "Password reset not allowed. Please verify your identity",
//       });
//     }

//     user.password = confirmPassword;
//     user.isPasswordResetAllowed = false;
//     await user.save();

//     // password reset success email
//     sendPasswordResetSuccess(user.emailId, user.userName).catch((error) =>
//       console.error("Error sending welcome email:", error.message)
//     );

//     return res.status(200).json({
//       status: true,
//       message:
//         "Password reset success. You can now log in with your new password.",
//     });
//   } catch (error) {
//     console.error("Error in resetPassword", error.message);
//     return res.status(400).json({
//       status: false,
//       message: "Internal Server Error.",
//     });
//   }
// };


// // get Authenticated User
// export const getAuthenticatedUser = async (req, res) => {
//   try {
//     const { accessToken } = req.cookies;
//     if (!accessToken) {
//       return res.status(401).json({ status: false, message: "Unauthorized" });
//     }
//     const decoded = jwt.verify(accessToken, jwtSecret);
//     const user = await User.findById(decoded._id)
//       .select(USER_PUBLIC_FIELDS)
//       .populate({
//         path: "sellerInfo",
//         select: "approvalStatus rejectedReason",
//         options: { strictPopulate: false },
//       });
//     if (!user) {
//       return res.status(401).json({ status: false, message: "Unauthorized" });
//     }
//     res
//       .status(200)
//       .json({ status: true, message: "Authorized User!", data: user });
//   } catch (error) {
//     res.status(401).json({ status: false, message: "Unauthorized" });
//   }
// };

// // refresh token api
// export const refreshAccessToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.cookies;
//     if (!refreshToken) {
//       return res.status(401).json({ status: false, message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(refreshToken, jwtRefreshSecret);
//     const newAccessToken = jwt.sign({ _id: decoded._id }, jwtSecret, {
//       expiresIn: "1h",
//     });

//     res.cookie("accessToken", newAccessToken, {
//       ...COOKIE_OPTIONS,
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     return res.status(200).json({ status: true, message: "Token Refreshed", accessToken: newAccessToken });
//   } catch (error) {
//     res.status(401).json({ status: false, message: "Invalid refresh token" });
//   }
// };

// // logout user and clear token
// export const logoutUser = async (req, res) => {
//   try {
//     const user = req.user;

//     // clear cookie from browser
//     res.clearCookie("accessToken", {
//       ...COOKIE_OPTIONS,
//     });

//     // clear cookie from browser
//     res.clearCookie("refreshToken", {
//       ...COOKIE_OPTIONS,
//     });

//     return res.status(200).json({
//       status: true,
//       message: `${user?.userName || "User"} logged out successfully!`,
//     });
//   } catch (error) {
//     console.error("Error in logoutUser:", error.message);
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server error." });
//   }
// };




// // user.controller.js

// // Add categories
// export const addCategories = async (req, res) => {
//   try {
//     const user = req.user;
//     const { categories } = req.body;

//     if (!Array.isArray(categories)) {
//       return res.status(400).json({
//         status: false,
//         message: "Categories should be an array of strings"
//       });
//     }

//     // Add new categories and avoid duplicates
//     categories.forEach(cat => {
//       if (!user.categories.includes(cat)) {
//         user.categories.push(cat);
//       }
//     });

//     await user.save();

//     res.status(200).json({
//       status: true,
//       message: "Categories added successfully",
//       data: user.categories
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: "Internal server error"
//     });
//   }
// };

// // Get categories
// export const getCategories = async (req, res) => {
//   try {
//     const user = req.user;
//     res.status(200).json({
//       status: true,
//       data: user.categories
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: "Internal server error"
//     });
//   }
// };

// // Update categories
// export const updateCategories = async (req, res) => {
//   try {
//     const user = req.user;
//     const { categories } = req.body;

//     if (!Array.isArray(categories)) {
//       return res.status(400).json({
//         status: false,
//         message: "Categories should be an array of strings"
//       });
//     }

//     user.categories = [...new Set(categories)]; // Remove duplicates
//     await user.save();

//     res.status(200).json({
//       status: true,
//       message: "Categories updated successfully",
//       data: user.categories
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: "Internal server error"
//     });
//   }
// };

// // Address Controllers

// // Add Address
// export const addAddress = async (req, res) => {
//   try {
//     const user = req.user;
//     const { name, mobile, line1, city, state, pincode, alternateMobile, line2 } = req.body;

//     // Validate required fields
//     if (!name || !mobile || !line1 || !city || !state || !pincode) {
//       return res.status(400).json({
//         status: false,
//         message: "Missing required fields: name, mobile, line1, city, state, pincode",
//       });
//     }

//     const newAddress = {
//       name,
//       mobile,
//       line1,
//       city,
//       state,
//       pincode,
//       alternateMobile: alternateMobile || null,
//       line2: line2 || "",
//     };

//     user.address.push(newAddress);
//     await user.save();

//     const addedAddress = user.address[user.address.length - 1];

//     return res.status(201).json({
//       status: true,
//       message: "Address added successfully",
//       data: addedAddress,
//     });
//   } catch (error) {
//     console.error("Error adding address:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
//   }
// };

// // Get All Addresses
// export const getAllAddresses = async (req, res) => {
//   try {
//     const user = req.user;
//     return res.status(200).json({
//       status: true,
//       data: user.address,
//     });
//   } catch (error) {
//     console.error("Error getting addresses:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
//   }
// };

// // Get Single Address
// export const getAddressById = async (req, res) => {
//   try {
//     const user = req.user;
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid address ID",
//       });
//     }

//     const address = user.address.id(id);
//     if (!address) {
//       return res.status(404).json({
//         status: false,
//         message: "Address not found",
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       data: address,
//     });
//   } catch (error) {
//     console.error("Error getting address:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
//   }
// };

// // Update Address
// export const updateAddress = async (req, res) => {
//   try {
//     const user = req.user;
//     const { id } = req.params;
//     const updates = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid address ID",
//       });
//     }

//     const address = user.address.id(id);
//     if (!address) {
//       return res.status(404).json({
//         status: false,
//         message: "Address not found",
//       });
//     }

//     // Update allowed fields
//     const allowedUpdates = ["name", "mobile", "alternateMobile", "line1", "line2", "city", "state", "pincode"];
//     Object.keys(updates).forEach((key) => {
//       if (allowedUpdates.includes(key)) {
//         address[key] = updates[key];
//       }
//     });

//     await user.save();

//     return res.status(200).json({
//       status: true,
//       message: "Address updated successfully",
//       data: address,
//     });
//   } catch (error) {
//     console.error("Error updating address:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
//   }
// };

// // Delete Address
// export const deleteAddress = async (req, res) => {
//   try {
//     const user = req.user;
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid address ID",
//       });
//     }

//     const addressIndex = user.address.findIndex(addr => addr._id.toString() === id);
//     if (addressIndex === -1) {
//       return res.status(404).json({
//         status: false,
//         message: "Address not found",
//       });
//     }

//     user.address.splice(addressIndex, 1);
//     await user.save();

//     return res.status(200).json({
//       status: true,
//       message: "Address deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting address:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error",
//     });
//   }
// };


import {
  generateUniqueUsername,
  validateResetPassword,
  validateSignup,
} from "../utils/helper.js";
import User from "../models/user.model.js";
import { generateAndSaveOtp } from "../utils/otp.js";
import {
  sendEmailOtp,
  sendWelcomeEmail,
  sendPasswordResetSuccess,
  sendForgotPasswordEmailOtp,
} from "../email/send.js";
import generateTokens from "../utils/generateTokens.js";
import { USER_PUBLIC_FIELDS } from "../utils/constants.js";
import jwt from 'jsonwebtoken'; // Ensure this import is present
import mongoose from "mongoose";

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

export const signupUser = async (req, res) => {
  try {
    validateSignup(req);
    const { name, emailId, password } = req.body;
    const lowerCaseEmail = emailId.toLowerCase().trim();

    const existingEmail = await User.findOne({ emailId: lowerCaseEmail });
    if (existingEmail) {
      return res.status(400).json({
        status: false,
        message: "Email is already registered, Please sign in",
      });
    }

    const uniqueUsername = await generateUniqueUsername(name);

    const newUser = new User({
      name,
      emailId: lowerCaseEmail,
      password,
      userName: uniqueUsername,
    });

    const otp = await generateAndSaveOtp(newUser);

    const emailSent = await sendEmailOtp(lowerCaseEmail, otp, uniqueUsername);

    if (!emailSent) {
      return res.status(500).json({
        status: false,
        message: "Failed to send OTP.Try to login.",
      });
    }

    return res.status(200).json({
      status: true,
      action: "verifyOtp",
      message: "OTP sent to your email. Verify to complete signup.",
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal server Error.",
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, emailId } = req.body;
    const lowerCaseEmail = emailId.toLowerCase().trim();

    // Try to find an existing user
    let existingUser = await User.findOne({ emailId: lowerCaseEmail });

    // If the user doesn't exist, create a new user
    if (!existingUser) {
      const uniqueUsername = await generateUniqueUsername(name);

      existingUser = new User({
        name,
        emailId: lowerCaseEmail,
        isEmailVerified: true,
        role: "user",
        oAuth: "google",
        userName: uniqueUsername,
      });

      await existingUser.save();

      // decoupling welcome email sending
      sendWelcomeEmail(existingUser.emailId, existingUser.userName).catch(
        (error) => console.error("Error sending welcome email:", error.message)
      );
    }

    // send user safe fields data on successfull google login
    const publicUserData = await User.findById(existingUser._id)
      .select(USER_PUBLIC_FIELDS)
      .populate({
        path: "sellerInfo",
        select: "approvalStatus rejectedReason",
        options: { strictPopulate: false },
      });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(existingUser._id);

    return res.status(200).json({
      status: true,
      message: "Google login successful!",
      data: publicUserData,
      accessToken,
      refreshToken,
      action: "login",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const facebookAuth = async (req, res) => {
  try {
    const { name, emailId, accessToken } = req.body;
    const lowerCaseEmail = emailId.toLowerCase().trim();

    // Step 1: Validate the Facebook access token with Facebook's API
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );
    const data = await response.json();

    // console.log(data);

    if (data.error) {
      return res.status(400).json({
        status: false,
        message: "Invalid Facebook token. Please try again.",
      });
    }

    // Step 2: Check if the user exists in the database
    let existingUser = await User.findOne({ emailId: lowerCaseEmail });
    // Step 3: Handle login/signup
    if (!existingUser) {
      // If the user doesn't exist, create a new user

      const uniqueUsername = await generateUniqueUsername(name);

      existingUser = new User({
        name,
        emailId: lowerCaseEmail,
        isEmailVerified: true, // Assume email is verified by Facebook
        role: "user",
        oAuth: "facebook",
        userName: uniqueUsername,
      });
      await existingUser.save();

      // decoupling welcome email sending
      sendWelcomeEmail(existingUser.emailId, existingUser.userName).catch(
        (error) => console.error("Error sending welcome email:", error.message)
      );
    }

    // send user safe fields data on successfull facebook login
    const publicUserData = await User.findById(existingUser._id)
      .select(USER_PUBLIC_FIELDS)
      .populate({
        path: "sellerInfo",
        select: "approvalStatus rejectedReason",
        options: { strictPopulate: false },
      });

    // Generate tokens
    const { accessToken: authToken, refreshToken } = generateTokens(
      existingUser._id
    );

    return res.status(200).json({
      status: true,
      message: "Facebook login successful!",
      data: publicUserData,
      accessToken: authToken,
      refreshToken,
      action: "login",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const verifySignupOTP = async (req, res) => {
  try {
    const { emailId, otp } = req.body;
    const lowerCaseEmail = emailId.toLowerCase().trim();

    const user = await User.findOne({ emailId: lowerCaseEmail });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found. Please sign up again.",
      });
    }

    if (
      user.emailVerificationOtp !== otp ||
      Date.now() > user.emailVerificationOtpExpiry
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP.",
      });
    }

    user.isEmailVerified = true;
    user.role = "user";
    user.emailVerificationOtp = null;
    user.emailVerificationOtpExpiry = null;

    await user.save();

    // decoupling welcome email sending
    sendWelcomeEmail(user.emailId, user.userName).catch((error) =>
      console.error("Error in sendWelcomeEmail:", error.message)
    );

    // send user safe fields data on successfull signup
    const publicUserData = await User.findById(user._id)
      .select(USER_PUBLIC_FIELDS)
      .populate({
        path: "sellerInfo",
        select: "approvalStatus rejectedReason",
        options: { strictPopulate: false },
      });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    return res.status(200).json({
      status: true,
      message: "Email verified. Signup successful!",
      data: publicUserData,
      accessToken,
      refreshToken,
      action: "login",
    });
  } catch (error) {
    console.error("Error in verifySignupOTP:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const resendEmailOTP = async (req, res) => {
  try {
    const { emailId } = req.body;
    const lowerCaseEmail = emailId.toLowerCase().trim();

    const user = await User.findOne({ emailId: lowerCaseEmail });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found. Please sign up again.",
      });
    }

    const otp = await generateAndSaveOtp(user);

    const emailSent = await sendEmailOtp(lowerCaseEmail, otp, user.userName);
    if (!emailSent) {
      return res.status(500).json({
        status: false,
        message: "Failed to send OTP. Please try again.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "A new OTP has been sent to your email.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const loginUser = async (req, res) => {
  const { emailId, password } = req.body;

  const lowerCaseEmail = emailId.toLowerCase().trim();

  try {
    const user = await User.findOne({ emailId: lowerCaseEmail });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials!" });
    }

    if (user.oAuth) {
      return res.status(400).json({
        status: false,
        message: `Please sign in via ${user.oAuth}`,
      });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials!" });
    }

    if (!user.isEmailVerified) {
      const otp = await generateAndSaveOtp(user);

      const emailSent = await sendEmailOtp(lowerCaseEmail, otp, user.userName);
      if (!emailSent) {
        return res.status(500).json({
          status: false,
          message: "Failed to send OTP. Please try again.",
        });
      }

      return res.status(200).json({
        status: true,
        action: "verifyOtp",
        message:
          "Your email is not verified. An OTP has been sent to your email. Please verify to proceed.",
      });
    }

    // send user safe fields data on successfull login
    const publicUserData = await User.findById(user._id)
      .select(USER_PUBLIC_FIELDS)
      .populate({
        path: "sellerInfo",
        select: "approvalStatus rejectedReason",
        options: { strictPopulate: false },
      });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    return res.status(200).json({
      status: true,
      message: `${publicUserData.userName} logged in successfully!`,
      data: publicUserData,
      accessToken,
      refreshToken,
      action: "login",
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    return res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error. Please try again later.",
    });
  }
};

export const forgotPasswordRequest = async (req, res) => {
  const { emailId } = req.body;
  const lowerCaseEmail = emailId.toLowerCase().trim();

  try {
    const user = await User.findOne({ emailId: lowerCaseEmail });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    if (user.oAuth) {
      return res.status(400).json({
        status: false,
        message: `You registered using ${user.oAuth}. Please login using ${user.oAuth}`,
      });
    }

    const otp = await generateAndSaveOtp(user);

    const emailSent = await sendForgotPasswordEmailOtp(lowerCaseEmail, otp, user.userName);
    if (!emailSent) {
      return res.status(500).json({
        status: false,
        message: "Failed to send OTP. Please try again.",
      });
    }

    return res.status(200).json({
      status: true,
      action: "verifyOtp",
      data: "An OTP has been sent to your email. Please verify to reset your password.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const verifyForgotPasswordOtp = async (req, res) => {
  const { emailId, otp } = req.body;
  const lowerCaseEmail = emailId.toLowerCase().trim();

  try {
    const user = await User.findOne({ emailId: lowerCaseEmail });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    if (
      user.emailVerificationOtp !== otp ||
      Date.now() > user.emailVerificationOtpExpiry
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP.",
      });
    }

    user.emailVerificationOtp = null;
    user.emailVerificationOtpExpiry = null;
    user.isPasswordResetAllowed = true;
    await user.save();

    return res.status(200).json({
      status: true,
      action: "resetPassword",
      data: "OTP verified. You can now reset your password.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // validating data with custom function
    validateResetPassword(req);

    const { emailId, confirmPassword } = req.body;
    const lowerCaseEmail = emailId.toLowerCase().trim();

    const user = await User.findOne({ emailId: lowerCaseEmail });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (!user.isPasswordResetAllowed) {
      return res.status(400).json({
        status: false,
        message: "Password reset not allowed. Please verify your identity",
      });
    }

    user.password = confirmPassword;
    user.isPasswordResetAllowed = false;
    await user.save();

    // password reset success email
    sendPasswordResetSuccess(user.emailId, user.userName).catch((error) =>
      console.error("Error sending welcome email:", error.message)
    );

    return res.status(200).json({
      status: true,
      message:
        "Password reset success. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Error in resetPassword", error.message);
    return res.status(400).json({
      status: false,
      message: "Internal Server Error.",
    });
  }
};

// get Authenticated User
export const getAuthenticatedUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    
    const accessToken = authHeader.split(' ')[1];
    const decoded = jwt.verify(accessToken, jwtSecret);
    const user = await User.findById(decoded._id)
      .select(USER_PUBLIC_FIELDS)
      .populate({
        path: "sellerInfo",
        select: "approvalStatus rejectedReason",
        options: { strictPopulate: false },
      });
    if (!user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    res
      .status(200)
      .json({ status: true, message: "Authorized User!", data: user });
  } catch (error) {
    res.status(401).json({ status: false, message: "Unauthorized" });
  }
};

// refresh token api
// export const refreshAccessToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
//     if (!refreshToken) {
//       return res.status(401).json({ status: false, message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(refreshToken, jwtRefreshSecret);
//     const newAccessToken = jwt.sign({ _id: decoded._id }, jwtSecret, {
//       expiresIn: "1h",
//     });

//     return res.status(200).json({ 
//       status: true, 
//       message: "Token Refreshed", 
//       accessToken: newAccessToken 
//     });
//   } catch (error) {
//     res.status(401).json({ status: false, message: "Invalid refresh token" });
//   }
// };

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ status: false, message: "Refresh token required" });
    }

    // Verify refresh token using the jwt module
    const decoded = jwt.verify(refreshToken, jwtRefreshSecret);
    
    // Check if user exists
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    return res.status(200).json({ 
      status: true, 
      message: "Token Refreshed", 
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: false, message: "Refresh token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ status: false, message: "Invalid refresh token" });
    }
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};  

// logout user
export const logoutUser = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      status: true,
      message: `${user?.userName || "User"} logged out successfully!`,
    });
  } catch (error) {
    console.error("Error in logoutUser:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error." });
  }
};

// Add categories
export const addCategories = async (req, res) => {
  try {
    const user = req.user;
    const { categories } = req.body;

    if (!Array.isArray(categories)) {
      return res.status(400).json({
        status: false,
        message: "Categories should be an array of strings"
      });
    }

    // Add new categories and avoid duplicates
    categories.forEach(cat => {
      if (!user.categories.includes(cat)) {
        user.categories.push(cat);
      }
    });

    await user.save();

    res.status(200).json({
      status: true,
      message: "Categories added successfully",
      data: user.categories
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

// Get categories
export const getCategories = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      status: true,
      data: user.categories
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

// Update categories
export const updateCategories = async (req, res) => {
  try {
    const user = req.user;
    const { categories } = req.body;

    if (!Array.isArray(categories)) {
      return res.status(400).json({
        status: false,
        message: "Categories should be an array of strings"
      });
    }

    user.categories = [...new Set(categories)]; // Remove duplicates
    await user.save();

    res.status(200).json({
      status: true,
      message: "Categories updated successfully",
      data: user.categories
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

// Address Controllers

// Add Address
export const addAddress = async (req, res) => {
  try {
    const user = req.user;
    const { name, mobile, line1, city, state, pincode, alternateMobile, line2 } = req.body;

    // Validate required fields
    if (!name || !mobile || !line1 || !city || !state || !pincode) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields: name, mobile, line1, city, state, pincode",
      });
    }

    const newAddress = {
      name,
      mobile,
      line1,
      city,
      state,
      pincode,
      alternateMobile: alternateMobile || null,
      line2: line2 || "",
    };

    user.address.push(newAddress);
    await user.save();

    const addedAddress = user.address[user.address.length - 1];

    return res.status(201).json({
      status: true,
      message: "Address added successfully",
      data: addedAddress,
    });
  } catch (error) {
    console.error("Error adding address:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Get All Addresses
export const getAllAddresses = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      status: true,
      data: user.address,
    });
  } catch (error) {
    console.error("Error getting addresses:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Get Single Address
export const getAddressById = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid address ID",
      });
    }

    const address = user.address.id(id);
    if (!address) {
      return res.status(404).json({
        status: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: address,
    });
  } catch (error) {
    console.error("Error getting address:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Update Address
export const updateAddress = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid address ID",
      });
    }

    const address = user.address.id(id);
    if (!address) {
      return res.status(404).json({
        status: false,
        message: "Address not found",
      });
    }

    // Update allowed fields
    const allowedUpdates = ["name", "mobile", "alternateMobile", "line1", "line2", "city", "state", "pincode"];
    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        address[key] = updates[key];
      }
    });

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Delete Address
export const deleteAddress = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid address ID",
      });
    }

    const addressIndex = user.address.findIndex(addr => addr._id.toString() === id);
    if (addressIndex === -1) {
      return res.status(404).json({
        status: false,
        message: "Address not found",
      });
    }

    user.address.splice(addressIndex, 1);
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};