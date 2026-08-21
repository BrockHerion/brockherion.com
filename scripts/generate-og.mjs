/**
 * Generates an Open Graph card per blog post, in the Broadsheet style.
 *
 * Renders an HTML template through headless Chrome rather than composing an
 * image directly: the cards then use the site's real fonts and real tokens, so
 * they cannot drift from the design the way a hand-built image would.
 *
 * The two webfonts are embedded as data URIs. Fetching them per render would
 * make the output depend on the network, and a card that silently falls back
 * to Times is worse than one that fails loudly.
 *
 * Usage:  node scripts/generate-og.mjs [--only <slug>] [--site] [--missing]
 * Output: public/og/<slug>.png at 1200x630, public/og/page-<name>.png for the
 *         standing pages, and public/og/site.png as the shared fallback.

 * Page cards are prefixed so they cannot collide with a post slug.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FONT_DIR = process.env.OG_FONT_DIR ?? join(root, 'scripts/og-fonts');
const OUT_DIR = join(root, 'public/og');
const WIDTH = 1200;
const HEIGHT = 630;

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function b64(file) {
  return readFileSync(join(FONT_DIR, file)).toString('base64');
}

// Frontmatter here is read with a deliberately small parser rather than a YAML
// dependency: this script only ever needs three scalar fields.
function parsePost(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const [, front, body] = match;
  const field = name => {
    const m = front.match(new RegExp(`^${name}:\\s*(.*)$`, 'm'));
    if (!m) return undefined;
    return m[1].trim().replace(/^["']|["']$/g, '');
  };
  return {
    title: field('title'),
    date: field('date'),
    draft: field('draft') === 'true',
    words: body.trim().split(/\s+/).length,
  };
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}

function template({ title, kicker }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Cormorant Garamond';font-weight:400;src:url(data:font/woff2;base64,${b64('cormorant.woff2')}) format('woff2')}
@font-face{font-family:'Lora';font-weight:400;src:url(data:font/woff2;base64,${b64('lora.woff2')}) format('woff2')}
*{box-sizing:border-box;margin:0}
html,body{width:${WIDTH}px;height:${HEIGHT}px}
body{background:#f3f2f2;color:#201f1d;font-family:'Lora',Georgia,serif;
  padding:64px;display:flex;flex-direction:column}
.kicker{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:19px;
  letter-spacing:0.16em;text-transform:uppercase;color:#b68235;
  font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}
.title-wrap{flex:1;display:flex;align-items:center;overflow:hidden}
h1{font-family:'Cormorant Garamond',serif;font-weight:400;line-height:0.98;
  letter-spacing:-0.02em;text-wrap:balance;font-size:88px}
.rule{height:1px;background:#201f1d;margin-bottom:22px}
footer{display:flex;justify-content:space-between;align-items:baseline}
.mark{font-family:'Cormorant Garamond',serif;font-size:31px}
.domain{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:17px;
  letter-spacing:0.12em;text-transform:uppercase;color:#b68235}
</style></head><body>
<p class="kicker">${escapeHtml(kicker)}</p>
<div class="title-wrap"><h1 id="t">${escapeHtml(title)}</h1></div>
<div class="rule"></div>
<footer><span class="mark">Brock Herion</span><span class="domain">brockherion.com</span></footer>
<script>
  // Long titles must not overflow the plate. Shrink to fit rather than clip:
  // a truncated headline in a link preview reads as a bug.
  const h = document.getElementById('t');
  const box = h.parentElement;
  for (let size = 88; size >= 34; size -= 2) {
    h.style.fontSize = size + 'px';
    if (h.scrollHeight <= box.clientHeight) break;
  }
  document.documentElement.dataset.ready = '1';
</script>
</body></html>`;
}

const only = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1]
  : null;
const siteOnly = process.argv.includes('--site');
// --missing renders only what is absent, which is what the pre-commit hook
// wants: adding one post should not re-render fifty unchanged cards.
const missingOnly = process.argv.includes('--missing');

function shoot(htmlPath, outPath) {
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${WIDTH},${HEIGHT}`,
    '--virtual-time-budget=4000',
    `--screenshot=${outPath}`,
    `file://${htmlPath}`,
  ], { stdio: 'pipe' });
}

const blogDir = join(root, 'src/content/blog');
const tmp = join(root, '.og-tmp');
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(tmp, { recursive: true });

let made = 0;
let skipped = 0;

// The standing pages get their own card, mirroring what the page itself shows:
// a single word in Cormorant over the ink rule. The kicker carries the wordmark
// where a post would carry its date.
const PAGES = [
  { name: 'blog', title: 'Writing' },
  { name: 'projects', title: 'Projects' },
  { name: 'about', title: 'About' },
  { name: 'now', title: 'Now' },
];

if (!only && !siteOnly) {
  for (const page of PAGES) {
    const out = join(OUT_DIR, `page-${page.name}.png`);
    if (missingOnly && existsSync(out)) continue;
    const path = join(tmp, `page-${page.name}.html`);
    writeFileSync(path, template({ title: page.title, kicker: 'est. 2021' }));
    shoot(path, out);
    console.log(`  ✓ page-${page.name}`);
  }
}

// The fallback, used by the home page, the 404, and anything without its own.
if (!only && !(missingOnly && existsSync(join(OUT_DIR, 'site.png')))) {
  const sitePath = join(tmp, 'site.html');
  writeFileSync(sitePath, template({
    title: 'Software engineer, writer, thinker.',
    kicker: 'est. 2021',
  }));
  shoot(sitePath, join(OUT_DIR, 'site.png'));
  console.log('  ✓ site');
}

for (const file of siteOnly ? [] : readdirSync(blogDir).filter(f => f.endsWith('.mdx')).sort()) {
  const slug = file.replace(/\.mdx$/, '');
  if (only && slug !== only) continue;

  const post = parsePost(readFileSync(join(blogDir, file), 'utf8'));
  if (!post) { console.warn(`  ?  ${slug} — unparseable frontmatter`); continue; }
  if (post.draft) { skipped++; continue; }
  if (missingOnly && existsSync(join(OUT_DIR, `${slug}.png`))) continue;

  // UTC getters, matching src/lib/format.ts — local time renders a day early.
  const d = new Date(post.date);
  const minutes = Math.max(1, Math.ceil(post.words / 200));
  const kicker = `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()} · ${minutes} min`;

  const htmlPath = join(tmp, `${slug}.html`);
  writeFileSync(htmlPath, template({ title: post.title, kicker }));

  shoot(htmlPath, join(OUT_DIR, `${slug}.png`));

  made++;
  process.stdout.write(`  ✓ ${slug}\n`);
}

rmSync(tmp, { recursive: true, force: true });
console.log(`\n${made} card(s) written to public/og/ — ${skipped} draft(s) skipped`);
