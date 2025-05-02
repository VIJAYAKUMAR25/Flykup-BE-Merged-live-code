import { SendTemplatedEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

// const SOURCE_EMAIL = process.env.MAILING_EMAIL || "flykupindia@gmail.com";

const SOURCE_EMAIL = "kpushparaj18@gmail.com";

// Generic send function
const sendTemplatedEmail = async (toAddress, templateName, templateData) => {
  const params = {
    Source: SOURCE_EMAIL,
    Destination: { ToAddresses: [toAddress] },
    Template: templateName,
    TemplateData: JSON.stringify(templateData)
  };

  try {
    return await sesClient.send(new SendTemplatedEmailCommand(params));
  } catch (error) {
    console.error("Error sending templated email:", error);
  }
};

export const otpSES = (email, userName = "User" , verificationCode="123456") => {
  return sendTemplatedEmail(email, "emailOtp", { userName, verificationCode });
};

export const welcomeSES = (email, userName = "User") => {
  return sendTemplatedEmail(email, "welcomeEmail", { userName });
};

export const passwordChangedSES = (email, userName = "User") => {
  return sendTemplatedEmail(email, "passwordChanged", { userName });
};

export const applicationReceivedSES = (email, userName = "User") => {
  return sendTemplatedEmail(email, "applicationReceived", { userName });
};

export const applicationAcceptedSES = (email, userName = "User") => {
  return sendTemplatedEmail(email, "applicationAccepted", { userName });
};

export const applicationRejectedSES = (email, userName = "User" , rejectedReason = "Incorrect details") => {
  return sendTemplatedEmail(email, "applicationRejected", { userName , rejectedReason});
};
