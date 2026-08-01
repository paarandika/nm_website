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

function templateHash(src) {
  const start = src.indexOf('<x-dc>');
  const end = src.indexOf('</x-dc>');
  if (start < 0 || end < 0) throw new Error('index.html has no <x-dc> block');
  return crypto.createHash('sha256').update(src.slice(start, end)).digest('hex').slice(0, 16);
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

function main() {
  const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  if (!fs.existsSync(SHELL)) {
    throw new Error('shell.html is missing - run `npm run snapshot` and commit the result');
  }
  const raw = fs.readFileSync(SHELL, 'utf8');

  // A shell captured from an older template would serve stale copy to crawlers and paint
  // content that then changes under the reader. Fail rather than ship that quietly.
  const stamped = /template ([0-9a-f]{16})/.exec(raw);
  const current = templateHash(src);
  if (!stamped) throw new Error('shell.html has no template stamp - regenerate it with `npm run snapshot`');
  if (stamped[1] !== current) {
    throw new Error(
      `shell.html is stale: built from template ${stamped[1]}, index.html is now ${current}. ` +
      'Run `npm run snapshot` and commit the result.'
    );
  }

  const shell = raw.replace(/^<!--[^]*?-->\n?/, '').trim();
  if (!shell) throw new Error('shell.html is empty');
  if (shell.includes('{{')) throw new Error('shell.html has unresolved {{ }} bindings');

  const out = src.replace('<x-dc>', `<div id="pre-shell">${shell}</div>\n<x-dc>`);

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

  console.log(`shell.html:      ${(shell.length / 1024).toFixed(0)} KB (template ${current})`);
  console.log(`forbidden:       ${forbidden.length} strings checked, none present`);
  console.log(`dist/index.html: ${(built.length / 1024).toFixed(0)} KB`);
}

try {
  main();
} catch (err) {
  console.error('build failed:', err.message);
  process.exit(1);
}
