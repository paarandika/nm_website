/**
 * Build dist/ : the site plus a prerendered static shell.
 *
 * Why a shell rather than replacing the markup with the snapshot: the x-dc runtime in
 * support.js treats the contents of <x-dc> as its *template* - the `{{ }}` bindings,
 * <sc-for>, refs and event attributes all live there. Overwriting it with rendered
 * output would destroy the template and leave the page uninteractive. So dist/index.html
 * keeps the template verbatim and gains a static copy of the rendered result in front of
 * it, which paints immediately and is what a crawler reads. The component removes the
 * shell as its first act on mount.
 *
 * The shell is stripped of id attributes: until it is removed there would otherwise be
 * two elements answering to #hdr, #sky, #what and so on, and document.getElementById
 * returns the first in document order - the inert one.
 *
 * assets/team.json is aborted during the snapshot. If it resolved, the founder names
 * would be baked into static HTML and the robots.txt arrangement that keeps them out of
 * search results would be silently defeated. That is asserted below, not assumed.
 */
const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BLOCKED = 'assets/team.json';

// Copied into dist/. Anything not listed is not deployed. vercel.json is deliberately
// absent: Vercel reads it from the repo root, and a copy here would be served publicly.
const COPY = ['support.js', 'robots.txt', 'assets', 'vendor'];

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.css': 'text/css', '.txt': 'text/plain'
};

function serve() {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
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

async function main() {
  const puppeteer = require('puppeteer');
  const server = await serve();
  const port = server.address().port;
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--hide-scrollbars'] });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    let blocked = 0;
    const offOrigin = [];
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      if (url.includes(BLOCKED)) { blocked++; return req.abort(); }
      if (!url.startsWith(`http://127.0.0.1:${port}/`) && !url.startsWith('data:')) offOrigin.push(url);
      req.continue();
    });

    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });

    // Hydration is done when the template's bindings have been resolved: the rail links
    // read href="{{ item.href }}" as source and href="#what" once rendered.
    await page.waitForFunction(
      () => {
        const a = document.querySelector('nav[aria-label="Sections"] a');
        return !!a && (a.getAttribute('href') || '').startsWith('#');
      },
      { timeout: 30000 }
    );

    const shell = await page.evaluate(() => {
      // support.js does not render *into* <x-dc>; it replaces that element with
      // <div id="dc-root">. So the rendered result is read from there, while the
      // template we keep in dist/index.html is the untouched <x-dc> from source.
      const host = document.getElementById('dc-root');
      if (!host) return '';
      const copy = host.cloneNode(true);
      // The skyline is fetched at runtime and is decorative; inlining ~250KB of it into
      // every response would cost far more than the shell saves.
      copy.querySelectorAll('#sky, [id="sky"]').forEach((el) => { el.innerHTML = ''; });
      copy.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
      return copy.innerHTML;
    });

    if (!shell.trim()) throw new Error('prerender produced an empty shell');
    if (blocked === 0) throw new Error(`expected ${BLOCKED} to be requested and aborted; it never was`);

    const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    if (!src.includes('<x-dc>')) throw new Error('index.html has no <x-dc> block');
    const out = src.replace(
      '<x-dc>',
      `<div id="pre-shell">${shell}</div>\n<x-dc>`
    );

    fs.rmSync(DIST, { recursive: true, force: true });
    fs.mkdirSync(DIST, { recursive: true });
    fs.writeFileSync(path.join(DIST, 'index.html'), out);
    for (const entry of COPY) {
      const from = path.join(ROOT, entry);
      if (fs.existsSync(from)) copyInto(from, path.join(DIST, entry));
    }

    // --- assertions: these must fail the build, not be checked by hand ---------------
    const built = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

    // Derive the forbidden strings from the payload itself rather than hard-coding them:
    // a list of the founder names committed to the repo would leak exactly what this is
    // meant to protect, and would silently rot if team.json changed.
    const payload = JSON.parse(fs.readFileSync(path.join(ROOT, BLOCKED), 'utf8'));
    const people = JSON.parse(Buffer.from(payload.d, 'base64').toString('utf8'));
    const forbidden = people.flatMap((p) => [p.name, p.bio]);
    for (const needle of forbidden) {
      if (built.includes(needle)) {
        throw new Error('dist/index.html contains private founder detail - the prerender leaked it');
      }
    }
    // Checking the *string* for "unpkg" would fail on the window.__resources map, whose
    // keys are the unpkg URLs being redirected. What matters is whether anything is
    // actually fetched from there, so assert on observed requests instead.
    const cdn = offOrigin.filter((u) => /unpkg\.com|cdn\.jsdelivr|cdnjs\./.test(u));
    if (cdn.length) throw new Error(`still fetching from a JS CDN: ${cdn[0]}`);
    if (shell.includes('{{')) throw new Error('shell contains unresolved {{ }} bindings - snapshot taken too early');

    const hosts = [...new Set(offOrigin.map((u) => new URL(u).host))];
    console.log(`prerendered shell:   ${(shell.length / 1024).toFixed(0)} KB`);
    console.log(`${BLOCKED}:  aborted ${blocked}x`);
    console.log(`forbidden strings:   ${forbidden.length} checked, none present`);
    console.log(`off-origin requests: ${hosts.length ? hosts.join(', ') : 'none'}`);
    console.log(`dist/index.html:     ${(built.length / 1024).toFixed(0)} KB`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('build failed:', err.message);
  process.exit(1);
});
