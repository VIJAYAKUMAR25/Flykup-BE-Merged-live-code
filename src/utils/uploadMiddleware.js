import multer from 'multer';

const storage = multer.memoryStorage();

const limits = {
    fileSize: 12 * 1024 * 1024,
};

const sellerUpload = multer({
    storage: storage,
    limits: limits,
    fileFilter: (req, file, cb) => {
        // Example: Allow only images and PDFs
        if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images and PDFs are allowed.'), false);
        }
    }
}).fields([
    { name: 'productCatalog[file]', maxCount: 1 },
    { name: 'gstInfo[gstDocument]', maxCount: 1 },
    { name: 'gstInfo[gstDeclaration]', maxCount: 1 },
    { name: 'aadhaarInfo[aadhaarFront]', maxCount: 1 },
    { name: 'aadhaarInfo[aadhaarBack]', maxCount: 1 },
    { name: 'panInfo[panFront]', maxCount: 1 }
    // Add any other potential file fields here
]);

// Middleware to handle multer errors specifically
const handleUploadErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        // A Multer error occurred when uploading.
        if (err.code === 'LIMIT_FILE_SIZE') {
             return res.status(400).json({ status: false, message: `File too large. Maximum size is ${limits.fileSize / 1024 / 1024}MB.` });
        }
        // Handle other multer errors (e.g., LIMIT_FIELD_KEY, LIMIT_FIELD_VALUE, etc.)
         return res.status(400).json({ status: false, message: `File upload error: ${err.message}` });
    } else if (err) {
        // An unknown error occurred when uploading.
        console.error("Unknown upload error:", err);
         return res.status(500).json({ status: false, message: `An unexpected error occurred during file upload: ${err.message}` });
    }
    // Everything went fine with multer, proceed.
    next();
};


export { sellerUpload, handleUploadErrors };