/**
 * Locate an installed Chrome. Shared by the two local-only tools that need a real browser
 * (tools/snapshot.js and tools/og-image.js). Neither runs on Vercel - see the note at the
 * top of tools/snapshot.js for why.
 */
const fs = require('fs');

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
].filter(Boolean);

function findChrome() {
  for (const p of CANDIDATES) if (fs.existsSync(p)) return p;
  throw new Error(
    'no Chrome found. Set CHROME_PATH to your browser binary, or install Google Chrome.'
  );
}

module.exports = { findChrome };
