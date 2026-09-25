import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const { posts, cacheHint } = await getPosts();
  context.cache.set(cacheHint);

  return rss({
    title: 'Brock Herion',
    description: 'Thoughts on tech, life, and everything in between.',
    site: context.site?.toString() || 'https://brockherion.com',
    items: posts.map(post => ({
      title: post.title,
      description: post.description,
      pubDate: post.date,
      link: `/blog/${post.slug}`,
    })),
  });
}
