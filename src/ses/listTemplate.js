import { ListTemplatesCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

const listTemplates = async () => {
  try {
    const response = await sesClient.send(new ListTemplatesCommand({ MaxItems: 10 }));
    console.log("Available templates:", response.TemplatesMetadata);
  } catch (error) {
    console.error("Error fetching templates:", error);
  }
};

listTemplates();
