// import geoip from 'geoip-lite';

// const blockedRegions = ['TN', 'KL']; // Tamil Nadu, Kerala
// const blockedCountries = ['IN'];     // India (country code)

// export function blockAccessMiddleware(req, res, next) {
    
//   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   const geo = geoip.lookup(ip);

//   console.log('IP:', ip);
//   console.log('Geo:', geo);


//   if (geo) {
//     // 1️⃣ First check if region is blocked
//     if (geo.region && blockedRegions.includes(geo.region)) {
//       return res.status(403).send('Access blocked for your region.');
//     }

//     // 2️⃣ Then check if country is blocked
//     if (geo.country && blockedCountries.includes(geo.country)) {
//       return res.status(403).send('Access blocked for your country.');
//     }
//   }

//   next(); // Allow if not blocked
// }



// Dynamically fetch blocked regions from the database

import geoip from 'geoip-lite';
import BlockedRegion from '../models/blockedRegion.models.js';

export async function blockAccessMiddleware(req, res, next) {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    // console.log('IP:', ip);
    // console.log('Geo:', geo);

    const blockedRegionsFromDB = await BlockedRegion.find();

    if (geo) {
      const userCountry = geo.country; // like "IN"
      const userRegion = geo.region;   // like "TN"

      console.log('User Country:', userCountry);
      console.log('User Region:', userRegion);

      for (const block of blockedRegionsFromDB) {
        const blockCountry = block.country;
        const blockRegion = block.region;

        // 🛑 If block has country but no specific region -> block whole country
        if (blockCountry && !blockRegion && blockCountry === userCountry) {
          return res.status(403).send('Access blocked for your country.');
        }

        // 🛑 If block has both country + region -> block only that region inside the country
        if (blockCountry && blockRegion && blockCountry === userCountry && blockRegion === userRegion) {
          return res.status(403).send('Access blocked for your region.');
        }
      }
    }

    next();
  } catch (error) {
    console.error('Error in blockAccessMiddleware:', error);
    res.status(500).send('Internal Server Error in block middleware');
  }
}

