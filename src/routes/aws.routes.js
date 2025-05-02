import express from "express";
import multer from "multer";
import { deleteImageInAws, uploadImageInAws } from "../controllers/aws.controller.js";


const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});


const awsFileUploadRouter = express.Router();


awsFileUploadRouter.post("/image/delete", deleteImageInAws);
awsFileUploadRouter.post("/image/upload", upload.single("image"), uploadImageInAws);

export default awsFileUploadRouter;