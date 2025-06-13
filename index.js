import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import http from 'http';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/connection.js';
import authRouter from './src/routes/authentication.routes.js';
import userRouter from './src/routes/user.routes.js';
import sellerRouter from './src/routes/seller.routes.js';
import categoryRouter from './src/routes/category.routes.js';
import settingsRouter from './src/routes/settings.routes.js';
import adminUserRouter from './src/routes/admin/user.routes.js';
import adminPartnerRouter from './src/routes/admin/admin.routes.js';
import showsRouter from './src/routes/shows.routes.js';
import productListingRouter from './src/routes/productListing.routes.js';
import stockRouter from './src/routes/stock.routes.js';
import sellerApplicationRouter from './src/routes/sellerApplication.routes.js';
import adminSellerApplicationRouter from './src/routes/admin/sellerApplication.routes.js';
import shoppableVideoRouter from './src/routes/shoppableVideo.routes.js';
import userFeedRouter from './src/routes/userFeed.routes.js';
import productDetailsRouter from './src/routes/productDetails.routes.js';
import awsFileUploadRouter from './src/fileUploads/routes/awsFileUpload.routes.js';
import profileRouter from './src/routes/profile.routes.js';
import followRouter from './src/routes/follow.routes.js';
import searchBarRouter from './src/routes/searchBar.routes.js';
import shipperRouter from './src/routes/shipper.routes.js';
import azureFileUploadRouter from './src/routes/azure.routes.js';
import videoRouter  from './src/routes/video.routes.js';
import globalSearchRouter from './src/routes/globalSearch.routes.js';
import initializeSocket from './src/utils/socket.js';
import { blockAccessMiddleware } from './src/utils/blockAccess.js';
import blockedRegionRouter from './src/routes/blockedRegion.routes.js';
import statusRouter from './src/routes/statusRouter.js';
import adminLogsRouter from './src/routes/admin/adminLoginLog.routes.js';
import notificationRouter from './src/routes/notification.routes.js';
import coHostRouter from './src/routes/coHost.routes.js';


// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
// --- Configure Trust Proxy ---
// IMPORTANT: Set this EARLY, before routes/middleware using req.ip
app.set('trust proxy', 1); // Trust the first hop (common for Render, Heroku, etc.)
// --- End Configuration ---

// CORS
app.use(cors({
  origin: [
    "https://app.flykup.live",
    "https://admin.flykup.live",
    "http://localhost:5173",
    "http://localhost:5000",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://localhost:8081",
    "https://flykup-bidding.vercel.app",
    "https://flykup-admin.vercel.app",
    "https://flykup-merge.vercel.app",
    "https://flykup-fe-merged-live-demo.vercel.app",
    "https://flykup-digi-store.vercel.app",
    "http://13.127.105.190:5070",

  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/home', blockAccessMiddleware, statusRouter);
app.use('/api/auth', blockAccessMiddleware, authRouter);
app.use('/api/user', blockAccessMiddleware, userRouter);
app.use('/api/seller', blockAccessMiddleware, sellerRouter);
app.use('/api/apply', blockAccessMiddleware, sellerApplicationRouter);
app.use('/api/product/listing',blockAccessMiddleware,productListingRouter); 
app.use("/api/product-details",blockAccessMiddleware, productDetailsRouter);
app.use('/api/stock', blockAccessMiddleware,stockRouter);
app.use('/api/shows',blockAccessMiddleware, showsRouter);
app.use('/api/shoppable-videos',blockAccessMiddleware, shoppableVideoRouter);
app.use('/api/user-feed',blockAccessMiddleware, userFeedRouter);
app.use('/api/aws',blockAccessMiddleware, awsFileUploadRouter);
app.use('/api/azure',blockAccessMiddleware, azureFileUploadRouter);
app.use('/api/profile',blockAccessMiddleware, profileRouter);
app.use('/api/follow',blockAccessMiddleware, followRouter);
app.use('/api/shipper',blockAccessMiddleware, shipperRouter);
app.use('/api/videos',blockAccessMiddleware, videoRouter);
app.use('/api/search',blockAccessMiddleware, globalSearchRouter);
app.use('/api/notify', blockAccessMiddleware, notificationRouter);
app.use('/api/cohost',blockAccessMiddleware, coHostRouter);

// --- 🔥 Admin Routes (without blocking middleware) ---
// These routers are mounted *without* the blockAccessMiddleware
app.use('/api/blocked-regions', blockedRegionRouter);
app.use('/api/admin/seller-applications', adminSellerApplicationRouter);
app.use('/api/admin/user', adminUserRouter);
app.use('/api/partners/admin', adminPartnerRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/logs', adminLogsRouter);



// General response
app.use('/', (req, res) => {
  res.send("Hello, Welcome to Flykup Backend API");
});


// Connect to the database and start the server
connectDB()
  .then(() => {
    console.log(chalk.green.bold("🌐 DB Connected Successfully..."));

    const PORT = process.env.PORT || 6969;
     const io = initializeSocket(server);
    server.listen(PORT, () => {
      console.log(chalk.green.bold("\n🚀 Flykup Backend Server is running:\n"));
      console.log(`  ${chalk.green.bold("➜")}  Local:   ${chalk.cyan.underline(`http://localhost:${PORT}/`)}`);
      console.log(`  ${chalk.green.bold("➜")}  Network: ${chalk.dim("use --host to expose")}`);
      console.log(`  ${chalk.green.bold("➜")}  ${chalk.dim("press h + enter to show help")}\n`);
    });
  })
  .catch((err) => {
    console.error(chalk.red.bold(`❌ Failed to connect to the database: ${err.message}`));
  });

