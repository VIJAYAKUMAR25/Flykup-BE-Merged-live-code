import express from 'express';

// Import specific controller functions needed
import {
    createShow,
    getAllShows,
    getShowById,
    updateShow,
    deleteShow,
    startShow,
    endShow,
    cancelShow,
    viewShowDetails, // Keep this as requested
    getShowsBySellerId, // Removed, replaced by getMyHostedShows
    getMyHostedShows, // Import the new function
    updateTaggedProductsInAShow,
} from '../controllers/shows.controller.js'; // Adjust path if needed

// Import necessary middleware
import {
    userAuth,      // Basic JWT authentication, attaches req.user
    sellerAuth,
    canHostShow,  // Use for creating shows (Seller OR Dropshipper)
    isHost,       // Use for modifying/controlling specific shows (checks ownership)
} from '../middlewares/auth.js'; // Adjust path if needed

const showsRouter = express.Router();

// Create a new show (Requires approved Seller or Dropshipper)
// Path: /create
showsRouter.post('/create', userAuth, canHostShow, createShow);

// Get a single show by ID (e.g., for viewing details - public or basic auth)
// Path: /get/:id
// Making it public for now, add 'userAuth' if login required
showsRouter.get('/get/:id', getShowById);

// Update show core details (Only Host)
// Path: /update/:id
showsRouter.put('/update/:id', userAuth, isHost, updateShow);

// Get shows hosted by the currently logged-in user (Seller or Dropshipper)
// Path: /seller (Kept path, but functionality changed)
showsRouter.get('/myshows', userAuth, getMyHostedShows); // Requires logged-in user

showsRouter.get('/seller', sellerAuth, getShowsBySellerId); // Requires logged-in user

// Start a show (Only Host)
// Path: /:id/start (Standardized param name to :id)
showsRouter.patch('/:id/start', userAuth, isHost, startShow);

// End a show (Only Host)
// Path: /:id/end (Standardized param name to :id)
showsRouter.patch('/:id/end', userAuth, isHost, endShow);

// Cancel a show (Only Host)
// Path: /:id/cancel (Standardized param name to :id)
showsRouter.patch('/:id/cancel', userAuth, isHost, cancelShow);

// View show details by show id (Public or basic auth)
// Path: /view/:id
// Making it public for now, add 'userAuth' if login required
showsRouter.get('/view/:id', viewShowDetails); // Kept as requested

// Update tagged products in a show (Only Host)
// Path: /tag/:id (Standardized param name to :id)
showsRouter.put('/tag/:id', userAuth, isHost, updateTaggedProductsInAShow);


// === Routes Not Used in Frontend (as per original comment) ===

// Get all shows (Public or basic auth)
// Path: /get
// Making it public for now
showsRouter.get('/get', getAllShows);

// Delete a show by ID (Requires Host or Admin)
// Path: /delete/:id
// Note: You might want more complex logic here, e.g., isHost OR isAdmin
showsRouter.delete('/delete/:id', userAuth, isHost, deleteShow);


// === Deprecated/Removed Routes logic ===
// The controller for '/seller' now points to getMyHostedShows

export default showsRouter;