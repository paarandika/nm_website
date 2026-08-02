/**
 * Render assets/og-card.png - the preview image WhatsApp, iMessage, Slack, LinkedIn and
 * X show when someone pastes a link to the site.
 *
 *     npm run og
 *
 * Run locally and commit the PNG; nothing at deploy time depends on this. It is here so
 * the card can be regenerated from source when the wordmark or headline changes, rather
 * than being an opaque binary nobody can reproduce.
 *
 * 1200x630 is the size every scraper agrees on. WhatsApp in particular will silently fall
 * back to a tiny thumbnail - or nothing - if the file is large, so the size is asserted
 * below rather than left to chance.
 *
 * The card is drawn with the site's own palette, wordmark and skyline so that the preview
 * and the page a reader lands on look like the same thing.
 */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { findChrome } = require('./chrome');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'og-card.png');

const WIDTH = 1200;
const HEIGHT = 630;
// WhatsApp is the strictest consumer of this file. Keep well under its limit.
const MAX_BYTES = 300 * 1024;

const BONE = '#F1EEE6';
const INK = '#161B33';
const SAFFRON = '#E5A823';
const LINE = '#D6D1C4';
const MUTED = '#6B6E85';

/**
 * The skyline carries no stroke of its own - on the site it inherits `currentColor` from
 * CSS - so the colours are applied here. The saffron tower is g0-0-7, the focal element.
 *
 * The drawing has ~30 units of empty canvas below the horizon line (viewBox height 749.7,
 * ground line at y=719.1). Left alone that blank skirt would sit at the bottom of the
 * card and float the city above the edge, so it is pulled off the bottom by the same
 * amount, scaled to the card width. Same reasoning as _skirtUnits() in index.html.
 */
function skyline() {
  const svg = fs.readFileSync(path.join(ROOT, 'assets', 'colombo-skyline-lite.svg'), 'utf8');
  const skirt = Math.round((749.7 - 719.1) * (WIDTH / 1314.9));
  return `<div class="sky" style="bottom:${-skirt}px">${svg}</div>`;
}

/** The bone-on-dark lockup recoloured for a bone card; the saffron arc is left alone. */
function lockup() {
  const svg = fs.readFileSync(path.join(ROOT, 'assets', 'logo-lockup-bone.svg'), 'utf8');
  return svg.replace(/#F1EEE6/g, INK).replace(/width="360" height="80"/, 'width="300" height="67"');
}

function card() {
  return `<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500&family=Geist+Mono:wght@400;500&display=block">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  body {
    background: ${BONE};
    font-family: 'Geist', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .card { position: relative; width: 100%; height: 100%; padding: 64px 72px; }

  .sky { position: absolute; left: 0; right: 0; line-height: 0; }
  .sky svg { display: block; width: 100%; height: auto; }
  .sky path { fill: none; stroke: ${LINE}; stroke-width: 0.55; stroke-linecap: round; stroke-linejoin: round; }
  .sky #g0-0-7 path { stroke: ${SAFFRON}; }
  /* Fade the drawing out under the copy so the headline never fights the line art. */
  .sky { -webkit-mask-image: linear-gradient(to bottom, transparent 34%, rgba(0,0,0,.5) 54%, #000 74%); }

  .content { position: relative; height: 100%; display: flex; flex-direction: column; }
  .eyebrow {
    font-family: 'Geist Mono', monospace; font-size: 15px; letter-spacing: 0.08em;
    color: ${SAFFRON}; margin-top: 52px;
  }
  h1 {
    font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; font-size: 108px;
    line-height: 1.0; letter-spacing: -0.025em; color: ${INK}; margin-top: 20px;
  }
  h1 em { font-style: italic; color: ${SAFFRON}; }
  .foot {
    margin-top: auto; display: flex; align-items: baseline; gap: 14px;
    font-size: 19px; color: ${MUTED};
  }
  .foot b { font-family: 'Geist Mono', monospace; font-weight: 500; color: ${INK}; }
  .foot span { color: ${LINE}; }
</style>
<div class="card">
  ${skyline()}
  <div class="content">
    ${lockup()}
    <div class="eyebrow">Deep AI · Research · Bespoke AI solutions</div>
    <h1>Machines that <em>know.</em></h1>
    <div class="foot"><b>noesismachines.ai</b><span>/</span>Colombo, Sri Lanka</div>
  </div>
</div>`;
}

function screenshot(chrome, file, out) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'nm-og-'));
  return new Promise((resolve, reject) => {
    const child = spawn(chrome, [
      '--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
      `--window-size=${WIDTH},${HEIGHT}`,
      // Long enough for the webfonts to arrive; the card is worthless in fallback faces.
      '--virtual-time-budget=15000',
      `--user-data-dir=${profile}`,
      `--screenshot=${out}`,
      `file://${file.replace(/\\/g, '/')}`
    ], { stdio: ['ignore', 'ignore', 'ignore'] });

    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error('browser timed out'));
    }, 120000);
    child.on('error', (err) => { clearTimeout(timer); reject(err); });
    child.on('close', (code) => {
      clearTimeout(timer);
      fs.rmSync(profile, { recursive: true, force: true });
      // Chrome exits non-zero on some Windows builds even after writing the file, so the
      // screenshot's existence is the real success signal.
      if (!fs.existsSync(out)) reject(new Error(`no screenshot written (browser exited ${code})`));
      else resolve();
    });
  });
}

async function main() {
  const chrome = findChrome();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nm-og-src-'));
  // Written beside a copy of assets/ so the inlined SVGs resolve any relative refs.
  const file = path.join(dir, 'card.html');
  fs.writeFileSync(file, card());

  try {
    await screenshot(chrome, file, OUT);
    const bytes = fs.statSync(OUT).size;
    if (bytes > MAX_BYTES) {
      throw new Error(
        `og-card.png is ${(bytes / 1024).toFixed(0)} KB, over the ${MAX_BYTES / 1024} KB ` +
        'budget - WhatsApp may drop it. Simplify the card.'
      );
    }
    console.log(`browser:     ${chrome}`);
    console.log(`og-card.png: ${(bytes / 1024).toFixed(0)} KB (${WIDTH}x${HEIGHT})`);
    console.log('commit assets/og-card.png.');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error('og-image failed:', err.message);
  process.exit(1);
});
