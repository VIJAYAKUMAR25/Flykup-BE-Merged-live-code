import sharp from "sharp";
import { deleteImageFromS3, uploadBufferToS3 } from "../utils/aws.js";



export const uploadImageInAws = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: false, message: "No image provided." });
    }

    let { path } = req.query;
    
    if (!path || typeof path !== "string") {
      return res.status(400).json({ status: false, message: "Invalid or missing path." });
    }

    path = path.replace(/[^a-zA-Z0-9-_]/g, "");

    const jpgBuffer = await sharp(req.file.buffer).jpeg().toBuffer();

    // Call uploadBufferToS3 and get imageUrl and key
    const data = await uploadBufferToS3(jpgBuffer, path);

    res.status(200).json({ status: true, message:"Image uploaded successfully!", data });

  } catch (error) {
    console.error("Error in uploadImageInAws:", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};


export const deleteImageInAws = async (req, res) => {
  try {
    const { key } = req.body; 

    if (!key) {
      return res.status(400).json({ status: false, message: "Image key is required." });
    }

    await deleteImageFromS3(key);

    res.status(200).json({ status: true, message: "Image deleted successfully." });

  } catch (error) {
    console.error("Error in deleteImageInAws:", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};
