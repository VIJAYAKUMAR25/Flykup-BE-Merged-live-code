import { SESClient } from "@aws-sdk/client-ses";

// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION , credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET_KEY
}});
export { sesClient };