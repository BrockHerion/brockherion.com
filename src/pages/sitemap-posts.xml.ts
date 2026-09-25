import type { APIContext } from 'astro';
import { getPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const site = (context.site?.toString() || 'https://brockherion.com').replace(/\/$/, '');
  const { posts, cacheHint } = await getPosts();
  context.cache.set(cacheHint);

  const urls = posts.map(post => {
    const lastmod = (post.updated ?? post.date).toISOString();
    return `<url><loc>${site}/blog/${post.slug}/</loc><lastmod>${lastmod}</lastmod></url>`;
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
}
