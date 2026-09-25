import { getEmDashCollection, getEmDashEntry } from 'emdash';
import type { PortableTextBlock } from 'emdash';
import { readingTime } from './format';
import { plainText } from './portable-text';

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: Date;
  updated?: Date;
  tags: string[];
  note?: string;
  image?: string;
  content: PortableTextBlock[];
  readingTime: number;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: Date;
  url?: string;
  repo?: string;
}

type Entry = { id: string; data: Record<string, any> };

function toPost({ id, data }: Entry): Post {
  const content = data.content ?? [];
  return {
    slug: id,
    title: data.title,
    description: data.description,
    date: new Date(data.publishedAt),
    updated: data.updated ? new Date(data.updated) : undefined,
    tags: (data.terms?.tag ?? []).map((term: { slug: string }) => term.slug),
    note: data.note ?? undefined,
    image: data.image ?? undefined,
    content,
    readingTime: readingTime(plainText(content)),
  };
}

// Published entries only, newest first. The limit is well above the archive's
// size; nothing here paginates.
const published = { status: 'published', limit: 1000, orderBy: { published_at: 'desc' } } as const;

/** Every published post, newest first, with the hint to pass to `Astro.cache.set`. */
export async function getPosts() {
  const { entries, error, cacheHint } = await getEmDashCollection('posts', published);
  if (error) throw error;
  return { posts: entries.map(toPost), cacheHint };
}

export async function getPost(slug: string) {
  const { entry, error, cacheHint } = await getEmDashEntry('posts', slug);
  // Astro 7 reports an unknown slug as an error, where EmDash expects a null entry.
  if (error?.name === 'LiveEntryNotFoundError') return { post: undefined, cacheHint };
  if (error) throw error;
  return { post: entry ? toPost(entry) : undefined, cacheHint };
}

export async function getProjects() {
  const { entries, error, cacheHint } = await getEmDashCollection('projects', published);
  if (error) throw error;
  const projects: Project[] = entries.map(({ id, data }: Entry) => ({
    slug: id,
    title: data.title,
    description: data.description,
    date: new Date(data.publishedAt),
    url: data.url ?? undefined,
    repo: data.repo ?? undefined,
  }));
  return { projects, cacheHint };
}
