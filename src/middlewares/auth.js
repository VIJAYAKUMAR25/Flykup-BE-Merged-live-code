// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';
// import Seller from '../models/seller.model.js';
// import Dropshipper from '../models/shipper.model.js'; // Import the Dropshipper model (adjust path)
// import Show from '../models/shows.model.js';
// import mongoose from 'mongoose';
// import ShoppableVideo from '../models/shoppableVideo.model.js';

// const jwt_secret = process.env.JWT_SECRET;


// export const userAuth = async (req, res, next) => {
//     try {
//         const { accessToken } = req.cookies;
//         if (!accessToken) {
//             return res.status(401).json({ status: false, message: "Unauthorized" });
//         }

//         const decoded = jwt.verify(accessToken, jwt_secret);
//         const { _id } = decoded;

//         const user = await User.findById(_id);

//         if (!user || user.role === null) {
//             return res.status(401).json({ status: false, message: "Unauthorized" });
//         }

//         req.user = user;

//         next();
//     } catch (error) {
//         res.status(500).json({ status: false, message: "Internal Server Error" });
//     }
// };

// export const sellerAuth = async (req, res, next) => {
//     try {
//         const { accessToken } = req.cookies;

//         if (!accessToken) {
//             return res.status(401).json({ status: false, message: "Unauthorized" });
//         }

//         const decoded = jwt.verify(accessToken, jwt_secret);
//         const user = await User.findById(decoded._id);

//         if (!user || user.role !== 'seller') {
//             return res.status(401).json({ status: false, message: "Unauthorized" });
//         }

//         const seller = await Seller.findOne({ userInfo: user._id });

//         if (!seller) {
//             return res.status(401).json({ status: false, message: "Unauthorized" });
//         }

//         req.user = user;
//         req.seller = seller;

//         next();
//     } catch (error) {
//         res.status(400).json({ status: false, message: "Internal Server Error." })
//     }
// }

// export const isDropshipper = async (req, res, next) => {
//     try {
//         // 1. Get token from cookies
//         const { accessToken } = req.cookies;

//         if (!accessToken) {
//             // No token provided
//             return res.status(401).json({ status: false, message: "Unauthorized: No token provided." });
//         }

//         // 2. Verify the token
//         let decoded;
//         try {
//             decoded = jwt.verify(accessToken, jwt_secret);
//         } catch (err) {
//             // Token verification failed (expired, invalid, etc.)
//             return res.status(401).json({ status: false, message: `Unauthorized: ${err.message || 'Invalid token.'}` });
//         }


//         // 3. Find user by ID from token
//         const user = await User.findById(decoded._id);

//         // 4. Check if user exists and has the 'dropshipper' role
//         if (!user || user.role !== 'dropshipper') {
//             // User not found or role mismatch
//             return res.status(403).json({ status: false, message: "Forbidden: Access denied for this role." });
//             // Use 403 Forbidden as they might be a valid user, just not a dropshipper
//         }

//         // 5. Find the associated Dropshipper profile
//         const dropshipper = await Dropshipper.findOne({ userInfo: user._id });

//         // 6. Check if the Dropshipper profile exists
//         if (!dropshipper) {
//             // Role is 'dropshipper' but profile doesn't exist (data inconsistency or setup issue)
//             return res.status(403).json({ status: false, message: "Forbidden: Dropshipper profile not found." });
//         }

//         // 7. Check if the Dropshipper profile is approved
//         if (dropshipper.approvalStatus !== 'approved') {
//             // Profile exists but is not approved (pending, rejected, suspended)
//             return res.status(403).json({
//                 status: false,
//                 message: `Forbidden: Dropshipper account is not approved. Status: ${dropshipper.approvalStatus}`
//             });
//         }

//         // 8. Attach user and dropshipper objects to the request for downstream use
//         req.user = user;
//         req.dropshipper = dropshipper;

//         // 9. Proceed to the next middleware or route handler
//         next();

//     } catch (error) {
//         // Catch any unexpected errors during the process
//         console.error("Error in isDropshipper middleware:", error); // Log the actual error
//         res.status(500).json({ status: false, message: "Internal Server Error." });
//     }
// };
// export const hostAuth = async ( req, res, next ) => {
//     try {
//         // 1) check token
//         const { accessToken } = req.cookies;
//         if ( !accessToken ){
//             return res.status(401).json( { status: false, message: 'unauthorized' });
//         }
//         // 2) verify
//         let payload;
//         try {
//             payload = jwt.verify(accessToken, jwt_secret);
//         } catch (error) {
//             return res.status(401).json({ status: false, message: `Unauthorized: ${error.message}`});
//         }

//         // fetch user & seller , dropshipper fields
//         const user = await User.findById(payload._id)
//             .populate('sellerInfo')
//             .populate('dropshipperInfo');

//         if( !user || !user.role ) {
//             return res.status(401).json( { status: false, message: "unauthorized" } );
//         }

//         // figure out hostId based on role 
//         let hostId, hostType, hostDoc;
//         if( user.role === 'seller' && user.sellerInfo ) {
//             hostId = user.sellerInfo._id;
//             hostType = 'seller';
//             hostDoc = user.sellerInfo;
//         } else if ( user.role === 'dropshipper' && user.dropshipperInfo ){
//             hostId = user.dropshipperInfo._id;
//             hostType = 'dropshipper';
//             hostDoc = user.dropshipperInfo;
//         } else {
//             return res.status(403).json({
//                 status: false,
//                 message: `Forbidden: no ${ user.role } profile found`
//             });
//         }

//         // attach to req
//         req.user = user;
//         req.hostId = hostId;
//         req.hostType = hostType;
//         req.hostDoc = hostDoc;

//         next();
//     } catch (error) {
//         console.error("hostAuth error:", error);
//         res.status(500).json({ status: false, message: "Internal Server Error" });
//     }
// }

// // --- CORRECTED Middleware: canHostShow ---
// // Checks if user is either an approved Seller or an approved Dropshipper
// // Attaches req.showHost (the Seller or Dropshipper document) and req.showHostModel ('sellers' or 'dropshippers')

// export const canHostShow = async (req, res, next) => {
//     try {
//         // First, ensure user is authenticated (using your existing 'protect' logic)
//         const { accessToken } = req.cookies;
//         if (!accessToken) {
//             return res.status(401).json({ status: false, message: "Unauthorized: No token provided." });
//         }
//         let decoded;
//         try {
//             decoded = jwt.verify(accessToken, jwt_secret);
//         } catch (err) {
//             return res.status(401).json({ status: false, message: `Unauthorized: ${err.message || 'Invalid token.'}` });
//         }
//         const user = await User.findById(decoded._id);
//         if (!user) {
//             return res.status(401).json({ status: false, message: "Unauthorized: User not found." });
//         }
//         req.user = user; // Attach user for consistency


//         // Now check if they are an approved Seller or Dropshipper
//         if (user.role === 'seller' && user.sellerInfo) {
//             const seller = await Seller.findById(user.sellerInfo);
//             if (seller && seller.approvalStatus === 'approved') {
//                 // === FIX: Use req.showHost instead of req.host ===
//                 req.showHost = seller; // Attach the seller document
//                 req.showHostModel = 'sellers';
//                 // ==================================================
//                 return next(); // Allowed as Seller
//             }
//         }

//         if (user.role === 'dropshipper' && user.dropshipperInfo) {
//             // Populate connected seller IDs needed for validation later
//             const dropshipper = await Dropshipper.findById(user.dropshipperInfo)
//                 .populate({
//                     path: 'connectedSellers',
//                     match: { status: 'approved' }, // Only populate approved connections
//                     select: 'sellerId -_id' // Select only the sellerId from approved connections
//                 });

//             if (dropshipper && dropshipper.approvalStatus === 'approved') {
//                 // Pre-process connected seller IDs for faster lookup later
//                 // Ensure connectedSellers is an array even if populate returns null/empty
//                 const approvedConnections = dropshipper.connectedSellers || [];
//                 dropshipper.approvedSellerIds = approvedConnections.map(conn => conn.sellerId); // Store just the IDs

//                 // === FIX: Use req.showHost instead of req.host ===
//                 req.showHost = dropshipper; // Attach the dropshipper document
//                 req.showHostModel = 'dropshippers';
//                 // ==================================================
//                 return next(); // Allowed as Dropshipper
//             }
//         }

//         // If neither role is valid or approved
//         return res.status(403).json({ status: false, message: "Forbidden: User must be an approved Seller or Dropshipper to host shows." });

//     } catch (error) {
//         console.error("Error in canHostShow middleware:", error);
//         res.status(500).json({ status: false, message: "Internal Server Error." });
//     }
// };


// // --- CORRECTED Middleware: isHost ---
// // Checks if the authenticated user's ID matches the 'userInfo' field of the host (Seller/Dropshipper) of the specific show requested via req.params.id
// // Assumes 'protect' middleware has run before to attach req.user
// export const isHost = async (req, res, next) => {
//     try {
//         const showId = req.params.id; // Get show ID from route parameter
//         // console.log('--- isHost Middleware ---'); // Log marker
//         // console.log('Received showId param:', showId); // Log the ID
//         const loggedInUserId = req.user?._id; // Get logged-in user's ID from 'protect' middleware

//         if (!loggedInUserId) {
//             // Should be caught by 'protect', but double-check
//             return res.status(401).json({ status: false, message: "Unauthorized: User not authenticated." });
//         }
//         if (!mongoose.Types.ObjectId.isValid(showId)) {
//             return res.status(400).json({ status: false, message: "Invalid Show ID format." });
//         }

//         // Find the show and populate the 'host' field, selecting only the 'userInfo' from the referenced Seller/Dropshipper
//         const show = await Show.findById(showId)
//             .select('host hostModel') // Select host ID and model type for reference
//             .populate({
//                 path: 'host',          // Populate the 'host' field
//                 select: 'userInfo'     // Only retrieve the 'userInfo' field from the host document (Seller or Dropshipper)
//             });

//         if (!show) {
//             return res.status(404).json({ status: false, message: "Show not found" });
//         }

//         // --- Core Logic Change ---
//         // Check if the show has a host, if the host was populated correctly,
//         // if the host has a userInfo field, and if that userInfo ID matches the logged-in user's ID.
//         if (!show.host || !show.host.userInfo || !show.host.userInfo.equals(loggedInUserId)) {
//             // Log for debugging if needed:
//             // console.log(`Auth Fail: Show ${showId}, Host UserInfo: ${show.host?.userInfo}, LoggedIn User: ${loggedInUserId}`);
//             return res.status(403).json({ status: false, message: "Forbidden: You are not authorized to modify this show." });
//         }
//         // --- End Core Logic Change ---


//         // User's ID matches the host's userInfo ID, allow proceeding
//         next();

//     } catch (error) {
//         console.error("Error in isHost middleware:", error);
//         res.status(500).json({ status: false, message: "Internal Server Error." });
//     }
// };

// // --- NEW Middleware: isVideoHost ---
// // Checks if the authenticated user owns the specific ShoppableVideo requested via req.params.id
// // Assumes 'protect' middleware has run before to attach req.user
// export const isVideoHost = async (req, res, next) => {
//     try {
//         const videoId = req.params.id; // Get video ID from route parameter
//         const loggedInUserId = req.user?._id; // Get logged-in user's ID from 'protect' middleware

//         if (!loggedInUserId) {
//             return res.status(401).json({ status: false, message: "Unauthorized: User not authenticated." });
//         }
//         if (!mongoose.Types.ObjectId.isValid(videoId)) {
//             return res.status(400).json({ status: false, message: "Invalid Video ID format." });
//         }

//         // Find the video and populate the 'host' field, selecting only the 'userInfo'
//         const video = await ShoppableVideo.findById(videoId)
//             .select('host hostModel') // Select host ID and model type for reference
//             .populate({
//                 path: 'host',          // Populate the 'host' field
//                 select: 'userInfo'     // Only retrieve the 'userInfo' field from the host document
//             });

//         if (!video) {
//             return res.status(404).json({ status: false, message: "Shoppable video not found." });
//         }

//         // Check if the video has a host, if the host was populated correctly,
//         // if the host has a userInfo field, and if that userInfo ID matches the logged-in user's ID.
//         if (!video.host || !video.host.userInfo || !video.host.userInfo.equals(loggedInUserId)) {
//             // Log for debugging if needed:
//             // console.log(`Auth Fail: Video ${videoId}, Host UserInfo: ${video.host?.userInfo}, LoggedIn User: ${loggedInUserId}`);
//             return res.status(403).json({ status: false, message: "Forbidden: You are not authorized to modify this video." });
//         }

//         // User's ID matches the host's userInfo ID, allow proceeding
//         // Optionally attach the video or host info to req if needed by the controller
//         // req.video = video; // Example
//         next();

//     } catch (error) {
//         console.error("Error in isVideoHost middleware:", error);
//         res.status(500).json({ status: false, message: "Internal Server Error." });
//     }
// };

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Seller from '../models/seller.model.js';
import Dropshipper from '../models/shipper.model.js'; 
import Show from '../models/shows.model.js';
import mongoose from 'mongoose';
import ShoppableVideo from '../models/shoppableVideo.model.js';
import axios from 'axios';

const jwt_secret = process.env.JWT_SECRET;
const jwt_refresh_secret = process.env.JWT_REFRESH_SECRET;

// Cache setup with TTL (5 minutes)
const userCache = new Map();
const sellerCache = new Map();
const dropshipperCache = new Map();

const CACHE_TTL = 300000; // 5 minutes in ms

// Cache helper functions
const getCached = (cache, key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  
  // Check expiration
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
};

const setCached = (cache, key, data, ttl = CACHE_TTL) => {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttl
  });
};

// Token refresh helper
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/refresh-token`,
      { refreshToken }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

// Token handling middleware
export const handleTokenRefresh = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) return next();
  
  const accessToken = authHeader.split(' ')[1];
  const refreshToken = req.cookies.refreshToken || req.headers['x-refresh-token'];

  try {
    // Verify normally first
    jwt.verify(accessToken, jwt_secret);
    return next();
  } catch (error) {
    // Only handle expiration errors
    if (error.name !== 'TokenExpiredError') {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }

    if (!refreshToken) {
      return res.status(401).json({ 
        status: false, 
        message: "Token expired and no refresh token available" 
      });
    }

    try {
      const newTokens = await refreshAccessToken(refreshToken);
      
      // Update tokens
      res.set('New-Access-Token', newTokens.accessToken);
      res.cookie('refreshToken', newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });
      
      req.newTokens = newTokens;
      return next();
    } catch (refreshError) {
      return res.status(401).json({ 
        status: false, 
        message: "Token refresh failed",
        code: "REFRESH_FAILED"
      });
    }
  }
};

// Common token verification and user fetching
const verifyTokenAndGetUser = async (req) => {
  const accessToken = req.newTokens?.accessToken || 
                     req.headers.authorization?.split(' ')[1];
  
  if (!accessToken) return null;
  
  const decoded = jwt.verify(accessToken, jwt_secret);
  const cacheKey = `user-${decoded._id}`;
  
  // Check cache first
  let user = getCached(userCache, cacheKey);
  if (user) return user;
  
  user = await User.findById(decoded._id);
  if (user) setCached(userCache, cacheKey, user);
  
  return user;
};

// Base authentication middleware
export const userAuth = async (req, res, next) => {
  try {
    const user = await verifyTokenAndGetUser(req);
    
    if (!user || user.role === null) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    req.user = user;
    if (req.newTokens) {
      req.user.accessToken = req.newTokens.accessToken;
      req.user.refreshToken = req.newTokens.refreshToken;
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: false, message: "Token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Seller authentication with approval validation
export const sellerAuth = async (req, res, next) => {
  try {
    const user = await verifyTokenAndGetUser(req);
    if (!user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    // Check role
    if (user.role !== 'seller') {
      return res.status(403).json({ 
        status: false, 
        message: "User is not a seller",
        code: "NOT_SELLER"
      });
    }

    // Check seller profile
    const cacheKey = `seller-${user._id}`;
    let seller = getCached(sellerCache, cacheKey);
    
    if (!seller) {
      seller = await Seller.findOne({ userInfo: user._id });
      if (seller) setCached(sellerCache, cacheKey, seller);
    }

    if (!seller) {
      return res.status(403).json({ 
        status: false, 
        message: "Seller profile not found",
        code: "SELLER_PROFILE_MISSING"
      });
    }

    // Validate approval status
    const approvalStatus = seller.approvalStatus || "pending";
    const validStatuses = ['approved', 'auto_approved'];

    if (!validStatuses.includes(approvalStatus)) {
      return res.status(403).json({
        status: false,
        message: "Seller account not approved",
        approvalStatus,
        rejectedReason: seller.rejectedReason || "Not provided"
      });
    }

    req.user = user;
    req.seller = seller;
    next();
  } catch (error) {
    // Error handling remains consistent
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: false, message: "Token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Optional authentication
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader?.startsWith('Bearer ')) {
      const accessToken = authHeader.split(' ')[1];
      
      try {
        const decoded = jwt.verify(accessToken, jwt_secret);
        const cacheKey = `user-${decoded._id}`;
        
        let user = getCached(userCache, cacheKey);
        if (!user) {
          user = await User.findById(decoded._id);
          if (user) setCached(userCache, cacheKey, user);
        }
        
        if (user) req.user = user;
      } catch (error) {
        console.log("Optional auth notice:", error.message);
      }
    }
    
    next();
  } catch (error) {
    console.error("Critical error in optionalAuth:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Dropshipper authentication
export const isDropshipper = async (req, res, next) => {
  try {
    const user = await verifyTokenAndGetUser(req);
    if (!user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    // Role check
    if (user.role !== 'dropshipper') {
      return res.status(403).json({ 
        status: false, 
        message: "Access denied for this role" 
      });
    }

    // Profile check
    const cacheKey = `dropshipper-${user._id}`;
    let dropshipper = getCached(dropshipperCache, cacheKey);
    
    if (!dropshipper) {
      dropshipper = await Dropshipper.findOne({ userInfo: user._id });
      if (dropshipper) setCached(dropshipperCache, cacheKey, dropshipper);
    }

    if (!dropshipper) {
      return res.status(403).json({ 
        status: false, 
        message: "Dropshipper profile not found" 
      });
    }

    // Approval check
    if (dropshipper.approvalStatus !== 'approved') {
      return res.status(403).json({
        status: false,
        message: `Dropshipper account not approved. Status: ${dropshipper.approvalStatus}`
      });
    }

    req.user = user;
    req.dropshipper = dropshipper;
    if (req.newTokens) {
      req.user.accessToken = req.newTokens.accessToken;
      req.user.refreshToken = req.newTokens.refreshToken;
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: false, message: "Token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Unified host authentication
export const hostAuth = async (req, res, next) => {
  try {
    const user = await verifyTokenAndGetUser(req);
    if (!user) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    // Get populated user data
    const populatedUser = await User.findById(user._id)
      .populate('sellerInfo')
      .populate('dropshipperInfo');

    let hostId, hostType, hostDoc;
    
    if (populatedUser.role === 'seller' && populatedUser.sellerInfo) {
      hostId = populatedUser.sellerInfo._id;
      hostType = 'seller';
      hostDoc = populatedUser.sellerInfo;
    } 
    else if (populatedUser.role === 'dropshipper' && populatedUser.dropshipperInfo) {
      hostId = populatedUser.dropshipperInfo._id;
      hostType = 'dropshipper';
      hostDoc = populatedUser.dropshipperInfo;
    } 
    else {
      return res.status(403).json({
        status: false,
        message: `No ${populatedUser.role} profile found`
      });
    }

    req.user = populatedUser;
    req.hostId = hostId;
    req.hostType = hostType;
    req.hostDoc = hostDoc;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: false, message: "Token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Show hosting permission check
// Improved middleware to check for hosting permission
export const canHostShow = async (req, res, next) => {
  try {
    // 1. Use req.user if it's already attached by userAuth.
    //    Otherwise, verify the token independently. This makes the middleware robust.
    const user = req.user || await verifyTokenAndGetUser(req);

    if (!user) {
      return res.status(401).json({ status: false, message: "Unauthorized. No user found for hosting check." });
    }
    
    // 2. IMPORTANT: Ensure req.user is attached for the next controller in the chain.
    req.user = user;

    // --- The rest of your logic remains the same ---

    // Seller validation
    if (user.role === 'seller') {
      const cacheKey = `seller-${user._id}`;
      let seller = getCached(sellerCache, cacheKey);
      
      if (!seller) {
        // Use user.sellerInfo which should be populated or an ID
        seller = await Seller.findById(user.sellerInfo);
        if (seller) setCached(sellerCache, cacheKey, seller);
      }

      if (seller && ['approved', 'auto_approved'].includes(seller.approvalStatus)) {
        req.showHost = seller;
        req.showHostModel = 'sellers';
        return next();
      }
    }

    // Dropshipper validation
    if (user.role === 'dropshipper') {
      // Use user.dropshipperInfo which should be populated or an ID
      const dropshipper = await Dropshipper.findById(user.dropshipperInfo)
        .populate({
          path: 'connectedSellers',
          match: { status: 'approved' },
          select: 'sellerId'
        });

      if (dropshipper && ['approved', 'auto_approved'].includes(dropshipper.approvalStatus)) {
        dropshipper.approvedSellerIds = dropshipper.connectedSellers.map(conn => conn.sellerId);
        req.showHost = dropshipper;
        req.showHostModel = 'dropshippers';
        return next();
      }
    }
    
    // If neither role check passed
    return res.status(403).json({ 
      status: false, 
      message: "User must be an approved seller or dropshipper to host shows." 
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: false, message: "Token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    console.error("Error in canHostShow middleware:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
// Show ownership validation
export const isHost = async (req, res, next) => {
  try {
    const showId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(showId)) {
      return res.status(400).json({ status: false, message: "Invalid ID format" });
    }

    const show = await Show.findById(showId)
      .select('host hostModel')
      .populate({ path: 'host', select: 'userInfo' });

    if (!show) {
      return res.status(404).json({ status: false, message: "Show not found" });
    }

    if (!show.host?.userInfo?.equals(userId)) {
      return res.status(403).json({ 
        status: false, 
        message: "Not authorized to modify this show" 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Video ownership validation
export const isVideoHost = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ status: false, message: "Invalid ID format" });
    }

    const video = await ShoppableVideo.findById(videoId)
      .select('host hostModel')
      .populate({ path: 'host', select: 'userInfo' });

    if (!video) {
      return res.status(404).json({ status: false, message: "Video not found" });
    }

    if (!video.host?.userInfo?.equals(userId)) {
      return res.status(403).json({ 
        status: false, 
        message: "Not authorized to modify this video" 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};