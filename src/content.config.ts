import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // Set when a post gets a meaningful revision — feeds dateModified and
    // article:modified_time so crawlers see the freshness.
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    // Optional context line shown beside the lead essay on the front page.
    note: z.string().optional(),
    // Overrides the generated /og/<slug>.png card for this post.
    image: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    url: z.string().optional(),
    repo: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
