import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESSKEYID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRETACCESSKEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET = process.env.AWS_BUCKET;

// Create an S3 client
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESSKEYID,
    secretAccessKey: AWS_SECRETACCESSKEY,
  },
});

// Upload buffer to S3
export const uploadBufferToS3 = async (buffer, path) => {
  try {
    const key = `${path}/${uuidv4()}.jpg`;

    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET,
      Key: key,
      Body: buffer,
      ACL: "public-read", 
      ContentType: "image/jpeg"
    });

    await s3Client.send(command);

    const jpgURL = `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;

    return { jpgURL, key };
  } catch (error) {
    console.error("Error uploading to S3:", error.message || error);
    throw new Error(`Failed to upload image to S3 ${error.message}`);
  }
};


export const deleteImageFromS3 = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: AWS_BUCKET,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting from S3:", error.message || error);
    throw new Error(`Failed to delete image from S3 ${error.message}`);
  }
};


