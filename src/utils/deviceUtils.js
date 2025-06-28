import { UAParser } from 'ua-parser-js';
import { loadGeoIPDatabase } from './geoip-loader.js';

// Get location from IP
export const getLocationFromIP = async (ip) => {
  const lookup = await loadGeoIPDatabase();
  
  try {
    console.log(`[GeoIP] Looking up IP: ${ip}`);

    // Handle localhost case
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
    if (!result) {
      return {
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown'
      };
    }

    return {
      city: result.city?.names?.en || 'Unknown',
      region: result.subdivisions?.[0]?.iso_code || 'Unknown',
      country: result.country?.iso_code || 'Unknown'
    };
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