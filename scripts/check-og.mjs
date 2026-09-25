/**
 * Fails the build when a standing page has no Open Graph card.
 *
 * Card generation needs headless Chrome, which the deploy environment does not
 * have, so cards are produced locally and committed. A missing one would fall
 * back to the generic site card and quietly lose its title in every link
 * preview. This catches that, and needs nothing but the filesystem.
 *
 * Posts are not checked: they live in D1, out of reach of the build, and a post
 * published from the admin is expected to go without its card until the next
 * `pnpm og --missing`.
 */

import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ogDir = join(root, 'public/og');

const missing = [];

for (const name of ['blog', 'projects', 'about', 'now', 'uses', 'slash']) {
  if (!existsSync(join(ogDir, `page-${name}.png`))) missing.push(`page-${name}`);
}
if (!existsSync(join(ogDir, 'site.png'))) missing.push('site (shared card)');

if (missing.length) {
  console.error(`\n✗ ${missing.length} Open Graph card(s) missing:\n`);
  for (const slug of missing) console.error(`    ${slug}`);
  console.error(`\n  Run \`pnpm og --missing\` and commit public/og/.\n`);
  process.exit(1);
}

console.log(`✓ Open Graph cards present for every standing page`);
