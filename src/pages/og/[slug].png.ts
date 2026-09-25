import type { APIContext } from 'astro';
import { env } from 'cloudflare:workers';

// Cards are generated locally and deployed as static assets, which take
// precedence over this route. It only runs for a post published since the last
// `pnpm og`, and stands the shared card in so the link preview is not broken.
export function GET({ url }: APIContext) {
  return env.ASSETS.fetch(new URL('/og/site.png', url));
}
