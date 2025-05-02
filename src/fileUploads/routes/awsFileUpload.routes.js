import express from "express";
import multer from "multer";
import { deleteImageInAws, uploadImageInAws } from "../controllers/awsFileUpload.controller.js";


const upload = multer();
const awsFileUploadRouter = express.Router();


awsFileUploadRouter.post("/image/delete", deleteImageInAws);
awsFileUploadRouter.post("/image/upload", upload.single("image"), uploadImageInAws);

export default awsFileUploadRouter;