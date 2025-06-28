import maxmind from 'maxmind';
import fs from 'fs';
import path from 'path';

// Path to the GeoIP database
const GEOIP_PATH = path.resolve(process.cwd(), 'geoip-data/GeoLite2-City.mmdb');
const BACKUP_PATH = path.resolve(process.cwd(), 'geoip-data/GeoLite2-City.backup.mmdb');

let cityLookup = null;
let lastModified = 0;

export const loadGeoIPDatabase = async () => {
  try {
    // Check if database file exists
    if (!fs.existsSync(GEOIP_PATH)) {
      console.error('GeoIP database not found. Please run "npm run update-geoip"');
      return null;
    }

    // Check if file has been modified since last load
    const stats = fs.statSync(GEOIP_PATH);
    if (stats.mtimeMs <= lastModified) {
      return cityLookup;
    }

    console.log('Loading GeoIP database...');
    
    // Create backup before loading new version
    if (fs.existsSync(GEOIP_PATH)) {
      fs.copyFileSync(GEOIP_PATH, BACKUP_PATH);
    }

    // Load the database
    cityLookup = await maxmind.open(GEOIP_PATH, {
      watchForUpdates: true,
      watchForUpdatesNonPersistent: true,
      watchForUpdatesHook: async () => {
        console.log('GeoIP database update detected. Reloading...');
        await loadGeoIPDatabase();
      }
    });

    lastModified = stats.mtimeMs;
    console.log('GeoIP database loaded successfully');
    return cityLookup;
  } catch (error) {
    console.error('Failed to load GeoIP database:', error);
    
    // Try to restore from backup
    if (fs.existsSync(BACKUP_PATH)) {
      console.log('Attempting to restore from backup...');
      try {
        fs.copyFileSync(BACKUP_PATH, GEOIP_PATH);
        return loadGeoIPDatabase();
      } catch (restoreError) {
        console.error('Failed to restore backup:', restoreError);
      }
    }
    
    return null;
  }
};

// Initialize immediately
loadGeoIPDatabase();