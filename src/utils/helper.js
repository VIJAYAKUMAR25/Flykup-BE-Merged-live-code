import validator from "validator";
import User from "../models/user.model.js";
import { RESERVED_USERNAMES } from "./constants.js";

export const validateSignup = (req) => {
  const { name, emailId, password } = req.body;

  if (!name) {
    throw new Error("Please fill the fields !");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter strong password");
  }
};

export const validateResetPassword = (req) => {
  const { emailId, newPassword, confirmPassword } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new Error("please enter strong password");
  } else if (newPassword !== confirmPassword) {
    throw new Error("password mismatch!");
  }
};

export const isReservedUsername = (username) => {
  return RESERVED_USERNAMES.includes(username.toLowerCase());
};

export const generateUniqueUsername = async (baseUsername) => {
  let username = baseUsername.trim().toLowerCase().replace(/\s+/g, "_");
  let isUnique = false;

  if (isReservedUsername(username)) {
    username = `${username}_${Math.floor(Math.random() * 1000)}`;
  }

  while (!isUnique) {
    const existingUser = await User.findOne({ userName: username });
    if (!existingUser && !isReservedUsername(username)) {
      isUnique = true;
    } else {
      username = `${username}_${Math.floor(Math.random() * 1000)}`;
    }
  }

  return username;
};

export const validatePlaceOrder = (req) => {
  const {
    productInfo,
    userInfo,
    orderDetails,
    orderDate,
    orderTime,
    orderAmount,
    paymentMethod,
    isPaid,
    deliveryAddress,
    sellerAddress,
  } = req.body;

  if (
    productInfo == null ||
    userInfo == null ||
    typeof orderDetails !== "object" ||
    orderDate == null ||
    orderTime == null ||
    orderAmount == null ||
    paymentMethod == null ||
    isPaid == null ||
    typeof deliveryAddress !== "object"
  ) {
    throw new Error("All fields are required.");
  }

  if (!orderDetails.productName || !orderDetails.quantity) {
    throw new Error("orderDetails must include productName and quantity.");
  }
  if (typeof orderDetails.quantity !== "number" || orderDetails.quantity <= 0) {
    throw new Error("quantity must be a positive number.");
  }

  const parsedOrderAmount = parseFloat(orderAmount);
  if (isNaN(parsedOrderAmount)) {
    throw new Error("Invalid orderAmount. It must be a number.");
  }

  const allowedPaymentMethods = ["cash", "online"];
  if (!allowedPaymentMethods.includes(paymentMethod.toLowerCase())) {
    throw new Error(
      `Invalid payment method. Allowed values are ${allowedPaymentMethods.join(
        ", "
      )}.`
    );
  }

  if (
    !deliveryAddress.name ||
    !deliveryAddress.mobile ||
    !deliveryAddress.line1 ||
    !deliveryAddress.city ||
    !deliveryAddress.state ||
    !deliveryAddress.pincode
  ) {
    throw new Error(
      "Address fields (name, mobile, line1, city, state, pincode) are required."
    );
  }
  if (deliveryAddress.pincode.length !== 6) {
    throw new Error("Pincode must be exactly 6 digits.");
  }

  orderDetails.color = orderDetails.color ? orderDetails.color.trim() : null;
  orderDetails.size = orderDetails.size ? orderDetails.size.trim() : null;

  return {
    productInfo,
    userInfo,
    orderDetails: {
      productName: orderDetails.productName.trim(),
      quantity: orderDetails.quantity,
      color: orderDetails.color,
      size: orderDetails.size,
    },
    orderDate,
    orderTime,
    orderAmount: parsedOrderAmount,
    paymentMethod: paymentMethod.toLowerCase(),
    isPaid,
    deliveryAddress: {
      name: deliveryAddress.name.trim(),
      mobile: deliveryAddress.mobile.trim(),
      alternateMobile: deliveryAddress.alternateMobile
        ? deliveryAddress.alternateMobile.trim()
        : null,
      line1: deliveryAddress.line1.trim(),
      line2: deliveryAddress.line2 ? deliveryAddress.line2.trim() : "",
      city: deliveryAddress.city.trim(),
      state: deliveryAddress.state.trim(),
      pincode: deliveryAddress.pincode.trim(),
    },
    sellerAddress: {
      name: sellerAddress.name.trim(),
      mobile: sellerAddress.mobile.trim(),
      alternateMobile: sellerAddress.alternateMobile
        ? sellerAddress.alternateMobile.trim()
        : null,
      line1: sellerAddress.line1.trim(),
      line2: sellerAddress.line2 ? sellerAddress.line2.trim() : "",
      city: sellerAddress.city.trim(),
      state: sellerAddress.state.trim(),
      pincode: sellerAddress.pincode.trim(),
    },
  };
};

export const validateAddress = (addressData) => {
  const { name, mobile, alternateMobile, line1, line2, city, state, pincode } =
    addressData;

  if (!name || !mobile || !line1 || !city || !state || !pincode) {
    throw new Error(
      "Address must include name, mobile, line1, city, state, and pincode."
    );
  }

  if (!/^\d{10}$|^\d{12}$/.test(mobile)) {
    throw new Error(
      "Mobile number must be either 10 digits or 12 digits (with country code)."
    );
  }

  if (!/^\d{6}$/.test(pincode)) {
    throw new Error("Pincode must be exactly 6 digits.");
  }

  return {
    name: name.trim(),
    mobile: mobile.trim(),
    alternateMobile: alternateMobile ? alternateMobile.trim() : null,
    line1: line1.trim(),
    line2: line2 ? line2.trim() : "",
    city: city.trim(),
    state: state.trim(),
    pincode: pincode.trim(),
  };
};

export const validateEditOrderData = (updateData) => {
  const errors = [];

  const validStatusValues = [
    "created",
    "live",
    "dispatch",
    "delivered",
    "canceled",
    "returned",
    "rescheduled",
  ];
  if (updateData.status && !validStatusValues.includes(updateData.status)) {
    errors.push(
      `Invalid status value: ${
        updateData.status
      }. Valid values are: ${validStatusValues.join(", ")}`
    );
  }

  if (
    updateData.deliveryDate !== undefined &&
    typeof updateData.deliveryDate !== "string"
  ) {
    errors.push("deliveryDate must be a string or not provided.");
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  return { isValid: true };
};

export const generateStreamName = (name = "seller") => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 6);
  return `${slug}-${timestamp}-${randomStr}`;
};

export const flattenPopulatedProducts = (productsArray) =>
  productsArray.map(({ productId, ...rest }) => {
    const { _id, ...productDetails } = productId;
    return { productId: _id, ...productDetails, ...rest };
});

export const createSearchRegex = ( term ) => {
  const escapedTerm = term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  return new RegExp(escapedTerm, "i");
}
