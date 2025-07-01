// src/socket.js (or your file path)
// Focused SOLELY on Shoppable Video Status Updates

import { Server } from 'socket.io';
import chalk from 'chalk';

import { getShoppableVideoDetailsForStatus } from '../controllers/shoppableVideo.controller.js'; 
import User from '../models/user.model.js'; 

let globalIOInstance = null;

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: [ 
                
                "http://localhost:5173",
                "http://localhost:5174",
                "https://app.flykup.live",
                "https://admin.flykup.live",
                "https://flykup-fe-merged-new-3.vercel.app",
                "https://flykup-demo.vercel.app",
                "https://admin-flykup.vercel.app"
            ],
            credentials: true,
            methods: ["GET", "POST"], 
        },
        transports: ['websocket'], // Explicitly prioritize WebSockets
        allowUpgrades: true,
    });

    globalIOInstance = io; 

    io.on('connection', async (socket) => {
       

        // Optional: User identification (keep if you need to know which user is connected)
        const { userId } = socket.handshake.auth || {}; // Assuming userId is passed in handshake auth
        if (userId) {
            socket.data.userId = userId;
            try {
                // Example: Update User model with socketId - adapt to your User schema
                await User.findByIdAndUpdate(userId, { $set: { socketId: socket.id } });
            } catch (err) {
                console.error(chalk.red(`[Socket.IO] Error associating socket ${socket.id} with user ${userId}: ${err.message}`), err);
            }
        } 

        socket.on('requestShoppableVideoStatus', async ({ videoId }, callback) => {
            if (!videoId) {
                console.error(chalk.red(`[Socket.IO] requestShoppableVideoStatus: Video ID not provided by ${socket.id}`));
                if (typeof callback === 'function') {
                    callback({ error: 'Video ID is required.', status: 400, videoId });
                }
                return;
            }
            const result = await getShoppableVideoDetailsForStatus(videoId);

            if (result.error) {
                console.error(chalk.red(`[Socket.IO] Error fetching status for ShoppableVideo ${videoId} for ${socket.id}: ${result.error}`));
                if (typeof callback === 'function') {
                    callback({ error: result.error, status: result.status, videoId });
                }
            } else {
                if (typeof callback === 'function') {
                    callback({ data: result.data, status: result.status, videoId });
                }
                // Emit to the requesting client
                socket.emit('shoppableVideoStatusUpdate', { videoId, statusDetails: result.data });

                // If the video is still processing, automatically subscribe the user to the room for updates
                if (result.data && ( result.data.processingStatus === 'processing' || result.data.processingStatus === 'failed'|| result.data.processingStatus === 'uploaded')) {
                    const roomName = `shoppable-video-${videoId}`;
                    socket.join(roomName);
                }
            }
        });

        
        socket.on('subscribeToShoppableVideo', async ({ videoId }, callback) => {
            if (!videoId) {
                console.error(chalk.red(`[Socket.IO] subscribeToShoppableVideo: Video ID not provided by ${socket.id}`));
                if (typeof callback === 'function') callback({ success: false, message: 'Video ID is required.' });
                return;
            }
            const roomName = `shoppable-video-${videoId}`;
            socket.join(roomName);
          

            // Optionally, send current status upon subscription
            const result = await getShoppableVideoDetailsForStatus(videoId);
            if (!result.error && result.data) {
                socket.emit('shoppableVideoStatusUpdate', { videoId, statusDetails: result.data });
            }
            if (typeof callback === 'function') callback({ success: true, message: `Subscribed to updates for video ${videoId}.` });
        });

        /**
         * Client explicitly unsubscribes from live updates for a specific shoppable video.
         */
        socket.on('unsubscribeFromShoppableVideo', ({ videoId }, callback) => {
            if (!videoId) {
                console.error(chalk.red(`[Socket.IO] unsubscribeFromShoppableVideo: Video ID not provided by ${socket.id}`));
                if (typeof callback === 'function') callback({ success: false, message: 'Video ID is required.' });
                return;
            }
            const roomName = `shoppable-video-${videoId}`;
            socket.leave(roomName);
            if (typeof callback === 'function') callback({ success: true, message: `Unsubscribed from updates for video ${videoId}.` });
        });

        // --- END: Shoppable Video Status Event Handlers ---

        socket.on('disconnect', async () => {
            // Optional: Clear user's socketId if you implemented that
            const disconnectedUserId = socket.data.userId;
            if (disconnectedUserId) {
                try {
                    // Example: Update User model to remove socketId or set to null
                    await User.findByIdAndUpdate(disconnectedUserId, { $unset: { socketId: "" } });
                 
                } catch (err) {
                    console.error(chalk.red(`[Socket.IO] Error clearing socketId for user ${disconnectedUserId}: ${err.message}`));
                }
            }
            // Socket.IO automatically handles leaving rooms on disconnect.
        });
    });

    return io;
};


export const broadcastShoppableVideoStatusChange = (videoId, updatedVideoDetails) => {
    if (!globalIOInstance) {
        console.error(chalk.red('[Socket.IO Broadcast] globalIOInstance is not initialized. Cannot broadcast shoppable video status.'));
        return;
    }
    if (!videoId || !updatedVideoDetails) {
        console.error(chalk.red('[Socket.IO Broadcast] videoId or updatedVideoDetails missing for broadcast.'));
        return;
    }

    const roomName = `shoppable-video-${videoId}`;
    globalIOInstance.to(roomName).emit('shoppableVideoStatusUpdate', {
        videoId,
        statusDetails: updatedVideoDetails 
    });
};

// If your main index.js imports this as default, use:
export default initializeSocket;
// If it imports as a named export { initializeSocket }, then the current `export const initializeSocket` is fine.
// Choose one method of export consistently. For this example, I'm assuming named exports are preferred.