// download-geoip.mjs
import fs from 'fs';
import { pipeline } from 'stream/promises';
import 'dotenv/config'; // Automatically loads .env file

async function downloadFile() {
  const licenseKey = process.env.MAXMIND_LICENSE_KEY;

  if (!licenseKey) {
    console.error('Error: MAXMIND_LICENSE_KEY not found in .env file.');
    process.exit(1);
  }

  const url = `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${licenseKey}&suffix=tar.gz`;
  const destination = 'geoip.tar.gz';

  console.log('Downloading GeoIP database...');

  try {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Download failed with status: ${response.status} ${response.statusText}`);
    }

    await pipeline(response.body, fs.createWriteStream(destination));

    console.log('GeoIP database downloaded successfully.');
  } catch (error) {
    console.error('An error occurred during download:', error.message);
    process.exit(1);
  }
}

downloadFile();