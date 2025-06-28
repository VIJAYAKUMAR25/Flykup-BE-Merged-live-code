import cron from 'node-cron';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const GEOIP_PATH = path.resolve(process.cwd(), 'geoip-data/GeoLite2-City.mmdb');

export const scheduleGeoIPUpdates = () => {
    // Weekly update (every Sunday at 2 AM)
    cron.schedule('0 2 * * 0', () => {
        console.log('Running scheduled GeoIP database update...');
        
        exec('npm run update-geoip', (error, stdout, stderr) => {
            if (error) {
                console.error('GeoIP update failed:', error);
                return;
            }
            
            console.log('GeoIP update completed:', stdout);
            
            // Check if new file was downloaded
            if (fs.existsSync(GEOIP_PATH)) {
                console.log('New GeoIP database is ready');
                // Reload the database
                loadGeoIPDatabase();
            } else {
                console.warn('GeoIP database not found after update');
            }
        });
    });
    
    console.log('Scheduled GeoIP updates enabled (weekly on Sundays at 2 AM)');
};