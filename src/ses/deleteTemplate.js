import { DeleteTemplateCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

const deleteTemplate = async (templateName) => {
  try {
    const response = await sesClient.send(new DeleteTemplateCommand({ TemplateName: templateName }));
    console.log(`Template "${templateName}" deleted successfully`, response);
  } catch (error) {
    console.error(`Failed to delete template "${templateName}":`, error);
  }
};


deleteTemplate("testEmail");
