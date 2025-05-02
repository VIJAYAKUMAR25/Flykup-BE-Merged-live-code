import Settings from '../models/settings.model.js';
import User from '../models/user.model.js';
import Seller from '../models/seller.model.js';

// Function to update or create app settings
export const updateAppSettings = async (req, res) => {
    try {
        // Check if settings already exist
        let settings = await Settings.findOne();

        if (settings) {
            // If settings exist, update them with new data
            settings.appSettings = {
                ...settings.appSettings,
                ...req.body.appSettings
            };

            await settings.save();

            // Update user and seller app versions if provided using $set
            if (req.body.appSettings.userAppVersion) {
                await User.updateMany({}, { $set: { userAppVersion: req.body.appSettings.userAppVersion } });
            }
            if (req.body.appSettings.sellerAppVersion) {
                await Seller.updateMany({}, { $set: { sellerAppVersion: req.body.appSettings.sellerAppVersion } });
            }

            return res.status(200).json({ message: 'Settings updated successfully', settings });
        } else {
            // If settings don't exist, create new settings
            settings = new Settings({
                appSettings: req.body.appSettings
            });

            await settings.save();

            // Update user and seller app versions if provided using $set
            if (req.body.appSettings.userAppVersion) {
                await User.updateMany({}, { $set: { userAppVersion: req.body.appSettings.userAppVersion } });
            }
            if (req.body.appSettings.sellerAppVersion) {
                await Seller.updateMany({}, { $set: { sellerAppVersion: req.body.appSettings.sellerAppVersion } });
            }

            return res.status(201).json({ message: 'Settings created successfully', settings });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating settings', error });
    }
};

// Function to get app settings
export const getAppSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        
        if (!settings) {
            return res.status(404).json({ 
                status: false,
                message: 'Settings not found' 
            });
        }

        return res.status(200).json({
            status: true,
            data: settings
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            status: false,
            message: 'An error occurred while fetching settings',
            error: error.message
        });
    }
};
