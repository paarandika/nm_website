/**
 * Capture the prerendered shell. Run locally, commit the result.
 *
 *     npm run snapshot
 *
 * Why this is a separate, local step rather than part of the deploy: Vercel's build image
 * has no Chrome shared libraries (libnspr4.so and friends), so a headless browser exits
 * 127 there. jsdom runs anywhere but is not an option either - React writes styles through
 * its CSSOM, which silently drops declarations it cannot parse, and this page depends on
 * clamp() and svh units. A jsdom snapshot loses 16 of 17 clamp() values and paints a
 * visibly wrong layout. So the snapshot is taken here, by a real browser, and committed;
 * `npm run build` only inlines it and needs nothing but Node.
 *
 * jsdom *is* used below, but purely to parse and re-serialise already-rendered HTML.
 * Attribute text passes through untouched; nothing is round-tripped through the CSSOM.
 *
 * assets/team.json is refused by the local server for the duration. If it resolved, the
 * founder names would be captured into the shell, committed, and served as static HTML -
 * defeating the robots.txt arrangement that keeps them out of search results.
 */
const { spawn } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { JSDOM } = require('jsdom');
const { findChrome } = require('./chrome');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'shell.html');
const BLOCKED = '/assets/team.json';

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.css': 'text/css', '.txt': 'text/plain'
};

/**
 * Hash of the template the shell was rendered from, so the build can spot staleness.
 * Must stay byte-for-byte identical to the copy in tools/build.js - including the newline
 * normalisation, without which a CRLF working tree and an LF CI clone disagree.
 */
function templateHash(src) {
  const start = src.indexOf('<x-dc>');
  const end = src.indexOf('</x-dc>');
  if (start < 0 || end < 0) throw new Error('index.html has no <x-dc> block');
  const template = src.slice(start, end).replace(/\r\n/g, '\n');
  return crypto.createHash('sha256').update(template).digest('hex').slice(0, 16);
}

function serve() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    if (url === BLOCKED) {
      // Refused deliberately - see the note at the top of this file.
      res.writeHead(404).end('blocked during snapshot');
      return;
    }
    const rel = url.replace(/^\/+/, '') || 'index.html';
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

// Must be async: the page is served by an HTTP server in this same process, and a
// synchronous spawn would block the event loop so that server could never answer
// Chrome's requests - the browser would wait forever for a reply that cannot come.
function dumpDom(chrome, url) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'nm-snapshot-'));
  return new Promise((resolve, reject) => {
    const child = spawn(chrome, [
      '--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
      '--window-size=1440,900',
      '--virtual-time-budget=20000',
      `--user-data-dir=${profile}`,
      '--dump-dom', url
    ], { stdio: ['ignore', 'pipe', 'ignore'] });

    let out = '';
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => { out += chunk; });
    // Bound it: a browser that never exits should fail the snapshot, not hang forever.
    const timer = setTimeout(() => { child.kill('SIGKILL'); reject(new Error('browser timed out')); }, 120000);
    child.on('error', (err) => { clearTimeout(timer); reject(err); });
    child.on('close', (code) => {
      clearTimeout(timer);
      fs.rmSync(profile, { recursive: true, force: true });
      if (code !== 0) reject(new Error(`browser exited ${code}`));
      else resolve(out);
    });
  });
}

async function main() {
  const chrome = findChrome();
  const server = await serve();
  const port = server.address().port;

  try {
    const html = await dumpDom(chrome, `http://127.0.0.1:${port}/index.html`);

    // Parse only. No scripts run, no styles are touched, so attribute text is preserved
    // exactly as the browser produced it.
    const doc = new JSDOM(html).window.document;
    const host = doc.getElementById('dc-root');
    if (!host) throw new Error('no #dc-root in the dump - the page did not finish rendering');

    const rail = host.querySelector('nav[aria-label="Sections"] a');
    if (!rail || !(rail.getAttribute('href') || '').startsWith('#')) {
      throw new Error('template bindings are unresolved - the dump was taken too early');
    }

    // The skyline is fetched at runtime and is decorative; inlining ~250KB of it into
    // every response would cost far more than the shell saves.
    host.querySelectorAll('#sky').forEach((el) => { el.innerHTML = ''; });
    // Until the shell is removed on mount there would otherwise be two elements
    // answering to #hdr, #sky, #what and so on, and getElementById returns the first in
    // document order - the inert one.
    host.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    const shell = host.innerHTML;

    if (!shell.trim()) throw new Error('snapshot produced an empty shell');
    if (shell.includes('{{')) throw new Error('shell has unresolved {{ }} bindings');

    const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const payload = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/team.json'), 'utf8'));
    const people = JSON.parse(Buffer.from(payload.d, 'base64').toString('utf8'));
    for (const person of people) {
      for (const value of [person.name, person.bio]) {
        if (shell.includes(value)) {
          throw new Error('shell contains private founder detail - team.json was not refused');
        }
      }
    }

    fs.writeFileSync(OUT, `<!-- generated by tools/snapshot.js; template ${templateHash(src)} -->\n${shell}\n`);
    console.log(`browser:       ${chrome}`);
    console.log(`shell.html:    ${(shell.length / 1024).toFixed(0)} KB`);
    console.log(`template hash: ${templateHash(src)}`);
    console.log('commit shell.html alongside index.html.');
  } finally {
    server.close();
  }
}

main().catch((err) => {
  console.error('snapshot failed:', err.message);
  process.exit(1);
});
