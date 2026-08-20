/**
 * Fails the build when a published post has no Open Graph card.
 *
 * Card generation needs headless Chrome, which the deploy environment does not
 * have, so cards are produced locally and committed. That split means a post
 * can reach production with its card missing — the page would fall back to the
 * generic site card and quietly lose its title in every link preview. This
 * catches that, and needs nothing but the filesystem.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = join(root, 'src/content/blog');
const ogDir = join(root, 'public/og');

const missing = [];

for (const file of readdirSync(blogDir).filter(f => f.endsWith('.mdx'))) {
  const raw = readFileSync(join(blogDir, file), 'utf8');
  if (/^draft:\s*true\s*$/m.test(raw)) continue;
  // A post pointing at its own artwork opts out of the generated card.
  if (/^image:\s*\S/m.test(raw)) continue;

  const slug = file.replace(/\.mdx$/, '');
  if (!existsSync(join(ogDir, `${slug}.png`))) missing.push(slug);
}

if (!existsSync(join(ogDir, 'site.png'))) missing.push('site (shared card)');

if (missing.length) {
  console.error(`\n✗ ${missing.length} Open Graph card(s) missing:\n`);
  for (const slug of missing) console.error(`    ${slug}`);
  console.error(`\n  Run \`pnpm og --missing\` and commit public/og/.\n`);
  process.exit(1);
}

console.log(`✓ Open Graph cards present for every published post`);
