import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  appSettings: {
    sellerAppVersion: {
      type: String,
      default: '0.0.1'
    },
    userAppVersion: {
      type: String, 
      default: '0.0.1'
    }
  }
});

const Settings = mongoose.model('Settings', SettingsSchema);

export default Settings;
