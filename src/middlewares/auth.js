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
import Dropshipper from '../models/shipper.model.js'; // Import the Dropshipper model (adjust path)
import Show from '../models/shows.model.js';
import mongoose from 'mongoose';
import ShoppableVideo from '../models/shoppableVideo.model.js';

const jwt_secret = process.env.JWT_SECRET;

export const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }

        const accessToken = authHeader.split(' ')[1];
        const decoded = jwt.verify(accessToken, jwt_secret);
        const { _id } = decoded;

        const user = await User.findById(_id);

        if (!user || user.role === null) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

export const sellerAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }

        const accessToken = authHeader.split(' ')[1];
        const decoded = jwt.verify(accessToken, jwt_secret);
        const user = await User.findById(decoded._id);

        if (!user || user.role !== 'seller') {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }

        const seller = await Seller.findOne({ userInfo: user._id });

        if (!seller) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }

        req.user = user;
        req.seller = seller;

        next();
    } catch (error) {
        res.status(400).json({ status: false, message: "Internal Server Error." })
    }
}

export const optionalAuth = async (req, res, next) => {
    try {
        // 1. Check for the Authorization header
        const authHeader = req.headers.authorization;

        // 2. If a Bearer token exists, try to process it
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const accessToken = authHeader.split(' ')[1];
            
            try {
                // 3. Verify the token
                const decoded = jwt.verify(accessToken, jwt_secret);
                
                // 4. Find the user based on the token's ID
                const user = await User.findById(decoded._id);

                // 5. If a valid user is found, attach them to the request object
                if (user) {
                    req.user = user;
                }
                // If user is not found, we simply proceed without attaching req.user

            } catch (error) {
                // This catch block handles an invalid/expired token.
                // Instead of sending an error, we just log it and proceed.
                // The request will continue as if the user is a guest.
                console.log("Optional auth notice: Invalid token provided. Proceeding as guest.", error.message);
            }
        }
        
        // 6. CRITICAL STEP: Always proceed to the next middleware/controller.
        // This is what makes the route public, as we don't return an error on auth failure.
        next();

    } catch (error) {
        // This outer catch is for unexpected server errors (e.g., database connection issue)
        console.error("Critical error in optionalAuth middleware:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

export const isDropshipper = async (req, res, next) => {
    try {
        // 1. Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: false, message: "Unauthorized: No token provided." });
        }

        const accessToken = authHeader.split(' ')[1];

        // 2. Verify the token
        let decoded;
        try {
            decoded = jwt.verify(accessToken, jwt_secret);
        } catch (err) {
            // Token verification failed (expired, invalid, etc.)
            return res.status(401).json({ status: false, message: `Unauthorized: ${err.message || 'Invalid token.'}` });
        }

        // 3. Find user by ID from token
        const user = await User.findById(decoded._id);

        // 4. Check if user exists and has the 'dropshipper' role
        if (!user || user.role !== 'dropshipper') {
            // User not found or role mismatch
            return res.status(403).json({ status: false, message: "Forbidden: Access denied for this role." });
            // Use 403 Forbidden as they might be a valid user, just not a dropshipper
        }

        // 5. Find the associated Dropshipper profile
        const dropshipper = await Dropshipper.findOne({ userInfo: user._id });

        // 6. Check if the Dropshipper profile exists
        if (!dropshipper) {
            // Role is 'dropshipper' but profile doesn't exist (data inconsistency or setup issue)
            return res.status(403).json({ status: false, message: "Forbidden: Dropshipper profile not found." });
        }

        // 7. Check if the Dropshipper profile is approved
        if (dropshipper.approvalStatus !== 'approved') {
            // Profile exists but is not approved (pending, rejected, suspended)
            return res.status(403).json({
                status: false,
                message: `Forbidden: Dropshipper account is not approved. Status: ${dropshipper.approvalStatus}`
            });
        }

        // 8. Attach user and dropshipper objects to the request for downstream use
        req.user = user;
        req.dropshipper = dropshipper;

        // 9. Proceed to the next middleware or route handler
        next();

    } catch (error) {
        // Catch any unexpected errors during the process
        console.error("Error in isDropshipper middleware:", error); // Log the actual error
        res.status(500).json({ status: false, message: "Internal Server Error." });
    }
};

export const hostAuth = async (req, res, next) => {
    try {
        // 1) check token
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: false, message: 'unauthorized' });
        }

        const accessToken = authHeader.split(' ')[1];

        // 2) verify
        let payload;
        try {
            payload = jwt.verify(accessToken, jwt_secret);
        } catch (error) {
            return res.status(401).json({ status: false, message: `Unauthorized: ${error.message}`});
        }

        // fetch user & seller , dropshipper fields
        const user = await User.findById(payload._id)
            .populate('sellerInfo')
            .populate('dropshipperInfo');

        if( !user || !user.role ) {
            return res.status(401).json( { status: false, message: "unauthorized" } );
        }

        // figure out hostId based on role 
        let hostId, hostType, hostDoc;
        if( user.role === 'seller' && user.sellerInfo ) {
            hostId = user.sellerInfo._id;
            hostType = 'seller';
            hostDoc = user.sellerInfo;
        } else if ( user.role === 'dropshipper' && user.dropshipperInfo ){
            hostId = user.dropshipperInfo._id;
            hostType = 'dropshipper';
            hostDoc = user.dropshipperInfo;
        } else {
            return res.status(403).json({
                status: false,
                message: `Forbidden: no ${ user.role } profile found`
            });
        }

        // attach to req
        req.user = user;
        req.hostId = hostId;
        req.hostType = hostType;
        req.hostDoc = hostDoc;

        next();
    } catch (error) {
        console.error("hostAuth error:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}


export const canHostShow = async (req, res, next) => {
    try {
        // First, ensure user is authenticated (using your existing 'protect' logic)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: false, message: "Unauthorized: No token provided." });
        }

        const accessToken = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(accessToken, jwt_secret);
        } catch (err) {
            return res.status(401).json({ status: false, message: `Unauthorized: ${err.message || 'Invalid token.'}` });
        }
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ status: false, message: "Unauthorized: User not found." });
        }
        req.user = user; // Attach user for consistency

        // Now check if they are an approved Seller or Dropshipper
        if (user.role === 'seller' && user.sellerInfo) {
            const seller = await Seller.findById(user.sellerInfo);
            if (seller && seller.approvalStatus === 'approved') {
                // === FIX: Use req.showHost instead of req.host ===
                req.showHost = seller; // Attach the seller document
                req.showHostModel = 'sellers';
                // ==================================================
                return next(); // Allowed as Seller
            }
        }

        if (user.role === 'dropshipper' && user.dropshipperInfo) {
            // Populate connected seller IDs needed for validation later
            const dropshipper = await Dropshipper.findById(user.dropshipperInfo)
                .populate({
                    path: 'connectedSellers',
                    match: { status: 'approved' }, // Only populate approved connections
                    select: 'sellerId -_id' // Select only the sellerId from approved connections
                });

            if (dropshipper && dropshipper.approvalStatus === 'approved') {
                // Pre-process connected seller IDs for faster lookup later
                // Ensure connectedSellers is an array even if populate returns null/empty
                const approvedConnections = dropshipper.connectedSellers || [];
                dropshipper.approvedSellerIds = approvedConnections.map(conn => conn.sellerId); // Store just the IDs

                // === FIX: Use req.showHost instead of req.host ===
                req.showHost = dropshipper; // Attach the dropshipper document
                req.showHostModel = 'dropshippers';
                // ==================================================
                return next(); // Allowed as Dropshipper
            }
        }

        // If neither role is valid or approved
        return res.status(403).json({ status: false, message: "Forbidden: User must be an approved Seller or Dropshipper to host shows." });

    } catch (error) {
        console.error("Error in canHostShow middleware:", error);
        res.status(500).json({ status: false, message: "Internal Server Error." });
    }
};

// --- CORRECTED Middleware: isHost ---
// Checks if the authenticated user's ID matches the 'userInfo' field of the host (Seller/Dropshipper) of the specific show requested via req.params.id
// Assumes 'protect' middleware has run before to attach req.user
export const isHost = async (req, res, next) => {
    try {
        const showId = req.params.id; // Get show ID from route parameter
        // console.log('--- isHost Middleware ---'); // Log marker
        // console.log('Received showId param:', showId); // Log the ID
        const loggedInUserId = req.user?._id; // Get logged-in user's ID from 'protect' middleware

        if (!loggedInUserId) {
            // Should be caught by 'protect', but double-check
            return res.status(401).json({ status: false, message: "Unauthorized: User not authenticated." });
        }
        if (!mongoose.Types.ObjectId.isValid(showId)) {
            return res.status(400).json({ status: false, message: "Invalid Show ID format." });
        }

        // Find the show and populate the 'host' field, selecting only the 'userInfo' from the referenced Seller/Dropshipper
        const show = await Show.findById(showId)
            .select('host hostModel') // Select host ID and model type for reference
            .populate({
                path: 'host',          // Populate the 'host' field
                select: 'userInfo'     // Only retrieve the 'userInfo' field from the host document (Seller or Dropshipper)
            });

        if (!show) {
            return res.status(404).json({ status: false, message: "Show not found" });
        }

        // --- Core Logic Change ---
        // Check if the show has a host, if the host was populated correctly,
        // if the host has a userInfo field, and if that userInfo ID matches the logged-in user's ID.
        if (!show.host || !show.host.userInfo || !show.host.userInfo.equals(loggedInUserId)) {
            // Log for debugging if needed:
            // console.log(`Auth Fail: Show ${showId}, Host UserInfo: ${show.host?.userInfo}, LoggedIn User: ${loggedInUserId}`);
            return res.status(403).json({ status: false, message: "Forbidden: You are not authorized to modify this show." });
        }
        // --- End Core Logic Change ---

        // User's ID matches the host's userInfo ID, allow proceeding
        next();

    } catch (error) {
        console.error("Error in isHost middleware:", error);
        res.status(500).json({ status: false, message: "Internal Server Error." });
    }
};

// --- NEW Middleware: isVideoHost ---
// Checks if the authenticated user owns the specific ShoppableVideo requested via req.params.id
// Assumes 'protect' middleware has run before to attach req.user
export const isVideoHost = async (req, res, next) => {
    try {
        const videoId = req.params.id; // Get video ID from route parameter
        const loggedInUserId = req.user?._id; // Get logged-in user's ID from 'protect' middleware

        if (!loggedInUserId) {
            return res.status(401).json({ status: false, message: "Unauthorized: User not authenticated." });
        }
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ status: false, message: "Invalid Video ID format." });
        }

        // Find the video and populate the 'host' field, selecting only the 'userInfo'
        const video = await ShoppableVideo.findById(videoId)
            .select('host hostModel') // Select host ID and model type for reference
            .populate({
                path: 'host',          // Populate the 'host' field
                select: 'userInfo'     // Only retrieve the 'userInfo' field from the host document
            });

        if (!video) {
            return res.status(404).json({ status: false, message: "Shoppable video not found." });
        }

        // Check if the video has a host, if the host was populated correctly,
        // if the host has a userInfo field, and if that userInfo ID matches the logged-in user's ID.
        if (!video.host || !video.host.userInfo || !video.host.userInfo.equals(loggedInUserId)) {
            // Log for debugging if needed:
            // console.log(`Auth Fail: Video ${videoId}, Host UserInfo: ${video.host?.userInfo}, LoggedIn User: ${loggedInUserId}`);
            return res.status(403).json({ status: false, message: "Forbidden: You are not authorized to modify this video." });
        }

        // User's ID matches the host's userInfo ID, allow proceeding
        // Optionally attach the video or host info to req if needed by the controller
        // req.video = video; // Example
        next();

    } catch (error) {
        console.error("Error in isVideoHost middleware:", error);
        res.status(500).json({ status: false, message: "Internal Server Error." });
    }
};