/**
 * Assemble dist/. Runs on Vercel; needs nothing but Node.
 *
 * The prerendered shell is produced separately by `npm run snapshot`, which needs a real
 * browser and so runs locally (see the note at the top of tools/snapshot.js). This step
 * only inlines the committed shell.html ahead of the <x-dc> template and copies the site
 * around it.
 *
 * Why the shell goes *in front of* the template rather than replacing it: support.js
 * treats the contents of <x-dc> as its template - the `{{ }}` bindings, <sc-for>, refs
 * and event attributes all live there - and swaps that element for <div id="dc-root">
 * once mounted. Overwriting the source with rendered output would destroy the template
 * and leave the page uninteractive. The component removes the shell as its first act on
 * mount.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SHELL = path.join(ROOT, 'shell.html');

// Copied into dist/. Anything not listed is not deployed. vercel.json is deliberately
// absent: Vercel reads it from the repo root, and a copy here would be served publicly.
const COPY = ['support.js', 'robots.txt', 'assets', 'vendor'];

// og:image is a single tag that WhatsApp, Facebook, LinkedIn and Slack all read, so there
// is no markup that gives each a different picture. The platforms crop in opposite
// directions - WhatsApp inwards to a square, the rest down to 1.91:1 - and no one frame
// survives both. The way out is to serve a second copy of the page whose only difference
// is which card it points at, and let the User-Agent rewrite in vercel.json pick. This
// page is noindex'd there; it is a duplicate of the real one.
// Two things about that rewrite are easy to get wrong and fail silently, and vercel.json
// cannot carry a comment saying so - its schema rejects unknown keys:
//
//   - `has[].value` compiles as a JS RegExp, which has no inline flags. `(?i)` is a
//     SyntaxError there and Vercel drops the whole rule without a word, so the pattern
//     spells its own case-insensitivity: `.*[Ww]hats[Aa]pp.*`.
//   - `cleanUrls` 308s /index-wa.html to /index-wa, so the rewrite destination and the
//     X-Robots-Tag header source both name the extensionless path. Pointing either at the
//     .html form aims it at a redirect.
const WA_PAGE = 'index-wa.html';
const WA_CARD = 'og-card-square.png';

// Newlines are normalised before hashing. With core.autocrlf the working tree is CRLF and
// the git index is LF, so hashing raw bytes makes a Windows checkout and a Linux CI clone
// disagree about an identical file - which is exactly how this guard first fired.
function templateHash(src) {
  const start = src.indexOf('<x-dc>');
  const end = src.indexOf('</x-dc>');
  if (start < 0 || end < 0) throw new Error('index.html has no <x-dc> block');
  const template = src.slice(start, end).replace(/\r\n/g, '\n');
  return crypto.createHash('sha256').update(template).digest('hex').slice(0, 16);
}

function copyInto(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) copyInto(path.join(src, entry), path.join(dest, entry));
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

/**
 * The shell if it is usable, or null with a reason logged.
 *
 * Deliberately never fatal. The site renders itself on the client; the shell only brings
 * first paint forward and hands body copy to crawlers that do not run JS. Shipping without
 * it costs a few hundred milliseconds - refusing to deploy costs the whole site, which is
 * the worse failure by a wide margin. A stale shell *is* still rejected, because painting
 * copy that then changes under the reader is worse than painting nothing; it is just
 * rejected by dropping the shell rather than by killing the build.
 */
function loadShell(src) {
  const skip = (why) => { console.warn(`warning: no prerendered shell - ${why}`); return null; };

  if (!fs.existsSync(SHELL)) return skip('shell.html is missing. Run `npm run snapshot`.');
  const raw = fs.readFileSync(SHELL, 'utf8');

  const stamped = /template ([0-9a-f]{16})/.exec(raw);
  const current = templateHash(src);
  if (!stamped) return skip('shell.html has no template stamp. Run `npm run snapshot`.');
  if (stamped[1] !== current) {
    return skip(
      `shell.html is stale (built from ${stamped[1]}, index.html is now ${current}). ` +
      'Run `npm run snapshot` and commit the result.'
    );
  }

  const shell = raw.replace(/^<!--[^]*?-->\n?/, '').trim();
  if (!shell) return skip('shell.html is empty. Run `npm run snapshot`.');
  if (shell.includes('{{')) return skip('shell.html has unresolved {{ }} bindings.');
  return shell;
}

/**
 * The WhatsApp copy of the page: same bytes, different og:image and height. Each swap is
 * asserted, so a change to how the tags are written fails the build here rather than
 * silently producing a variant identical to the original.
 */
function whatsappVariant(html) {
  const png = fs.readFileSync(path.join(ROOT, 'assets', WA_CARD));
  const height = png.readUInt32BE(20);

  const swaps = [
    ['og:image', /(property="og:image" content="https:\/\/[^"]+\/)og-card\.png"/, `$1${WA_CARD}"`],
    ['og:image:height', /(property="og:image:height" content=")\d+"/, `$1${height}"`]
  ];
  let out = html;
  for (const [what, find, replace] of swaps) {
    const next = out.replace(find, replace);
    if (next === out) throw new Error(`could not rewrite ${what} for ${WA_PAGE} - the tag's shape changed`);
    out = next;
  }
  return out;
}

/**
 * Everything a link card depends on, checked on one built page. Scrapers do not run
 * scripts and only read <head>, so if these tags drift into the <helmet> block -
 * where the rest of the page's head content lives, so it is an easy mistake - support.js
 * would still place them at runtime and every browser would look fine, while every pasted
 * link silently lost its card. Assert on position, not just presence.
 */
function checkCard(built, file) {
  const head = built.slice(0, built.indexOf('</head>'));
  const required = [
    'og:title', 'og:description', 'og:image', 'og:url',
    'twitter:card', '<title>', 'name="description"'
  ];
  const missing = required.filter((tag) => !head.includes(tag));
  if (missing.length) {
    throw new Error(
      `dist/${file} is missing ${missing.join(', ')} from <head>. Scrapers do not run ` +
      'JavaScript, so these cannot live in the <helmet> block.'
    );
  }
  const image = /property="og:image" content="([^"]+)"/.exec(head);
  if (!image || !/^https:\/\//.test(image[1])) {
    throw new Error(`${file}: og:image must be an absolute https URL - scrapers cannot resolve a relative one`);
  }

  // The apex redirects to www. A card URL on the wrong host still resolves in a browser,
  // so this is invisible in testing, but WhatsApp is unreliable about following a redirect
  // for og:image and a canonical pointing at a redirect wastes the signal. Every absolute
  // URL in <head> must sit on one origin.
  const canonical = /rel="canonical" href="([^"]+)"/.exec(head);
  if (!canonical) throw new Error(`${file}: <head> has no rel=canonical`);
  const origin = new URL(canonical[1]).origin;
  for (const [what, url] of [
    ['og:url', /property="og:url" content="([^"]+)"/.exec(head)],
    ['og:image', image],
    ['twitter:image', /name="twitter:image" content="([^"]+)"/.exec(head)]
  ]) {
    if (!url) throw new Error(`${file}: <head> has no ${what}`);
    if (new URL(url[1]).origin !== origin) {
      throw new Error(`${file}: ${what} is on ${new URL(url[1]).origin}, canonical is ${origin} - pick one host`);
    }
  }
  const card = path.join(DIST, new URL(image[1]).pathname.replace(/^\//, ''));
  if (!fs.existsSync(card)) {
    throw new Error(`${file}: og:image points at ${image[1]} but ${path.relative(DIST, card)} is not in dist/`);
  }

  // Declared dimensions decide how a client frames the preview before the bytes arrive,
  // so a stale pair crops the card wrongly on exactly the platforms this is for. Read the
  // real size out of the PNG header (8-byte signature, then IHDR: length, type, then
  // width and height as big-endian uint32) rather than trusting anyone to update both.
  const png = fs.readFileSync(card);
  if (png.length < 24 || png.toString('ascii', 12, 16) !== 'IHDR') {
    throw new Error(`${path.relative(ROOT, card)} is not a PNG`);
  }
  const real = { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
  for (const side of ['width', 'height']) {
    const declared = new RegExp(`property="og:image:${side}" content="(\\d+)"`).exec(head);
    if (!declared) throw new Error(`${file}: <head> has no og:image:${side}`);
    if (+declared[1] !== real[side]) {
      throw new Error(
        `${file}: og:image:${side} says ${declared[1]} but the PNG is ${real[side]}px. ` +
        'Regenerate with `npm run og` or update index.html to match.'
      );
    }
  }
  return {
    file,
    name: path.basename(card),
    width: real.width,
    height: real.height,
    kb: (png.length / 1024).toFixed(0)
  };
}

function main() {
  const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const shell = loadShell(src);

  const out = shell
    ? src.replace('<x-dc>', `<div id="pre-shell">${shell}</div>\n<x-dc>`)
    : src;

  // Empty the directory rather than removing it: on Windows anything with the folder
  // open (a dev server serving dist/, an editor) holds a handle and rmdir fails EBUSY.
  fs.mkdirSync(DIST, { recursive: true });
  for (const entry of fs.readdirSync(DIST)) {
    fs.rmSync(path.join(DIST, entry), { recursive: true, force: true });
  }
  fs.writeFileSync(path.join(DIST, 'index.html'), out);
  fs.writeFileSync(path.join(DIST, WA_PAGE), whatsappVariant(out));
  for (const entry of COPY) {
    const from = path.join(ROOT, entry);
    if (fs.existsSync(from)) copyInto(from, path.join(DIST, entry));
  }

  // --- assertions: these must fail the build, not be checked by hand -----------------
  const built = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const waBuilt = fs.readFileSync(path.join(DIST, WA_PAGE), 'utf8');

  // Derive the forbidden strings from the payload itself rather than hard-coding them: a
  // list of the founder names committed to the repo would leak exactly what this is meant
  // to protect, and would silently rot if team.json changed.
  const payload = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/team.json'), 'utf8'));
  const people = JSON.parse(Buffer.from(payload.d, 'base64').toString('utf8'));
  const forbidden = people.flatMap((p) => [p.name, p.bio]);
  for (const [file, html] of [['index.html', built], [WA_PAGE, waBuilt]]) {
    for (const needle of forbidden) {
      if (html.includes(needle)) {
        throw new Error(`dist/${file} contains private founder detail - the shell leaked it`);
      }
    }
  }

  const cards = [checkCard(built, 'index.html'), checkCard(waBuilt, WA_PAGE)];

  console.log(`shell.html:      ${shell ? `${(shell.length / 1024).toFixed(0)} KB` : 'none (client-rendered)'}`);
  for (const c of cards) {
    console.log(`preview card:    ${c.file.padEnd(15)} -> ${c.name} (${c.width}x${c.height}, ${c.kb} KB)`);
  }
  console.log(`forbidden:       ${forbidden.length} strings checked, none present`);
  console.log(`dist/index.html: ${(built.length / 1024).toFixed(0)} KB`);
}

try {
  main();
} catch (err) {
  console.error('build failed:', err.message);
  process.exit(1);
}
