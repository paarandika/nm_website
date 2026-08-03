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
 * The layout comes from CONFIG below, which is pasted verbatim from the "Copy config"
 * button in tools/og-studio.html. Open the studio, drag things until the card looks
 * right, paste the result over CONFIG, run `npm run og`. The two files render from the
 * same numbers by the same rules, so what the studio shows is what the PNG contains.
 *
 * Square, not the usual 1.91:1: WhatsApp centre-crops link previews towards a square on
 * most clients, which lopped the ends off a 1200x630 headline. The card is built at the
 * ratio the worst-behaved consumer will actually show.
 *
 * The card uses the site's own palette, wordmark and skyline so the preview and the page
 * a reader lands on look like the same thing.
 */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { findChrome } = require('./chrome');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'og-card.png');

// WhatsApp is the strictest consumer of this file: past roughly this size it quietly
// declines to show a preview at all. Asserted after rendering rather than hoped for.
const MAX_BYTES = 300 * 1024;

const BONE = '#F1EEE6';
const INK = '#161B33';
const SAFFRON = '#E5A823';
const LINE = '#D6D1C4';
const MUTED = '#6B6E85';

// Must match RATIOS in tools/og-studio.html.
const RATIOS = { '1:1': [1200, 1200], '1.91:1': [1200, 628], '4:5': [1080, 1350] };

// ---- pasted from the studio -------------------------------------------------------
const CONFIG = {
  ratio: '1:1',
  copy: 'Machines\nthat *know.*',
  eyebrow: 'Deep AI · Research · Bespoke AI solutions',
  hs: 204,
  lh: 109,
  es: 23,
  eg: 20,
  fs: 25,
  lw: 503,
  lockMode: 'full',
  sw: 112,
  sx: 35,
  sy: 3,
  st: 65,
  ft: 0,
  fe: 10,
  lock: { x: 72, y: 64 },
  text: { x: 72, y: 300 },
  foot: { x: 72, y: 1090 }
};
// -----------------------------------------------------------------------------------

/** `*word*` marks saffron italic, matching the studio's headline box. */
function headline(copy) {
  return copy
    .split('\n')
    .map((line) => line.replace(/\*([^*]+)\*/g, '<em>$1</em>'))
    .join('<br>');
}

/**
 * The skyline carries no stroke of its own - on the site it inherits `currentColor` from
 * CSS - so the colours are applied here. The saffron tower is g0-0-7, the focal element.
 *
 * The drawing has ~30.6 units of blank canvas below the horizon (viewBox height 749.7,
 * ground line at y=719.1). Left alone that skirt would float the city above the card's
 * bottom edge, so it is pulled off by the same amount, scaled to the rendered width.
 * Same reasoning as _skirtUnits() in index.html, and the same maths as the studio.
 */
function skyline(cfg, w) {
  const svg = fs.readFileSync(path.join(ROOT, 'assets', 'colombo-skyline-lite.svg'), 'utf8');
  const skirt = Math.round(30.6 * ((w * cfg.sw / 100) / 1314.9));
  const bottom = -skirt + cfg.sy;
  const mid = (cfg.ft + cfg.fe) / 2;
  const mask = `linear-gradient(to bottom, transparent ${cfg.ft}%, rgba(0,0,0,.5) ${mid}%, #000 ${cfg.fe}%)`;
  return `<div class="sky" style="width:${cfg.sw}%; left:${cfg.sx}px; bottom:${bottom}px;
    -webkit-mask-image:${mask}; mask-image:${mask}">${svg}</div>`;
}

/**
 * The lockup is one SVG on a 360x80 viewBox: mark at left, wordmark to its right.
 * Cropping the viewBox to the mark's own 72 units isolates it without a second asset.
 * It ships bone-on-dark, so it is recoloured for the bone card; the saffron arc stays.
 */
function lockup(cfg) {
  if (cfg.lockMode === 'off') return '';
  const svg = fs.readFileSync(path.join(ROOT, 'assets', 'logo-lockup-bone.svg'), 'utf8');
  const vbW = cfg.lockMode === 'mark' ? 72 : 360;
  return svg
    .replace(/#F1EEE6/g, INK)
    .replace(/viewBox="[^"]*"/, `viewBox="0 0 ${vbW} 80"`)
    .replace(/width="[^"]*" height="[^"]*"/, `width="${cfg.lw * (vbW / 360)}" height="${cfg.lw * (80 / 360)}"`);
}

function card(cfg, w, h) {
  return `<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500&family=Geist+Mono:wght@400;500&display=block">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${w}px; height: ${h}px; overflow: hidden; }
  body { background: ${BONE}; font-family: 'Geist', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
  .frame { position: relative; width: ${w}px; height: ${h}px; overflow: hidden; }

  .sky { position: absolute; line-height: 0; }
  .sky svg { display: block; width: 100%; height: auto; }
  .sky path { fill: none; stroke: ${LINE}; stroke-width: ${cfg.st / 100}; stroke-linecap: round; stroke-linejoin: round; }
  .sky #g0-0-7 path { stroke: ${SAFFRON}; }

  /* Absolutely positioned children resolve against this box, so the coordinates in
     CONFIG are measured from the card's own edges - exactly as in the studio. */
  .content { position: absolute; inset: 0; }
  #lock { position: absolute; left: ${cfg.lock.x}px; top: ${cfg.lock.y}px; }
  #lock svg { display: block; }
  #text { position: absolute; left: ${cfg.text.x}px; top: ${cfg.text.y}px; max-width: 90%; }
  .eyebrow {
    font-family: 'Geist Mono', monospace; font-size: ${cfg.es}px; letter-spacing: 0.08em;
    color: ${SAFFRON}; white-space: nowrap;
  }
  h1 {
    font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; color: ${INK};
    font-size: ${cfg.hs}px; line-height: ${cfg.lh / 100}; letter-spacing: -0.025em;
    margin-top: ${cfg.eg}px; white-space: pre-wrap;
  }
  h1 em { font-style: italic; color: ${SAFFRON}; }
  #foot {
    position: absolute; left: ${cfg.foot.x}px; top: ${cfg.foot.y}px;
    display: flex; align-items: baseline; gap: 14px;
    font-size: ${cfg.fs}px; color: ${MUTED}; white-space: nowrap;
  }
  #foot b { font-family: 'Geist Mono', monospace; font-weight: 500; color: ${INK}; }
  #foot i { font-style: normal; color: ${LINE}; }
</style>
<div class="frame">
  ${skyline(cfg, w)}
  <div class="content">
    <div id="lock">${lockup(cfg)}</div>
    <div id="text">
      <div class="eyebrow">${cfg.eyebrow}</div>
      <h1>${headline(cfg.copy)}</h1>
    </div>
    <div id="foot"><b>noesismachines.ai</b><i>/</i><span>Colombo, Sri Lanka</span></div>
  </div>
</div>`;
}

function screenshot(chrome, file, out, w, h) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'nm-og-'));
  return new Promise((resolve, reject) => {
    const child = spawn(chrome, [
      '--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
      `--window-size=${w},${h}`,
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
  const size = RATIOS[CONFIG.ratio];
  if (!size) throw new Error(`unknown ratio ${CONFIG.ratio} - expected one of ${Object.keys(RATIOS)}`);
  const [w, h] = size;

  const chrome = findChrome();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nm-og-src-'));
  const file = path.join(dir, 'card.html');
  fs.writeFileSync(file, card(CONFIG, w, h));

  try {
    await screenshot(chrome, file, OUT, w, h);
    const bytes = fs.statSync(OUT).size;
    if (bytes > MAX_BYTES) {
      throw new Error(
        `og-card.png is ${(bytes / 1024).toFixed(0)} KB, over the ${MAX_BYTES / 1024} KB ` +
        'budget - WhatsApp may drop it. Simplify the card or shrink the skyline.'
      );
    }
    console.log(`browser:     ${chrome}`);
    console.log(`og-card.png: ${(bytes / 1024).toFixed(0)} KB (${w}x${h}, ${CONFIG.ratio})`);
    console.log(`next:        og:image:width/height in index.html must say ${w} and ${h}`);
    console.log('             (npm run build fails if they disagree, so this is checked).');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error('og-image failed:', err.message);
  process.exit(1);
});
