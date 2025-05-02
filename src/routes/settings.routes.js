import express from 'express';
import { updateAppSettings, getAppSettings } from '../controllers/settings.controller.js';

const settingsRouter = express.Router();

// Route to update app settings
settingsRouter.put('/update', updateAppSettings);

// Route to get app settings
settingsRouter.get('/get', getAppSettings);

export default settingsRouter;
