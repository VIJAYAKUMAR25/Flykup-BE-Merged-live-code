import express from "express";
import { generateSasTokenForDocuments, generateSasTokenForImages } from "../controllers/azure.controller.js";
import { userAuth } from "../middlewares/auth.js";

const azureFileUploadRouter = express.Router();

azureFileUploadRouter.post('/generate-document-sas', userAuth, generateSasTokenForDocuments);
azureFileUploadRouter.post('/generate-image-sas', userAuth, generateSasTokenForImages);

export default azureFileUploadRouter;