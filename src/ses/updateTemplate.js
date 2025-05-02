import { UpdateTemplateCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

const updateTemplate = async () => {
  const params = {
    Template: {
      TemplateName: "testEmail",
      SubjectPart: "Your New test template",
      HtmlPart: "<html><body><h1>Hi {{userName}},</h1><p>template updated successfully {{otp}}</p></body></html>"
    }
  };

  try {
    const response = await sesClient.send(new UpdateTemplateCommand(params));
    console.log(`Template updated successfully`, response);
  } catch (error) {
    console.error(`Failed to update template:`, error);
  }
};

updateTemplate();
