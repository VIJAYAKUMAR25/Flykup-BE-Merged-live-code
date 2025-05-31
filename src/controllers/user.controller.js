// import User from "../models/user.model.js";
// import {
//   USER_PUBLIC_FIELDS,
//   SELLER_PUBLIC_FIELDS,
// } from "../utils/constants.js";
// import { sendWelcomeEmail } from "../email/send.js";
// import { generateUniqueUsername } from "../utils/helper.js";

// export const getUserById = async (req, res) => {
//   const { _id } = req.user;
//   try {
//     const user = await User.findById( _id )
//       .select(USER_PUBLIC_FIELDS)
//       .populate({
//         path: "sellerInfo",
//         select: SELLER_PUBLIC_FIELDS,
//       });

//       if (!user) {
//         return res.status(404).json({
//           status: false,
//           message: "User not found",
//         });
//       }

//     return res.status(200).json({
//       status: true,
//       message: "User details fetched successfully!",
//       data: user,
//     });
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     });
//   }
// };

// // create user from admin panel
// export const createUser = async (req, res) => {
//   try {
//     const { name, emailId, password, mobile } = req.body;
//     const lowerCaseEmail = emailId.toLowerCase().trim();

//     const existingUser = await User.findOne({ emailId: lowerCaseEmail });
//     if (existingUser) {
//       return res.status(400).json({
//         status: false,
//         message: "User with this email already exists",
//       });
//     }

//     const uniqueUsername = await generateUniqueUsername(name);

//     const newUser = new User({
//       name,
//       emailId: lowerCaseEmail,
//       password,
//       mobile,
//       userName: uniqueUsername,
//       role: "user",
//       isEmailVerified: true
//     });

//     await newUser.save();

//     // decoupling welcome email sending
//     sendWelcomeEmail(newUser.emailId, newUser.userName).catch((error) =>
//       console.error("Error in sendWelcomeEmail:", error.message)
//     );

//     return res.status(201).json({
//       status: true,
//       message: "User created successfully",
//       data: newUser,
//     });
//   } catch (error) {
//     console.error("Error in createUser:", error.message);

//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// // update user from admin panel
// export const updateUser = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const payload = req.body;
  
//       const user = await User.findById(id);
//       if (!user) {
//         return res.status(404).json({
//           status: false,
//           message: "User not found",
//         });
//       }
  
//       Object.keys(payload).forEach((key) => {
//         user[key] = payload[key];
//       });
  
//       await user.save();
  
//       return res.status(200).json({
//         status: true,
//         message: "User updated successfully",
//         data: user,
//       });
//     } catch (error) {
//       console.error("Error in updateUser:", error.message);
  
//       return res.status(500).json({
//         status: false,
//         message: "Internal Server Error",
//       });
//     }
//   };
  

// export const toggleUserAccessAdmin = async (req, res) => {
//   const { id } = req.params;
//   const { accessAllowed } = req.body;

//   try {
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         status: false,
//         message: "User not found",
//       });
//     }

//     user.accessAllowed = accessAllowed;
//     await user.save();

//     return res.status(200).json({
//       status: true,
//       message: `user access is ${accessAllowed ? "enabled" : "disabled"}`,
//     });
//   } catch (error) {
//     console.error("Error in toggleUserAccessAdmin:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     });
//   }
// };

// //  Delete user from admin end
// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ status: false, message: "User not found" });
//     }

//     await user.deleteOne();

//     return res
//       .status(200)
//       .json({ status: true, data: "User deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ status: false, message: error.message });
//   }
// };

// //  Get all users from admin end
// export const getAllUsersAdmin = async (req, res) => {
//   let page = parseInt(req.query.page) || 1;
//   let limit = parseInt(req.query.limit) || 50;
//   limit = limit > 50 ? 50 : limit;
//   let skip = (page - 1) * limit;

//   // search query
//   const searchQuery = req.query.search || "";
//   let searchFilter = {};

//   if (searchQuery) {
//     searchFilter = {
//       $or: [
//         { emailId: { $regex: searchQuery, $options: "i" } },
//         { mobile: { $regex: searchQuery } },
//         { userName: { $regex: searchQuery, $options: "i" } },
//       ],
//     };
//   }
//   try {
//     const filter = {
//       role: "user",
//       ...searchFilter,
//     };

//     const totalCount = await User.countDocuments(filter);
//     const users = await User.find(filter)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     return res
//       .status(200)
//       .json({
//         status: true,
//         message: "all users fetched successfully!",
//         data: users || [],
//         totalCount,
//       });
//   } catch (error) {
//     console.error("Error in getAllUsersAdmin:", error.message);
//     return res
//       .status(500)
//       .json({
//         status: false,
//         message: "Internal server error. Please try again later.",
//       });
//   }
// };

// //  Get user by id from admin end
// export const getUserByIdAdmin = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   return res.status(200).json({ status: true, data: user });
// };


import User from "../models/user.model.js";
import {
  USER_PUBLIC_FIELDS,
  SELLER_PUBLIC_FIELDS,
} from "../utils/constants.js";
import { sendWelcomeEmail } from "../email/send.js";
import { generateUniqueUsername } from "../utils/helper.js";

export const getUserById = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById( _id )
      .select(USER_PUBLIC_FIELDS)
      .populate({
        path: "sellerInfo",
        select: SELLER_PUBLIC_FIELDS,
      });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

    return res.status(200).json({
      status: true,
      message: "User details fetched successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error in getUserById:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// one fcm token per user
// export const updateFcmToken = async ( req, res ) => {

//   const { fcmToken } = req.body;
//   const userId = req?.user?._id;

//   if (!fcmToken) {
//     return res.status(400).json({ status: false, message: 'FCM token is required' });
//   }

//   try {
//     const user = await User.findById(userId);

//     if(!user){
//       return res.status(404).json({ status: false, message: 'user not found'})
//     }

//       user.fcmToken = fcmToken;
//       await user.save();
    

//    return res.json({ status: true, message: 'FCM token added successfully!', token: user.fcmToken})

//   } catch (error) {
//     console.error('Error updating FCM token:', error);
//     res.status(500).json({ status: false, message: 'Server error updating token' });
//   }
// }

// multiple fcm token per user
export const updateFcmToken = async ( req, res ) => {
  const { fcmToken } = req.body;
  const userId = req.user?._id;

  if(!fcmToken){
    return res.status(400).json({ status: false, message: "FCM token is required."})
  }

  try {
    const result = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { fcmTokens: fcmToken.trim() }},
      { new: true, select: 'fcmTokens'}
    );

    if(!result){
      return res.status(404).josn({ status: false, message: 'user not found.'})
    }

    return res.json({
      status: true,
      message: 'FCM token added successfully!',
      tokens: result.fcmTokens
    })
  } catch (error) {
    console.error('Error updating FCM token:', error);
    return res.status(500).json({ status: false, message: "Internal server Error."})
  }
}

// create user from admin panel
export const createUser = async (req, res) => {
  try {
    const { name, emailId, password, mobile } = req.body;
    const lowerCaseEmail = emailId.toLowerCase().trim();

    const existingUser = await User.findOne({ emailId: lowerCaseEmail });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User with this email already exists",
      });
    }

    const uniqueUsername = await generateUniqueUsername(name);

    const newUser = new User({
      name,
      emailId: lowerCaseEmail,
      password,
      mobile,
      userName: uniqueUsername,
      role: "user",
      isEmailVerified: true
    });

    await newUser.save();

    // decoupling welcome email sending
    sendWelcomeEmail(newUser.emailId, newUser.userName).catch((error) =>
      console.error("Error in sendWelcomeEmail:", error.message)
    );

    return res.status(201).json({
      status: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in createUser:", error.message);

    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

// update user from admin panel
export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
  
      Object.keys(payload).forEach((key) => {
        user[key] = payload[key];
      });
  
      await user.save();
  
      return res.status(200).json({
        status: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error in updateUser:", error.message);
  
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };
  

export const toggleUserAccessAdmin = async (req, res) => {
  const { id } = req.params;
  const { accessAllowed } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    user.accessAllowed = accessAllowed;
    await user.save();

    return res.status(200).json({
      status: true,
      message: `user access is ${accessAllowed ? "enabled" : "disabled"}`,
    });
  } catch (error) {
    console.error("Error in toggleUserAccessAdmin:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

//  Delete user from admin end
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    await user.deleteOne();

    return res
      .status(200)
      .json({ status: true, data: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

//  Get all users from admin end
export const getAllUsersAdmin = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 50;
  limit = limit > 50 ? 50 : limit;
  let skip = (page - 1) * limit;

  // search query
  const searchQuery = req.query.search || "";
  let searchFilter = {};

  if (searchQuery) {
    searchFilter = {
      $or: [
        { emailId: { $regex: searchQuery, $options: "i" } },
        { mobile: { $regex: searchQuery } },
        { userName: { $regex: searchQuery, $options: "i" } },
      ],
    };
  }
  try {
    const filter = {
      role: "user",
      ...searchFilter,
    };

    const totalCount = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res
      .status(200)
      .json({
        status: true,
        message: "all users fetched successfully!",
        data: users || [],
        totalCount,
      });
  } catch (error) {
    console.error("Error in getAllUsersAdmin:", error.message);
    return res
      .status(500)
      .json({
        status: false,
        message: "Internal server error. Please try again later.",
      });
  }
};

//  Get user by id from admin end
export const getUserByIdAdmin = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.status(200).json({ status: true, data: user });
};

