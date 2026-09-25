import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const site = (context.site?.toString() || 'https://brockherion.com').replace(/\/$/, '');

  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const lines = [
    '# Brock Herion',
    '',
    'Software engineer and writer. This site is my corner of the internet — writing on',
    'tech, life, and everything in between, plus a few standing pages about me.',
    '',
    '## Writing',
    '',
    ...posts.map(
      post => `- [${post.data.title}](${site}/blog/${post.id}): ${post.data.description}`
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
