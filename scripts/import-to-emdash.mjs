/**
 * One-off move of the MDX posts and projects into EmDash.
 *
 * Talks to a running site over the EmDash API rather than writing to D1
 * directly, so the same run works against `astro dev` and a deployed Worker.
 * Entries whose slug already exists are skipped, which makes a failed run
 * safe to repeat.
 *
 * Usage:  node scripts/import-to-emdash.mjs [--url <site>] [--dry-run]
 *         Against a deployed site, set EMDASH_TOKEN to a personal access token.
 *         Against localhost with no token, EmDash's dev bypass signs in.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EmDashClient } from 'emdash/client';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { gfm } from 'micromark-extension-gfm';
import { load as loadYaml } from 'js-yaml';
import { retext } from 'retext';
import retextSmartypants from 'retext-smartypants';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const baseUrl = args.includes('--url') ? args[args.indexOf('--url') + 1] : 'http://localhost:4321';
const dryRun = args.includes('--dry-run');

// Consolidates the tags that drifted over the years (case, typos, one-off
// specifics) into the set agreed on 2026-09-25.
const TAG_MAP = {
  'typescript': 'typescript', 'TypeScript': 'typescript', 'enum': 'typescript', 'string': 'typescript', 'enum vs string': 'typescript',
  'javascript': 'javascript', 'JavaScript': 'javascript', 'js': 'javascript', 'javascript object': 'javascript', 'js object': 'javascript', 'map': 'javascript', 'javascript map': 'javascript',
  'react': 'react', 'React': 'react', 'hook': 'react', 'react hooks': 'react', 'server components': 'react',
  'React Query': 'react-query', 'react query': 'react-query',
  'nextjs': 'nextjs', 'nexjs': 'nextjs', 'Nextjs': 'nextjs', 'next hydration error': 'nextjs', 'approuter': 'nextjs', 'sever actions': 'nextjs',
  'remix': 'remix', 'Remix': 'remix', 'astro': 'astro', 'tailwind': 'tailwind',
  'node': 'node', 'Node': 'node',
  'database': 'databases', 'postgres': 'databases', 'mysql': 'databases', 'orm': 'databases', 'nanoid': 'databases', 'primary key': 'databases',
  'prisma': 'prisma', 'prisma conditional where': 'prisma', 'prisma query': 'prisma', 'drizzle': 'drizzle',
  'zod': 'zod', 'react hook form': 'forms', 'reacthookform': 'forms',
  'api': 'apis', 'trpc': 'trpc',
  'serverless': 'serverless', 'vercel': 'serverless', 'upstash': 'serverless', 'redis': 'serverless',
  'queue': 'background-jobs', 'cron': 'background-jobs', 'qstash': 'background-jobs', 'messaging queue': 'background-jobs', 'background jobs': 'background-jobs', 'job': 'background-jobs',
  'ssr': 'rendering', 'ssg': 'rendering', 'csr': 'rendering', 'client': 'rendering', 'server': 'rendering',
  'ai': 'ai', 'claude-code': 'ai', 'workflow': 'ai',
  'saas': 'startups', 'startups': 'startups', 'business': 'startups', 'entrepreneurship': 'startups',
  'build in public': 'build-in-public', 'buildinpublic': 'build-in-public',
  'goals': 'personal', 'personal goals': 'personal', 'personal growth': 'personal', 'personal-development': 'personal', 'growth': 'personal', 'milestones': 'personal', 'year-in-review': 'personal', 'life': 'personal',
  'blogging': 'writing', 'blog': 'writing', 'personal blog': 'writing', 'writing': 'writing', 'wordpress': 'writing',
  'tooling': 'tooling',
  'web development': 'software-development', 'software development': 'software-development', 'software-development': 'software-development', 'programming': 'software-development', 'programming languages': 'software-development', 'technology': 'software-development',
  'open-source': 'open-source', 'cal.com': 'open-source', 'security': 'security',
  'twitter': 'social-media', 'bluesky': 'social-media', 'social media': 'social-media',
};

// Posts that shipped with `tags: []`. `chirpmark` groups the devlog series.
const TAGS_FOR_UNTAGGED = {
  '8-great-react-libraries-you-need-to-be-using-in-2023': ['react', 'javascript'],
  'chirpmark-devlog-finding-a-focus': ['chirpmark', 'build-in-public', 'startups'],
  'building-reusable-components-in-react-with-typescript-and-generics': ['react', 'typescript'],
  'designing-and-building-rest-apis-for-other-humans': ['apis', 'software-development'],
  'creating-per-page-layouts-with-nextjs-typescript-trcp-and-nextauth': ['nextjs', 'typescript', 'trpc'],
  'fixing-issues-and-finding-new-ones': ['chirpmark', 'build-in-public', 'startups'],
  'how-i-built-brockherion-dev': ['nextjs', 'writing'],
  'i-rebuilt-my-site-in-astro': ['astro', 'nextjs'],
  'how-to-use-drizzle-with-planetscale': ['drizzle', 'databases', 'typescript'],
  'keep-your-async-code-fast-with-promise-all': ['javascript', 'typescript'],
  'is-your-website-climate-friendly': ['astro', 'software-development'],
  'my-favorite-mac-apps-for-programming-july-2022': ['tooling'],
  'setting-up-a-monorepo-with-pnpm-and-typescript': ['typescript', 'tooling'],
  'stop-building-rest-apis-for-your-next-apps': ['nextjs', 'trpc', 'apis'],
  'things-about-software-development': ['software-development', 'personal'],
  'welcome-to-chirpmark': ['chirpmark', 'build-in-public', 'nextjs'],
  'the-top-five-must-read-books-for-software-developers': ['software-development'],
  'using-higher-order-functions-to-build-per-page-layouts-in-nextjs': ['nextjs', 'react'],
  'what-did-i-learn-from-2021': ['personal'],
};

function parseEntry(path) {
  const match = readFileSync(path, 'utf8').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`No frontmatter in ${path}`);
  return { meta: loadYaml(match[1]), body: match[2] };
}

const smartypants = retext().use(retextSmartypants);

/**
 * Astro's Markdown pipeline curled quotes, dashes, and ellipses at render
 * time. EmDash stores text as typed, so bake the same typography in once.
 */
const curl = text => String(smartypants.processSync(text));

/**
 * Markdown to Portable Text, built on the same parser Astro uses.
 *
 * EmDash ships a converter, but it drops `*emphasis*`, leaves marks nested
 * inside links or bold as literal Markdown, and splits list items that wrap
 * onto a second line — all of which the posts do.
 */
function toPortableText(body) {
  // Top-level MDX comments are notes to self, not content.
  const markdown = body.replace(/^\{\/\*.*\*\/\}\s*$/gm, '');
  const tree = fromMarkdown(markdown, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });

  const blocks = [];
  let keyCount = 0;
  const key = () => `k${(keyCount++).toString(36)}`;
  let heading = '';

  // A `<br>` has no Portable Text equivalent, so it splits the block in two;
  // consecutive blockquote blocks still render as one quote.
  function spans(nodes, marks = [], markDefs = [], lines = [[]]) {
    for (const node of nodes) {
      const line = lines[lines.length - 1];
      switch (node.type) {
        case 'text':
          // A soft line break in the source is just a space in the rendered text.
          line.push({ _type: 'span', _key: key(), text: curl(node.value.replace(/\n/g, ' ')), marks });
          break;
        case 'inlineCode':
          line.push({ _type: 'span', _key: key(), text: node.value, marks: [...marks, 'code'] });
          break;
        case 'strong':
          spans(node.children, [...marks, 'strong'], markDefs, lines);
          break;
        case 'emphasis':
          spans(node.children, [...marks, 'em'], markDefs, lines);
          break;
        case 'delete':
          spans(node.children, [...marks, 'strike-through'], markDefs, lines);
          break;
        case 'link': {
          const href = node.url.startsWith('./') ? `/blog/${node.url.slice(2)}` : node.url;
          const definition = { _key: key(), _type: 'link', href };
          markDefs.push(definition);
          spans(node.children, [...marks, definition._key], markDefs, lines);
          break;
        }
        case 'break':
          lines.push([]);
          break;
        case 'html':
          if (!/^<br\s*\/?>$/.test(node.value)) throw new Error(`Unhandled inline HTML: ${node.value}`);
          lines.push([]);
          break;
        default:
          throw new Error(`Unhandled inline node: ${node.type}`);
      }
    }
    return { lines: lines.filter(children => children.length), markDefs };
  }

  function textBlocks(node, extra) {
    const { lines, markDefs } = spans(node.children);
    for (const children of lines) {
      blocks.push({ _type: 'block', _key: key(), style: 'normal', markDefs, children, ...extra });
    }
  }

  function paragraph(node, extra = {}) {
    const images = node.children.filter(child => child.type === 'image');
    const rest = node.children.filter(child => child.type !== 'image' && !(child.type === 'text' && !child.value.trim()));
    if (!images.length) return textBlocks(node, extra);
    if (rest.length) throw new Error('Image mixed with text in one paragraph');
    for (const image of images) {
      blocks.push({ _type: 'image', _key: key(), alt: image.alt ?? '', asset: { url: image.url } });
    }
  }

  function list(node, level) {
    const listItem = node.ordered ? 'number' : 'bullet';
    for (const item of node.children) {
      for (const child of item.children) {
        if (child.type === 'paragraph') paragraph(child, { listItem, level });
        else if (child.type === 'list') list(child, level + 1);
        else flow(child);
      }
    }
  }

  function html(node) {
    // Amazon's widget iframes are stripped by EmDash's sanitizer; a plain
    // affiliate link keeps the recommendation and the tracking id.
    const asin = node.value.match(/amazon-adsystem\.com.*?asins=([A-Z0-9]+)/);
    if (asin) {
      const tag = node.value.match(/tracking_id=([^&"]+)/)?.[1];
      const definition = { _key: key(), _type: 'link', href: `https://www.amazon.com/dp/${asin[1]}${tag ? `?tag=${tag}` : ''}` };
      blocks.push({
        _type: 'block',
        _key: key(),
        style: 'normal',
        markDefs: [definition],
        children: [
          { _type: 'span', _key: key(), text: 'Get ', marks: [definition._key] },
          { _type: 'span', _key: key(), text: curl(heading), marks: [definition._key, 'em'] },
          { _type: 'span', _key: key(), text: ' on Amazon', marks: [definition._key] },
        ],
      });
      return;
    }
    const youtube = node.value.match(/<iframe[^>]*src="(https:\/\/www\.youtube\.com\/embed\/[^"?]+)/);
    if (youtube) {
      blocks.push({ _type: 'embed', _key: key(), url: youtube[1], provider: 'youtube' });
      return;
    }
    throw new Error(`Unhandled HTML block: ${node.value.slice(0, 80)}`);
  }

  function flow(node) {
    switch (node.type) {
      case 'heading':
        heading = node.children.map(child => child.value ?? '').join('').split(' - ')[0].trim();
        return textBlocks(node, { style: `h${node.depth}` });
      case 'paragraph':
        return paragraph(node);
      case 'blockquote':
        for (const child of node.children) {
          if (child.type !== 'paragraph') throw new Error(`Unhandled node in blockquote: ${child.type}`);
          textBlocks(child, { style: 'blockquote' });
        }
        return;
      case 'list':
        return list(node, 1);
      case 'code':
        blocks.push({ _type: 'code', _key: key(), code: node.value, ...(node.lang && { language: node.lang }) });
        return;
      case 'thematicBreak':
        blocks.push({ _type: 'break', _key: key(), style: 'line' });
        return;
      case 'html':
        return html(node);
      default:
        throw new Error(`Unhandled block node: ${node.type}`);
    }
  }

  tree.children.forEach(flow);
  return blocks;
}

function tagsFor(slug, meta) {
  const raw = meta.tags ?? [];
  if (!raw.length) return TAGS_FOR_UNTAGGED[slug] ?? [];
  return [...new Set(raw.map(tag => {
    if (!TAG_MAP[tag]) throw new Error(`No mapping for tag "${tag}" on ${slug}`);
    return TAG_MAP[tag];
  }))];
}

const iso = value => new Date(value).toISOString();

function postInput(slug, { meta, body }) {
  return {
    slug,
    data: {
      title: meta.title,
      description: meta.description,
      content: toPortableText(body),
      ...(meta.updated && { updated: iso(meta.updated) }),
      ...(meta.note && { note: meta.note }),
      ...(meta.image && { image: meta.image }),
    },
    publishedAt: iso(meta.date),
    taxonomies: { tag: tagsFor(slug, meta) },
  };
}

function projectInput(slug, { meta, body }) {
  return {
    slug,
    data: {
      title: meta.title,
      description: meta.description,
      content: toPortableText(body),
      ...(meta.url && { url: meta.url }),
      ...(meta.repo && { repo: meta.repo }),
      featured: meta.featured ?? false,
    },
    publishedAt: iso(meta.date),
    taxonomies: { tag: tagsFor(slug, meta) },
  };
}

const sources = [
  { collection: 'posts', dir: 'src/content/blog', toInput: postInput },
  { collection: 'projects', dir: 'src/content/projects', toInput: projectInput },
];

const client = new EmDashClient({
  baseUrl,
  ...(process.env.EMDASH_TOKEN ? { token: process.env.EMDASH_TOKEN } : { devBypass: true }),
});

const entries = sources.flatMap(({ collection, dir, toInput }) =>
  readdirSync(join(root, dir))
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      const parsed = parseEntry(join(root, dir, file));
      return { collection, slug, draft: parsed.meta.draft === true, input: toInput(slug, parsed) };
    })
);

const labels = new Map();
for (const slug of Object.values(TAG_MAP)) if (!labels.has(slug)) labels.set(slug, slug.replace(/-/g, ' '));
const tagsInUse = new Set(entries.flatMap(entry => entry.input.taxonomies.tag));

console.log(`${entries.length} entries, ${tagsInUse.size} tags → ${baseUrl}${dryRun ? ' (dry run)' : ''}`);
if (dryRun) process.exit(0);

const existingTerms = new Set((await client.terms('tag')).items.map(term => term.slug));
for (const slug of tagsInUse) {
  if (existingTerms.has(slug)) continue;
  await client.createTerm('tag', { slug, label: labels.get(slug) ?? slug });
}

const existing = new Map();
for (const { collection } of sources) {
  for await (const item of client.listAll(collection)) existing.set(`${collection}/${item.slug}`, item);
}

const counts = { created: 0, skipped: 0 };
for (const { collection, slug, draft, input } of entries) {
  const found = existing.get(`${collection}/${slug}`);
  // A run that died between create and publish leaves the entry as a draft.
  if (found && !draft && found.status !== 'published') {
    await client.publish(collection, found.id);
    console.log(`  published ${collection}/${slug} (left unpublished by an earlier run)`);
  }
  if (found) {
    counts.skipped++;
    continue;
  }
  const item = await client.create(collection, input);
  if (!draft) await client.publish(collection, item.id);
  counts.created++;
  console.log(`  ${draft ? 'draft    ' : 'published'} ${collection}/${slug}`);
}
console.log(`done: ${counts.created} created, ${counts.skipped} skipped`);
