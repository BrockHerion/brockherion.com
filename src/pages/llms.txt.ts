import type { APIContext } from 'astro';
import { getPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const site = (context.site?.toString() || 'https://brockherion.com').replace(/\/$/, '');

  const { posts, cacheHint } = await getPosts();
  context.cache.set(cacheHint);

  const lines = [
    '# Brock Herion',
    '',
    'Software engineer and writer. This site is my corner of the internet — writing on',
    'tech, life, and everything in between, plus a few standing pages about me.',
    '',
    '## Writing',
    '',
    ...posts.map(
      post => `- [${post.title}](${site}/blog/${post.slug}): ${post.description}`
    ),
    '',
    '## Pages',
    '',
    `- [About](${site}/about): Who I am and what this site is.`,
    `- [Now](${site}/now): What I'm doing right now.`,
    `- [Projects](${site}/projects): Things I've built and shipped.`,
    `- [Uses](${site}/uses): The hardware, software, and tools I use.`,
    '',
    '## Links',
    '',
    '- [GitHub](https://github.com/BrockHerion)',
    '- [X](https://x.com/BrockHerion)',
    '- [LinkedIn](https://www.linkedin.com/in/brock-j-herion-34279a176/)',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
