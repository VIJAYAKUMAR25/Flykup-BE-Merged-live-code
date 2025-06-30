import { UAParser } from 'ua-parser-js';
import { loadGeoIPDatabase } from './geoip-loader.js';

// Create a cache to store IP location results in memory
const ipLocationCache = new Map();

// Get location from IP
export const getLocationFromIP = async (ip) => {
    // 1. Check if the location is already in our cache
    if (ipLocationCache.has(ip)) {
        return ipLocationCache.get(ip);
    }

    const lookup = await loadGeoIPDatabase();

    try {
        console.log(`[GeoIP] Looking up IP: ${ip}`);

        if (ip === '127.0.0.1' || ip === '::1') {
            console.log('[GeoIP] IP is localhost, returning "Local".');
            return {
                city: 'Local',
                region: 'Local',
                country: 'Local'
            };
        }

        if (!lookup) {
            console.warn('[GeoIP] Database not loaded');
            return {
                city: 'Unknown',
                region: 'Unknown',
                country: 'Unknown'
            };
        }

        const result = lookup.get(ip);
        let location;

        if (!result) {
            location = {
                city: 'Unknown',
                region: 'Unknown',
                country: 'Unknown'
            };
        } else {
            location = {
                city: result.city?.names?.en || 'Unknown',
                region: result.subdivisions?.[0]?.iso_code || 'Unknown',
                country: result.country?.iso_code || 'Unknown'
            };
        }

        // 2. Store the new location result in the cache before returning
        ipLocationCache.set(ip, location);

        return location;

    } catch (error) {
        console.error('[GeoIP] Lookup failed:', error);
        return {
            city: 'Error',
            region: 'Error',
            country: 'Error'
        };
    }
};

// Parse user agent
export const parseUserAgent = (userAgent) => {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
        device: result.device.type || 'desktop',
        browser: result.browser.name || 'Unknown',
        os: result.os.name || 'Unknown'
    };
};