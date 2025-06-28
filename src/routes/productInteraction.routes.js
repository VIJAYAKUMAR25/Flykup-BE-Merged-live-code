import express from 'express';
import { 
  trackProductView,
  submitProductReview,
  getAnalyticsData,
  getSellerProductAnalytics // 👈 Import the new controller function
} from '../controllers/productInteraction.Controller.js';
import { optionalAuth, userAuth, sellerAuth } from '../middlewares/auth.js'; // 👈 Import sellerAuth
const productInteractionRoutes = express.Router();

// --- General Product Interaction Routes ---

// Track a product view (accessible by anyone)
productInteractionRoutes.post('/:productId/view', optionalAuth, trackProductView);

// Submit a product review (requires user authentication)
productInteractionRoutes.post('/:productId/review', userAuth, submitProductReview);



// --- Analytics Routes ---

// Get public analytics for a single product
productInteractionRoutes.get('/analytics/:productId', getAnalyticsData);

// Get analytics for a seller's products (requires seller authentication)
productInteractionRoutes.get('/seller/:sellerId/analytics', sellerAuth, getSellerProductAnalytics);


export default productInteractionRoutes;