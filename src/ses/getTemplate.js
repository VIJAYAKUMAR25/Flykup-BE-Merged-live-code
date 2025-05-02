import { GetTemplateCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

const checkTemplate = async (templateName) => {
  try {
    const response = await sesClient.send(new GetTemplateCommand({ TemplateName: templateName }));
    console.log("Template details:", response.Template);
  } catch (error) {
    console.error(`Template "${templateName}" not found:`, error);
  }
};

checkTemplate("emailOtp");
