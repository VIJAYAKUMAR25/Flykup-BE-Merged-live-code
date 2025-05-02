import { deleteBlobFromAzure, generateSasUrl, uploadPublicImageBlob } from "../utils/azureBlob.js";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { AZURE_PRIVATE_CONTAINER_NAME, AZURE_PUBLIC_CONTAINER_NAME, storageAccountName } from "../utils/azureBlob.js";



export const generateSasTokenForDocuments = async (req, res) => {

    const userId = req.user._id.toString();

    const { originalFilename } = req.body;

    if (!originalFilename) {
        return res.status(400).json({ error: 'originalFilename is required.' });
    }

    const targetContainer = AZURE_PRIVATE_CONTAINER_NAME;

    if (!targetContainer) {
        console.error('Azure container name (AZURE_PRIVATE_CONTAINER) is not configured in environment variables.');
        return res.status(500).json({ error: 'Server configuration error: Missing container name.' });
    }

    try {
        const fileExtension = path.extname(originalFilename);
        if (!fileExtension) {
             return res.status(400).json({ error: 'Could not determine file extension from originalFilename.' });
        }
        // Create a unique name: userId/uuid.extension
        const uniqueId = uuidv4();
        const blobName = `${userId}/${uniqueId}${fileExtension}`;

        // 5. Define SAS permissions and expiry
        const permissions = 'racw'; // Read, Add, Create, Write
        const expiryMinutes = 15; // Short expiry for security (e.g., 15 minutes)

        // 6. Generate the SAS URL using your utility function
        const sasUrl = await generateSasUrl(
            blobName,
            targetContainer,
            expiryMinutes,
            permissions
        );

        // 7. Validate SAS URL generation
        if (!sasUrl) {
            console.error(`Failed to generate SAS URL for blob: ${blobName} in container: ${targetContainer}`);
            return res.status(500).json({ error: 'Failed to generate SAS token.' });
        }

        console.log(`Generated SAS URL for document blob: ${blobName}`);

        // 8. Send response to frontend
        res.status(200).json({
            sasUrl,
            blobName
        });

    } catch (error) {
        console.error('Error generating document SAS token:', error);
        res.status(500).json({ error: 'Internal server error while generating SAS token.' });
    }
};

export const generateSasTokenForImages = async (req, res) => {

    const userId = req.user._id.toString();

    const { originalFilename } = req.body;

    if (!originalFilename) {
        return res.status(400).json({ error: 'originalFilename is required.' });
    }

    const targetContainer = AZURE_PUBLIC_CONTAINER_NAME;

    if (!targetContainer) {
        console.error('Azure container name (AZURE_PUBLIC_CONTAINER) is not configured in environment variables.');
        return res.status(500).json({ error: 'Server configuration error: Missing container name.' });
    }

    try {
        const fileExtension = path.extname(originalFilename);
        if (!fileExtension) {
             return res.status(400).json({ error: 'Could not determine file extension from originalFilename.' });
        }
        // Create a unique name: userId/uuid.extension
        const uniqueId = uuidv4();
        const blobName = `${userId}/${uniqueId}${fileExtension}`;

        // 5. Define SAS permissions and expiry
        const permissions = 'racw'; // Read, Add, Create, Write
        const expiryMinutes = 15; // Short expiry for security (e.g., 15 minutes)

        // 6. Generate the SAS URL using your utility function
        const sasUrl = await generateSasUrl(
            blobName,
            targetContainer,
            expiryMinutes,
            permissions
        );

        // 7. Validate SAS URL generation
        if (!sasUrl) {
            console.error(`Failed to generate SAS URL for blob: ${blobName} in container: ${targetContainer}`);
            return res.status(500).json({ error: 'Failed to generate SAS token.' });
        }

        console.log(`Generated SAS URL for document blob: ${blobName}`);

          // --- 8. Construct Public Azure URL ---
        const azureUrl = `https://${storageAccountName}.blob.core.windows.net/${targetContainer}/${blobName}`;

        // 9. Send response to frontend
        res.status(200).json({
            sasUrl,
            blobName,
            azureUrl
        });

    } catch (error) {
        console.error('Error generating document SAS token:', error);
        res.status(500).json({ error: 'Internal server error while generating SAS token.' });
    }
};
