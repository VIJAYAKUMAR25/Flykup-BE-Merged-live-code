import maxmind from 'maxmind';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Path to the GeoIP database
const GEOIP_DIR = path.resolve(process.cwd(), 'geoip-data');
const GEOIP_PATH = path.resolve(GEOIP_DIR, 'GeoLite2-City.mmdb');
const BACKUP_PATH = path.resolve(GEOIP_DIR, 'GeoLite2-City.backup.mmdb');

let cityLookup = null;
let lastModified = 0;

// Create directory if not exists
if (!fs.existsSync(GEOIP_DIR)) {
    fs.mkdirSync(GEOIP_DIR, { recursive: true });
}

// Predefined Indian regions for faster lookup
const INDIAN_REGIONS = new Set([
    'IN', 'IND', 'India', 'INDIA', 'BH', 'BR', 'CT', 'GA', 'GJ', 'HR', 
    'HP', 'JK', 'JH', 'KA', 'KL', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 
    'OR', 'PB', 'RJ', 'SK', 'TN', 'TG', 'TR', 'UP', 'UT', 'WB'
]);

export const loadGeoIPDatabase = async () => {
    try {
        // Check if database file exists
        if (!fs.existsSync(GEOIP_PATH)) {
            console.error('GeoIP database not found. Attempting to download...');
            try {
                execSync('npm run update-geoip', { stdio: 'inherit' });
            } catch (e) {
                console.error('Failed to download GeoIP database:', e);
                return null;
            }
        }

        // Check if file has been modified since last load
        const stats = fs.statSync(GEOIP_PATH);
        if (stats.mtimeMs <= lastModified && cityLookup !== null) {
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

export const getLocationFromIP = (ip) => {
    if (!cityLookup) {
        console.error('GeoIP database not loaded');
        return {
            city: 'Unknown',
            region: 'Unknown',
            country: 'Unknown',
            isIndianRegion: false
        };
    }
    
    // Handle local IPs
    if (ip === '::1' || ip === '127.0.0.1') {
        return {
            city: 'Local',
            region: 'Development',
            country: 'Localhost',
            isIndianRegion: false
        };
    }
    
    try {
        const location = cityLookup.get(ip);
        if (!location) {
            return {
                city: 'Unknown',
                region: 'Unknown',
                country: 'Unknown',
                isIndianRegion: false
            };
        }
        
        // Extract country code
        const countryCode = location.country?.iso_code || 'Unknown';
        const isIndian = INDIAN_REGIONS.has(countryCode);
        
        // Optimize for Indian regions
        const region = isIndian 
            ? location.subdivisions?.[0]?.iso_code || 'Unknown'
            : location.subdivisions?.[0]?.names?.en || 'Unknown';
        
        return {
            city: location.city?.names?.en || 'Unknown',
            region: region,
            country: countryCode,
            isIndianRegion: isIndian
        };
    } catch (error) {
        console.error(`Error looking up IP ${ip}:`, error);
        return {
            city: 'Error',
            region: 'Error',
            country: 'Error',
            isIndianRegion: false
        };
    }
};

// Initialize immediately
loadGeoIPDatabase();