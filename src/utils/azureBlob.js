import {
    BlobServiceClient,
    BlobSASPermissions,
    generateBlobSASQueryParameters,
    SASProtocol,
    StorageSharedKeyCredential
} from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import mime from 'mime-types';

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_PRIVATE_CONTAINER_NAME = process.env.AZURE_PRIVATE_CONTAINER;
const AZURE_PUBLIC_CONTAINER_NAME = process.env.AZURE_PUBLIC_CONTAINER;

let blobServiceClient = null;
let storageAccountName = '';

if (AZURE_STORAGE_CONNECTION_STRING) {
    try {
        blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        storageAccountName = blobServiceClient.accountName;
        console.log(`Azure BlobServiceClient initialized for account: ${storageAccountName}.`);
    } catch (error) {
        console.error("Failed to create Azure BlobServiceClient from Connection String:", error);
    }
} else {
    console.error("Azure Storage Connection String (AZURE_STORAGE_CONNECTION_STRING) is missing in environment variables.");
}

if (!AZURE_PRIVATE_CONTAINER_NAME && blobServiceClient) {
    console.warn("Default Azure Private Storage Container Name (AZURE_PRIVATE_CONTAINER) not set.");
}
if (!AZURE_PUBLIC_CONTAINER_NAME && blobServiceClient) {
    console.warn("Azure Public Image Container Name (AZURE_PUBLIC_CONTAINER) not set.");
}

// --- Export the initialized client and account name ---
export { blobServiceClient, storageAccountName };
// --- Export Container Names if needed elsewhere ---
export { AZURE_PRIVATE_CONTAINER_NAME, AZURE_PUBLIC_CONTAINER_NAME };


export const uploadBlob = async (
    fileBuffer,
    originalFilename,
    destinationPath,
    containerName = AZURE_PRIVATE_CONTAINER_NAME,
    contentType = null
) => {
    if (!blobServiceClient) {
        console.error("Azure BlobServiceClient is not initialized. Cannot upload blob.");
        return null;
    }
    if (!fileBuffer || !originalFilename || !destinationPath) {
        console.error("Missing required parameters for uploadBlob.");
        return null;
    }
    if (!containerName) {
        console.error("Container name is missing for blob upload.");
        return null;
    }

    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const fileExtension = path.extname(originalFilename).toLowerCase();
        const uniqueId = uuidv4();
        const blobName = `${destinationPath}/${uniqueId}-${path.basename(originalFilename, fileExtension)}${fileExtension}`;

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        if (!contentType) {
            const detectedContentType = mime.lookup(originalFilename);
            contentType = detectedContentType || 'application/octet-stream';
        }

        console.log(`Uploading blob "${blobName}" to container "${containerName}" with Content-Type: ${contentType}`);

        await blockBlobClient.uploadData(fileBuffer, {
            blobHTTPHeaders: {
                blobContentType: contentType,
                blobContentDisposition: 'inline', 
            },
        });

        console.log(`Successfully uploaded blob: ${blobName}`);
        return blobName;

    } catch (error) {
        console.error(`Error uploading blob "${originalFilename}" to path "${destinationPath}" in container "${containerName}":`, error.message || error);
        return null;
    }
};

export const generateSasUrl = async (
    blobName,
    containerName = AZURE_PRIVATE_CONTAINER_NAME,
    expiresInMinutes = 60,
    permissionsString = 'r'
) => {
    if (!blobServiceClient) {
        console.error("Azure BlobServiceClient is not initialized. Cannot generate SAS URL.");
        return null;
    }
    if (!blobName) {
        console.warn("Blob name is missing for SAS URL generation. Returning null.");
        return null;
    }
    if (!containerName) {
        console.error("Container name is missing for SAS URL generation.");
        return null;
    }
    if (!blobServiceClient.credential) {
        console.error("Could not find credential on BlobServiceClient needed for SAS generation. Ensure connection string includes a valid key.");
        return null;
    }

    if (!(blobServiceClient.credential instanceof StorageSharedKeyCredential)) {
         console.error("BlobServiceClient credential is not a StorageSharedKeyCredential. Cannot generate blob SAS with this credential type.");
         return null;
    }


    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(blobName);

        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + expiresInMinutes);

        const permissions = BlobSASPermissions.parse(permissionsString);

        const sasOptions = {
            containerName: containerName,
            blobName: blobName,
            permissions: permissions,
            protocol: SASProtocol.Https,
            startsOn: new Date(),
            expiresOn: expiryDate,
        };

        const sasToken = generateBlobSASQueryParameters(sasOptions, blobServiceClient.credential).toString();
        const sasUrl = `${blobClient.url}?${sasToken}`;

        return sasUrl;

    } catch (error) {
        console.error(`Error generating SAS URL for blob "${blobName}" in container "${containerName}":`, error.message || error);
        return null;
    }
};


export const addSasUrlsToSeller = async (seller) => {
    if (!seller) return null;

    try {
        const defaultContainer = AZURE_PRIVATE_CONTAINER_NAME;

        // Helper function to avoid repetition
        const getUrl = (blob) => blob ? generateSasUrl(blob, defaultContainer) : Promise.resolve(null);

        // 1. Product Catalog File
        if (seller.productCatalog?.file) {
            seller.productCatalog.file = await getUrl(seller.productCatalog.file);
        }

        // 2. GST Info Documents
        if (seller.gstInfo) {
            if (seller.gstInfo.hasGST === true && seller.gstInfo.gstDocument) {
                seller.gstInfo.gstDocument = await getUrl(seller.gstInfo.gstDocument);
                seller.gstInfo.gstDeclaration = null;
            } else if (seller.gstInfo.hasGST === false && seller.gstInfo.gstDeclaration) {
                seller.gstInfo.gstDeclaration = await getUrl(seller.gstInfo.gstDeclaration);
                seller.gstInfo.gstDocument = null;
            }
        }

        // 3. Aadhaar Info Documents
        if (seller.aadhaarInfo) {
            [seller.aadhaarInfo.aadhaarFront, seller.aadhaarInfo.aadhaarBack] = await Promise.all([
                getUrl(seller.aadhaarInfo.aadhaarFront),
                getUrl(seller.aadhaarInfo.aadhaarBack)
            ]);
        }

        // 4. PAN Info Document
        if (seller.panInfo?.panFront) {
            seller.panInfo.panFront = await getUrl(seller.panInfo.panFront);
        }


    } catch (error) {
        console.error(`Error processing seller ID ${seller._id || 'N/A'} for SAS URLs:`, error);
    }

    return seller;
};

export const uploadPublicImageBlob = async (buffer, contentType = 'image/jpeg') => {
    if (!blobServiceClient) {
        console.error("Azure BlobServiceClient is not initialized. Cannot upload public image.");
        return null;
    }
    if (!AZURE_PUBLIC_CONTAINER_NAME) {
        console.error("Public Image Container Name (AZURE_PUBLIC_CONTAINER) is missing. Cannot upload.");
        return null;
    }
    if (!buffer) {
        console.error("Missing image buffer for uploadPublicImageBlob.");
        return null;
    }

    try {
        const containerClient = blobServiceClient.getContainerClient(AZURE_PUBLIC_CONTAINER_NAME);
        // await containerClient.createIfNotExists({ access: 'blob' }); // 'blob' for public read access

        const extension = contentType.startsWith('image/') ? `.${contentType.split('/')[1]}` : '.jpg';
        const blobName = `${uuidv4()}${extension}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        console.log(`Uploading public image "${blobName}" to container "${AZURE_PUBLIC_CONTAINER_NAME}" with Content-Type: ${contentType}`);

        await blockBlobClient.uploadData(buffer, {
            blobHTTPHeaders: {
                blobContentType: contentType,
                blobContentDisposition: 'inline',
            },
        });

        const publicUrl = `https://${storageAccountName}.blob.core.windows.net/${AZURE_PUBLIC_CONTAINER_NAME}/${blobName}`;

        console.log(`Successfully uploaded public image: ${blobName}`);
        return { blobName: blobName, url: publicUrl };

    } catch (error) {
        console.error(`Error uploading public image blob to container "${AZURE_PUBLIC_CONTAINER_NAME}":`, error.message || error);
        return null;
    }
};

export const deleteBlobFromAzure = async (blobName, containerName = AZURE_PUBLIC_CONTAINER_NAME) => {
    if (!blobServiceClient) {
        console.error("Azure BlobServiceClient is not initialized. Cannot delete blob.");
        return false;
    }
    if (!containerName) {
        console.error("Container Name is missing (and no default AZURE_PUBLIC_CONTAINER_NAME is configured). Cannot delete blob.");
        return false;
    }
    if (!blobName) {
        console.error("Missing blob name for deleteBlobFromAzure.");
        return false;
    }

    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        console.log(`Attempting to delete blob "${blobName}" from container "${containerName}"`);
        const response = await blockBlobClient.deleteIfExists(); 

        if (response.succeeded) {
            console.log(`Blob "${blobName}" deleted successfully from container "${containerName}".`);
        } else {
            console.warn(`Blob "${blobName}" not found in container "${containerName}" (or already deleted).`);
        }
        return true; // Return true for successful deletion OR non-existence

    } catch (error) {
        console.error(`Error deleting blob "${blobName}" from container "${containerName}":`, error.message || error);
        return false; // Indicate failure
    }
};