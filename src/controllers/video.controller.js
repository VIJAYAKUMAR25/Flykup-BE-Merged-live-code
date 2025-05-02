import Video from '../models/video.model.js';
import {
    blobServiceClient,
    generateSasUrl
} from '../utils/azureBlob.js';
import { v4 as uuidv4 } from 'uuid';
 
const containerName = process.env.AZURE_PRIVATE_CONTAINER_VIDEOS;

if (!blobServiceClient) {
    throw new Error(
        'Azure BlobServiceClient failed to initialize. Check connection string and azureBlob.js logs.'
    );
}
if (!containerName) {
     console.warn('AZURE_PRIVATE_CONTAINER env variable not set in svAzure.controller.js context, relying on default in generateSasUrl.');
}

export const generateSasToken = async ( req, res ) => {
    // const { seller: { _id: sellerId } } = req;
    const { showHost } = req;
    const { originalFilename } = req.body;

    if (!originalFilename) {
        return res.status(400).json({ status: false, message: 'originalFilename is required.' });
    }

    if (!containerName) {
         console.error('AZURE_PRIVATE_CONTAINER is not set in environment variables.');
         return res.status(500).json({ status: false, message: 'Server configuration error: Missing target container name.' });
    }

    try {
        const uniqueId = uuidv4();

        const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9.\-_]/g, '_');

        const blobName = `${showHost._id}/${uniqueId}/${sanitizedFilename}`;

        const permissions = 'racw'; 
        const expiryMinutes = 45;

        const sasUrl = await generateSasUrl(
            blobName,
            containerName,
            expiryMinutes,
            permissions
        );

        if (!sasUrl) {
             console.error(`Failed to generate SAS for blob: ${blobName} in container: ${containerName}`);
             return res.status(500).json({ status: false, message: 'Failed to generate secure upload link.' });
        }

        console.log(`Generated SAS URL for blob: ${blobName}`);

        res.status(200).json({
            status: true,
            sasUrl: sasUrl,
            blobName: blobName
        });

    } catch (error) {
        console.error('Error in generateSasToken controller:', error);
        res.status(500).json({ status: false, message: 'Internal server error generating upload link'});
    }
}

export const createVideo = async ( req, res ) => {
    const { seller: { _id: sellerId } } = req;
    const data = req.body;

    try {
        const videoData = {
            ...data,
            sellerId,
            processingStatus: 'queued'
        };

        const newShoppableVideo = new Video(videoData);
        const savedVideo = await newShoppableVideo.save();

        res.status(201).json({
            status: true,
            message: 'Shoppable video submitted successfully and queued for processing!',
            video: savedVideo,
        });

    } catch (error) {
        console.error('Error in createVideo controller:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error.'
        });
    }
}

// Get all published videos
export const getPublishedVideos = async (req, res) => {
    try {
        const videos = await Video.find({ processingStatus: 'published', visibility: 'public'})
            .select('_id title description hlsMasterPlaylistUrl')
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();
        res.status(200).json({ status: true, message: 'Published videos fetched successfully!', data: videos || []});
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error fetching videos', error: error.message });
    }
};

// Get single video details
export const getVideoDetails = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .select('title description hlsMasterPlaylistUrl durationSeconds')
            .lean();
        
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        
        res.status(200).json({ status: true, message:"Video fetched successfully!", data:video});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video', error: error.message });
    }
};
