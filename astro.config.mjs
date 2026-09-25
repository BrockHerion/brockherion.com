// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { cacheCloudflare } from '@astrojs/cloudflare/cache';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import emdash from 'emdash/astro';
import { d1, r2 } from '@emdash-cms/cloudflare';

export default defineConfig({
  site: 'https://brockherion.com',
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    mdx(),
    // Only sees prerendered pages, so the on-demand ones are listed by hand.
    // Posts live in D1; src/pages/sitemap-posts.xml.ts lists them at request time.
    sitemap({
      customPages: ['/', '/blog/', '/projects/'].map(path => new URL(path, 'https://brockherion.com').href),
      customSitemaps: ['https://brockherion.com/sitemap-posts.xml'],
    }),
    // The EmDash admin UI is a React app.
    react(),
    emdash({
      // Passkeys are bound to this domain, so ones made on the preview
      // subdomain keep working here. The preview itself is allowed through
      // EMDASH_ALLOWED_ORIGINS in wrangler.jsonc: EmDash 0.40.1 drops the
      // `allowedOrigins` option when it bundles this config.
      siteUrl: 'https://brockherion.com',
      database: d1({ binding: 'DB' }),
      storage: r2({ binding: 'MEDIA' }),
    }),
  ],
  // Pages that read from EmDash render on request and sit in the Workers
  // cache. EmDash purges their tags whenever content is published or edited;
  // maxAge only bounds how long a page outlives a deploy that changed its code.
  cache: { provider: cacheCloudflare() },
  routeRules: {
    '/': { maxAge: 3600 },
    '/blog': { maxAge: 3600 },
    '/blog/[...slug]': { maxAge: 3600 },
    '/projects': { maxAge: 3600 },
    '/rss.xml': { maxAge: 3600 },
    '/llms.txt': { maxAge: 3600 },
    '/sitemap-posts.xml': { maxAge: 3600 },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
