import express from 'express';
import { 
    trackProductView,
    submitProductReview,
    getAnalyticsData, // Kept for any legacy use
    getSellerProductAnalytics,
    getProductAnalytics, // The new detailed analytics controller
    getProductViewers // The new controller for the viewers list
} from '../controllers/productInteraction.Controller.js';
import { optionalAuth, userAuth, sellerAuth } from '../middlewares/auth.js';

const productInteractionRoutes = express.Router();

// --- General Product Interaction Routes ---

// Track a product view (accessible by anyone)
productInteractionRoutes.post('/:productId/view', optionalAuth, trackProductView);

// Submit a product review (requires user authentication)
productInteractionRoutes.post('/:productId/review', userAuth, submitProductReview);


// --- Analytics Routes ---

// Legacy or simple analytics for a single product
productInteractionRoutes.get('/analytics/:productId', getAnalyticsData);

// Analytics for a seller's products (requires seller authentication)
productInteractionRoutes.get('/seller/:sellerId/analytics', sellerAuth, getSellerProductAnalytics);

// --- NEW DETAILED ANALYTICS ROUTES ---

// GET comprehensive analytics for a single product
// This is the main endpoint for the new analytics page.
productInteractionRoutes.get('/analytics-detail/:productId', getProductAnalytics);

// GET paginated list of users who viewed the product.
// This supports the infinite scroll on the new analytics page.
productInteractionRoutes.get('/analytics-detail/:productId/viewers', getProductViewers);


export default productInteractionRoutes;
