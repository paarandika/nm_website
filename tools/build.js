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
  for (const entry of COPY) {
    const from = path.join(ROOT, entry);
    if (fs.existsSync(from)) copyInto(from, path.join(DIST, entry));
  }

  // --- assertions: these must fail the build, not be checked by hand -----------------
  const built = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

  // Derive the forbidden strings from the payload itself rather than hard-coding them: a
  // list of the founder names committed to the repo would leak exactly what this is meant
  // to protect, and would silently rot if team.json changed.
  const payload = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/team.json'), 'utf8'));
  const people = JSON.parse(Buffer.from(payload.d, 'base64').toString('utf8'));
  const forbidden = people.flatMap((p) => [p.name, p.bio]);
  for (const needle of forbidden) {
    if (built.includes(needle)) {
      throw new Error('dist/index.html contains private founder detail - the shell leaked it');
    }
  }

  console.log(`shell.html:      ${shell ? `${(shell.length / 1024).toFixed(0)} KB` : 'none (client-rendered)'}`);
  console.log(`forbidden:       ${forbidden.length} strings checked, none present`);
  console.log(`dist/index.html: ${(built.length / 1024).toFixed(0)} KB`);
}

try {
  main();
} catch (err) {
  console.error('build failed:', err.message);
  process.exit(1);
}
