import { CreateTemplateCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";
import { APPLICATION_ACCEPTED_EMAIL, APPLICATION_REJECTED_EMAIL, EMAIL_OTP, PASSWORD_CHANGED_EMAIL, RECEIVED_SELLER_APPLICATION_EMAIL, WELCOME_EMAIL } from "./templates.js";

// Template configurations
const templates = [
  {
    name: "welcomeEmail",
    subject: "Welcome To Flykup",
    html: WELCOME_EMAIL
  },
  {
    name: "emailOtp",
    subject: "Verification OTP",
    html: EMAIL_OTP
  },
  {
    name: "passwordChanged",
    subject: "Password Changed Successfully",
    html: PASSWORD_CHANGED_EMAIL
  },
  {
    name: "applicationReceived",
    subject: "Seller Application Received",
    html: RECEIVED_SELLER_APPLICATION_EMAIL
  },
  {
    name: "applicationAccepted",
    subject: "Congratulations! Your Seller Application is Approved",
    html: APPLICATION_ACCEPTED_EMAIL
  },
  {
    name: "applicationRejected",
    subject: "Application rejected",
    html: APPLICATION_REJECTED_EMAIL
  }
];

const createTemplates = async () => {
    for (const template of templates) {
      const params = {
        Template: {
          TemplateName: template.name,
          SubjectPart: template.subject,
          HtmlPart: template.html
        }
      };
  
      try {
        const response = await sesClient.send(new CreateTemplateCommand(params));
        console.log(`Template "${template.name}" created successfully`, response);
      } catch (error) {
        console.error(`Failed to create template "${template.name}":`, error);
      }
    }
  };
  
  createTemplates();
  