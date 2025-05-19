import ShoppableVideo from '../models/shopable.modal.js';
import { broadcastShoppableVideoStatusChange } from '../utils/socket.js'; 

export async function finalizeVideoProcessing(videoId, newStatus, errorDetails = null, processedData = {}) {
    try {
        const video = await ShoppableVideo.findById(videoId);
        if (!video) {
            console.error(`Video not found for finalization: ${videoId}`);
            return;
        }

        video.processingStatus = newStatus;
        if (errorDetails) {
            video.processingError = errorDetails;
        }
        if (newStatus === 'published') {
            video.hlsMasterPlaylistUrl = processedData.hlsMasterPlaylistUrl || video.hlsMasterPlaylistUrl;
            video.processedVideoContainer = processedData.processedVideoContainer || video.processedVideoContainer;
            video.processedVideoBasePath = processedData.processedVideoBasePath || video.processedVideoBasePath;
            video.processedFileSize = processedData.processedFileSize || video.processedFileSize;
            video.durationSeconds = processedData.durationSeconds || video.durationSeconds;
            video.processingError = null; // Clear error if published
        }

        const updatedVideo = await video.save();
        console.log(`Video ${videoId} status updated to ${newStatus} in DB.`);

        // Now, broadcast this change to connected clients
        // We need the relevant fields the client expects for 'statusDetails'
        const statusDetailsForClient = {
            _id: updatedVideo._id,
            title: updatedVideo.title,
            processingStatus: updatedVideo.processingStatus,
            visibility: updatedVideo.visibility,
            host: updatedVideo.host,
            hostModel: updatedVideo.hostModel,
            hlsMasterPlaylistUrl: updatedVideo.hlsMasterPlaylistUrl,
            processingError: updatedVideo.processingError,
            createdAt: updatedVideo.createdAt,
            updatedAt: updatedVideo.updatedAt,
            // Include any other fields the client might need upon update
        };

        broadcastShoppableVideoStatusChange(videoId, statusDetailsForClient);

    } catch (err) {
        console.error(`Error finalizing video processing for ${videoId}:`, err);
    }
}

// Example of how you might call this:
// After your Azure function/webhook signals processing is done for 'someVideoId123':
// finalizeVideoProcessing('someVideoId123', 'published', null, { hlsMasterPlaylistUrl: '...', ... });

// If processing failed:
// finalizeVideoProcessing('someVideoId456', 'failed', 'Encoding failed due to incompatible format.');