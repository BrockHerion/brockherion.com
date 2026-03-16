# Personal Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build brockherion.com as a warm, editorial personal site with bento-box homepage, blog, projects, about, and now pages.

**Architecture:** Astro 6 static site with Tailwind CSS v4 for styling and MDX for content. Content Collections (glob loader) for blog posts and projects. Dark mode via class toggle on `<html>` with CSS custom properties for adaptive theming. No client-side framework — only vanilla JS for dark mode toggle and blog tag filtering.

**Tech Stack:** Astro 6, Tailwind CSS v4 (`@tailwindcss/vite`), `@astrojs/mdx`, `@astrojs/rss`, Lora + Inter fonts (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-03-16-personal-site-rebuild-design.md`

---

## File Structure

```
src/
├── components/
│   ├── BentoGrid.astro        — Asymmetric CSS grid for homepage
│   ├── BlogPostCard.astro     — Card variant for blog post previews
│   ├── Card.astro             — Base card component (paper-on-desk aesthetic)
│   ├── DarkModeToggle.astro   — Sun/moon toggle button
│   ├── Footer.astro           — Minimal footer with copyright + socials
│   ├── Nav.astro              — Horizontal nav with dark mode toggle
│   ├── NowPreview.astro       — Truncated now.md preview for bento box
│   ├── ProjectCard.astro      — Card variant for project showcase
│   └── TagList.astro          — Horizontal pill-shaped tag list
├── content/
│   ├── blog/
│   │   └── hello-world.mdx    — Sample blog post
│   └── projects/
│       └── brockherion-com.mdx — Sample project entry
├── content.config.ts           — Collection schemas (blog, projects)
├── data/
│   └── now.md                  — "Now" page content (not a collection)
├── layouts/
│   ├── BaseLayout.astro        — HTML shell, head, nav, footer, dark mode
│   └── BlogPostLayout.astro    — Blog post wrapper with metadata
├── pages/
│   ├── about.astro
│   ├── blog/
│   │   ├── index.astro         — Blog listing with tag filtering
│   │   └── [...slug].astro     — Individual blog post
│   ├── index.astro             — Homepage with bento grid
│   ├── now.astro
│   ├── projects.astro
│   └── rss.xml.ts
└── styles/
    └── global.css              — Tailwind imports, theme tokens, typography

Root files modified:
├── astro.config.mjs            — Add MDX + Tailwind vite plugin
├── package.json                — Add dependencies

Files to delete:
├── src/components/Welcome.astro
├── src/assets/astro.svg
└── src/assets/background.svg
```

---

## Chunk 1: Foundation

### Task 1: Install Dependencies and Configure Astro

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Install Tailwind CSS v4, MDX, and RSS packages**

```bash
cd /Users/brockherion/dev/brockherion.com
pnpm add tailwindcss @tailwindcss/vite @astrojs/mdx @astrojs/rss
```

- [ ] **Step 2: Update astro.config.mjs**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Delete template boilerplate**

```bash
rm src/components/Welcome.astro src/assets/astro.svg src/assets/background.svg
```

- [ ] **Step 4: Verify the dev server starts**

```bash
pnpm dev
```

Expected: Dev server starts without errors on localhost:4321.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml astro.config.mjs
git add -u src/components/Welcome.astro src/assets/
git commit -m "feat: add Tailwind v4, MDX, and RSS dependencies; remove template boilerplate"
```

---

### Task 2: Global Styles and Theme Tokens

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global.css with Tailwind import, theme tokens, and typography**

```css
@import "tailwindcss";

/* Dark mode via class on <html> */
@custom-variant dark (&:where(.dark, .dark *));

/* --- Adaptive color tokens --- */
:root {
  --page: #f5f0e8;
  --card: #faf7f2;
  --text: #2c2c2c;
  --text-muted: #8a7e6b;
  --tag-bg: #ebe5d9;
  --tag-text: #6b5f4e;
  --border: rgba(0, 0, 0, 0.08);
}

:root.dark {
  --page: #131825;
  --card: #1a2233;
  --text: #e2ddd5;
  --text-muted: #7a8599;
  --tag-bg: #232d40;
  --tag-text: #8a9ab5;
  --border: rgba(255, 255, 255, 0.05);
}

/* --- Register tokens with Tailwind so we get utility classes --- */
@theme {
  --color-page: var(--page);
  --color-card: var(--card);
  --color-text: var(--text);
  --color-text-muted: var(--text-muted);
  --color-tag-bg: var(--tag-bg);
  --color-tag-text: var(--tag-text);
  --color-border: var(--border);

  --font-heading: 'Lora', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

/* --- Base styles --- */
body {
  font-family: var(--font-body);
  background-color: var(--page);
  color: var(--text);
  transition: background-color 0.2s, color 0.2s;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

/* --- Prose styles for blog content --- */
.prose {
  max-width: 65ch;
  line-height: 1.75;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.prose p {
  margin-bottom: 1.25rem;
}

.prose a {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.prose ul, .prose ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose li {
  margin-bottom: 0.25rem;
}

.prose blockquote {
  border-left: 3px solid var(--text-muted);
  padding-left: 1rem;
  color: var(--text-muted);
  font-style: italic;
  margin: 1.5rem 0;
}

.prose pre {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose code:not(pre code) {
  background-color: var(--tag-bg);
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose img {
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.prose hr {
  border-color: var(--border);
  margin: 2rem 0;
}
```

- [ ] **Step 2: Verify dev server picks up styles**

Update `src/pages/index.astro` temporarily to import the stylesheet:

```astro
---
import '../styles/global.css';
---
<html lang="en">
  <head><title>brockherion.com</title></head>
  <body class="min-h-screen">
    <p>Theme test</p>
  </body>
</html>
```

```bash
pnpm dev
```

Expected: Page renders with warm cream background (#f5f0e8) and correct font.

- [ ] **Step 3: Commit**

Only commit global.css — the index.astro change is temporary for verification.

```bash
git add src/styles/global.css
git commit -m "feat: add global styles with adaptive theme tokens and prose styling"
```

---

### Task 3: BaseLayout, Nav, DarkModeToggle, and Footer

**Files:**
- Delete: `src/layouts/Layout.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/DarkModeToggle.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

All created together as one atomic unit — BaseLayout imports Nav and Footer, so they must exist simultaneously.

- [ ] **Step 1: Delete old Layout.astro**

```bash
rm src/layouts/Layout.astro
```

Authorized deletion: this is the default Astro template boilerplate being replaced.

- [ ] **Step 2: Create DarkModeToggle.astro**

```astro
<button
  id="theme-toggle"
  aria-label="Toggle dark mode"
  class="p-2 rounded-lg hover:bg-tag-bg transition-colors cursor-pointer"
>
  <!-- Moon icon (shown in light mode) -->
  <svg class="w-5 h-5 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 006.963-2.948c.3-.921.039-1.85-.961-3.05z" />
  </svg>
  <!-- Sun icon (shown in dark mode) -->
  <svg class="w-5 h-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

- [ ] **Step 3: Create Nav.astro**

```astro
---
import DarkModeToggle from './DarkModeToggle.astro';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/now', label: 'Now' },
];

const currentPath = Astro.url.pathname.replace(/\/$/, '') || '/';
---

<nav class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
  <a href="/" class="font-heading text-lg font-bold hover:text-text-muted transition-colors">
    Brock Herion
  </a>
  <div class="flex items-center gap-1 sm:gap-4">
    {navLinks.map(link => (
      <a
        href={link.href}
        class:list={[
          'text-sm transition-colors',
          currentPath === link.href
            ? 'text-text font-medium'
            : 'text-text-muted hover:text-text',
        ]}
      >
        {link.label}
      </a>
    ))}
    <DarkModeToggle />
  </div>
</nav>
```

Note: `currentPath` strips trailing slashes so active state matching works regardless of Astro's trailing slash behavior.

- [ ] **Step 4: Create Footer.astro**

```astro
---
const year = new Date().getFullYear();
---

<footer class="max-w-5xl mx-auto px-4 py-8 mt-16 border-t border-border">
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
    <p>&copy; {year} Brock Herion</p>
    <div class="flex gap-4">
      <a href="https://github.com/brockherion" class="hover:text-text transition-colors">GitHub</a>
      <a href="https://x.com/braborion" class="hover:text-text transition-colors">X</a>
      <a href="https://linkedin.com/in/brock-herion" class="hover:text-text transition-colors">LinkedIn</a>
    </div>
  </div>
</footer>
```

Note: Social links use placeholder URLs. Brock should update these with his actual links.

- [ ] **Step 5: Create BaseLayout.astro**

```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Brock Herion — software engineer, gymnast, thinker.' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="description" content={description} />
    <meta name="generator" content={Astro.generator} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:wght@400;600;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
    <!-- is:inline runs before paint — prevents flash of wrong theme -->
    <script is:inline>
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    </script>
  </head>
  <body class="min-h-screen bg-page text-text">
    <Nav />
    <main class="max-w-5xl mx-auto px-4 py-8">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 6: Update index.astro to use BaseLayout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Brock Herion">
  <p>Home page — bento grid coming soon.</p>
</BaseLayout>
```

- [ ] **Step 7: Verify everything works**

```bash
pnpm dev
```

Expected: Page renders with warm cream background, nav bar with links, footer, and a working dark mode toggle. Clicking the toggle switches to blue-dark theme. Refreshing preserves the choice.

- [ ] **Step 8: Commit**

```bash
git add -u src/layouts/Layout.astro
git add src/layouts/BaseLayout.astro src/components/Nav.astro src/components/DarkModeToggle.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add BaseLayout, Nav, Footer, and DarkModeToggle"
```

---

## Chunk 2: Content Model and Shared Components

### Task 4: Content Collections and Sample Content

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/hello-world.mdx`
- Create: `src/content/projects/brockherion-com.mdx`
- Create: `src/data/now.md`

Note: `now.md` lives at `src/data/` (not `src/content/`) to avoid being auto-discovered as a content collection. The spec says `src/content/now.md` but the intent is "not in a collection" — `src/data/` satisfies that unambiguously.

- [ ] **Step 1: Create content.config.ts with blog and projects schemas**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
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
```

- [ ] **Step 2: Create sample blog post**

Create `src/content/blog/hello-world.mdx`:

```mdx
---
title: "Hello World"
description: "First post on the new site. A fresh start."
date: 2026-03-16
tags: ["life"]
---

This is the first post on the rebuilt site. More to come.
```

- [ ] **Step 3: Create sample project**

Create `src/content/projects/brockherion-com.mdx`:

```mdx
---
title: "brockherion.com"
description: "My personal site — built with Astro, Tailwind, and MDX."
date: 2026-03-16
repo: "https://github.com/brockherion/brockherion.com"
featured: true
tags: ["astro", "tailwind"]
---

A personal site rebuild. Warm paper aesthetic, bento-box homepage, and a space to write about everything — not just code.
```

- [ ] **Step 4: Create now.md**

Create `src/data/now.md`:

```md
---
preview: "Building a new personal site, getting back into writing, and training gymnastics."
lastUpdated: 2026-03-16
---

## What I'm Up To

Building a new personal site from scratch with Astro. Getting back into writing after a long break.

## Reading

Nothing at the moment — open to recommendations.

## Playing

Taking a break from games.

## Training

Working on gymnastics consistency.
```

- [ ] **Step 5: Verify content collections work**

```bash
pnpm build
```

Expected: Build succeeds. No schema validation errors.

- [ ] **Step 6: Commit**

```bash
git add src/content.config.ts src/content/blog/ src/content/projects/ src/data/now.md
git commit -m "feat: add content collections schema and sample content"
```

---

### Task 5: Card and TagList Components

**Files:**
- Create: `src/components/Card.astro`
- Create: `src/components/TagList.astro`

TagList is created first because BlogPostCard and ProjectCard both depend on it.

- [ ] **Step 1: Create Card.astro**

The base card — paper floating on the desk surface. Used directly for bento boxes and composed by specialized card variants.

```astro
---
interface Props {
  class?: string;
  href?: string;
}

const { class: className = '', href } = Astro.props;
const Tag = href ? 'a' : 'div';
---

<Tag
  href={href}
  class:list={[
    'bg-card rounded-lg shadow-sm border border-border p-5 block',
    href && 'transition-shadow hover:shadow-md group',
    className,
  ]}
>
  <slot />
</Tag>
```

- [ ] **Step 2: Create TagList.astro**

```astro
---
interface Props {
  tags: string[];
  linked?: boolean;
}

const { tags, linked = false } = Astro.props;
---

<div class="flex flex-wrap gap-1.5">
  {tags.map(tag => (
    linked ? (
      <a
        href={`/blog?tag=${encodeURIComponent(tag)}`}
        class="text-xs px-2 py-0.5 rounded-full bg-tag-bg text-tag-text hover:opacity-80 transition-opacity"
      >
        {tag}
      </a>
    ) : (
      <span class="text-xs px-2 py-0.5 rounded-full bg-tag-bg text-tag-text">
        {tag}
      </span>
    )
  ))}
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Card.astro src/components/TagList.astro
git commit -m "feat: add Card and TagList components"
```

---

### Task 6: BlogPostCard and ProjectCard Components

**Files:**
- Create: `src/components/BlogPostCard.astro`
- Create: `src/components/ProjectCard.astro`

Both compose the Card component for consistent paper-card aesthetic.

- [ ] **Step 1: Create BlogPostCard.astro**

```astro
---
import Card from './Card.astro';
import TagList from './TagList.astro';

interface Props {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  slug: string;
}

const { title, description, date, tags, slug } = Astro.props;

const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<Card href={`/blog/${slug}`}>
  <time class="text-sm text-text-muted">{formattedDate}</time>
  <h3 class="font-heading text-lg font-semibold mt-1 group-hover:text-text-muted transition-colors">
    {title}
  </h3>
  <p class="text-text-muted text-sm mt-2 line-clamp-2">{description}</p>
  <div class="mt-3">
    <TagList tags={tags} />
  </div>
</Card>
```

- [ ] **Step 2: Create ProjectCard.astro**

```astro
---
import Card from './Card.astro';
import TagList from './TagList.astro';

interface Props {
  title: string;
  description: string;
  url?: string;
  repo?: string;
  tags?: string[];
}

const { title, description, url, repo, tags } = Astro.props;
---

<Card>
  <h3 class="font-heading text-lg font-semibold">{title}</h3>
  <p class="text-text-muted text-sm mt-2">{description}</p>
  {tags && tags.length > 0 && (
    <div class="mt-3">
      <TagList tags={tags} />
    </div>
  )}
  <div class="flex gap-3 mt-4 text-sm">
    {url && (
      <a href={url} class="text-text-muted hover:text-text transition-colors underline underline-offset-2">
        Live site
      </a>
    )}
    {repo && (
      <a href={repo} class="text-text-muted hover:text-text transition-colors underline underline-offset-2">
        Source
      </a>
    )}
  </div>
</Card>
```

- [ ] **Step 3: Verify all components render**

Temporarily update `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Card from '../components/Card.astro';
import BlogPostCard from '../components/BlogPostCard.astro';
import ProjectCard from '../components/ProjectCard.astro';
import TagList from '../components/TagList.astro';
---

<BaseLayout title="Brock Herion">
  <div class="space-y-4">
    <Card>A basic card</Card>
    <BlogPostCard
      title="Test Post"
      description="A test description for this blog post card."
      date={new Date('2026-03-16')}
      tags={['tech', 'life']}
      slug="test"
    />
    <ProjectCard
      title="Test Project"
      description="A test project."
      repo="https://github.com/test"
      tags={['astro']}
    />
    <TagList tags={['tech', 'life', 'books']} linked />
  </div>
</BaseLayout>
```

```bash
pnpm dev
```

Expected: All components render with consistent paper-card styling, tag pills, and warm theme. Revert index.astro after verifying.

- [ ] **Step 4: Commit**

```bash
git add src/components/BlogPostCard.astro src/components/ProjectCard.astro
git commit -m "feat: add BlogPostCard and ProjectCard components"
```

---

### Task 7: NowPreview Component

**Files:**
- Create: `src/components/NowPreview.astro`

- [ ] **Step 1: Create NowPreview.astro**

This component imports `now.md` directly and renders either the `preview` frontmatter field or a truncated version of the content body.

```astro
---
import Card from './Card.astro';

const nowFiles = import.meta.glob<{
  frontmatter: { preview?: string; lastUpdated?: string };
  compiledContent: () => string;
}>('/src/data/now.md', { eager: true });

const nowFile = Object.values(nowFiles)[0];
const preview = nowFile?.frontmatter?.preview;

let previewText = preview || '';
if (!previewText && nowFile?.compiledContent) {
  const html = nowFile.compiledContent();
  const stripped = html.replace(/<[^>]*>/g, '').trim();
  previewText = stripped.length > 100 ? stripped.slice(0, 100) + '…' : stripped;
}
---

<Card>
  <p class="text-xs uppercase tracking-wider text-text-muted mb-2">Now</p>
  <p class="text-sm text-text">{previewText}</p>
  <a href="/now" class="text-sm text-text-muted hover:text-text transition-colors mt-3 inline-block underline underline-offset-2">
    See more
  </a>
</Card>
```

Note: If direct `import` works better than `import.meta.glob` in Astro 6, switch to `import nowFile from '../data/now.md'`. The glob approach is used here as a safe fallback that definitely works across Astro versions. Either way, validate during implementation.

- [ ] **Step 2: Verify by temporarily adding to index.astro**

Add `<NowPreview />` import and usage to the temp index page and check it renders the preview text.

```bash
pnpm dev
```

Expected: Card shows "Building a new personal site, getting back into writing, and training gymnastics." with a "See more" link.

- [ ] **Step 3: Commit**

```bash
git add src/components/NowPreview.astro
git commit -m "feat: add NowPreview component"
```

---

## Chunk 3: Pages and Assembly

### Task 8: Homepage with BentoGrid

**Files:**
- Create: `src/components/BentoGrid.astro`
- Rewrite: `src/pages/index.astro`

- [ ] **Step 1: Create BentoGrid.astro**

The asymmetric 6-column grid from the spec.

```astro
---
import { getCollection } from 'astro:content';
import Card from './Card.astro';
import NowPreview from './NowPreview.astro';

const allPosts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

const allProjects = (await getCollection('projects'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const featuredProject = allProjects.find(p => p.data.featured) || allProjects[0];
---

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
  <!-- Bio card: full width on tablet, spans 4 cols + 2 rows on desktop -->
  <Card class="sm:col-span-2 lg:col-span-4 lg:row-span-2 flex flex-col items-center lg:items-start gap-4">
    <img
      src="/avatar.jpg"
      alt="Brock Herion"
      class="w-24 h-24 rounded-full object-cover"
    />
    <div>
      <h1 class="font-heading text-2xl font-bold">Brock Herion</h1>
      <p class="text-text-muted mt-2">
        Software engineer, gymnast, thinker. Building things and writing about all of it.
      </p>
    </div>
  </Card>

  <!-- Latest posts: spans 2 cols on desktop -->
  <Card class="lg:col-span-2">
    <p class="text-xs uppercase tracking-wider text-text-muted mb-3">Latest Posts</p>
    <div class="space-y-3">
      {allPosts.map(post => (
        <a href={`/blog/${post.id}`} class="block group">
          <p class="text-sm font-medium group-hover:text-text-muted transition-colors">{post.data.title}</p>
          <time class="text-xs text-text-muted">
            {post.data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </time>
        </a>
      ))}
    </div>
  </Card>

  <!-- Now preview: spans 2 cols on desktop -->
  <div class="lg:col-span-2">
    <NowPreview />
  </div>

  <!-- Project: spans 2 cols on desktop -->
  {featuredProject && (
    <Card class="lg:col-span-2">
      <p class="text-xs uppercase tracking-wider text-text-muted mb-2">Project</p>
      <h3 class="font-heading font-semibold">{featuredProject.data.title}</h3>
      <p class="text-sm text-text-muted mt-1">{featuredProject.data.description}</p>
      <div class="flex gap-3 mt-3 text-sm">
        {featuredProject.data.url && (
          <a href={featuredProject.data.url} class="text-text-muted hover:text-text transition-colors underline underline-offset-2">Live</a>
        )}
        {featuredProject.data.repo && (
          <a href={featuredProject.data.repo} class="text-text-muted hover:text-text transition-colors underline underline-offset-2">Source</a>
        )}
      </div>
    </Card>
  )}

  <!-- Socials: spans 2 cols on desktop -->
  <Card class="lg:col-span-2">
    <p class="text-xs uppercase tracking-wider text-text-muted mb-2">Connect</p>
    <div class="flex gap-4 text-sm">
      <a href="https://github.com/brockherion" class="text-text-muted hover:text-text transition-colors">GitHub</a>
      <a href="https://x.com/braborion" class="text-text-muted hover:text-text transition-colors">X</a>
      <a href="https://linkedin.com/in/brock-herion" class="text-text-muted hover:text-text transition-colors">LinkedIn</a>
    </div>
  </Card>

  <!-- Wildcard: spans 2 cols on desktop -->
  <Card class="lg:col-span-2">
    <p class="text-text-muted text-sm italic">
      "The only way to do great work is to love what you do."
    </p>
  </Card>
</div>
```

- [ ] **Step 2: Rewrite index.astro to use BentoGrid**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import BentoGrid from '../components/BentoGrid.astro';
---

<BaseLayout title="Brock Herion">
  <BentoGrid />
</BaseLayout>
```

- [ ] **Step 3: Add a placeholder avatar image**

Place a placeholder at `public/avatar.jpg`. Brock should replace this with his actual photo.

```bash
# Create a simple placeholder — Brock will replace with real photo
curl -sL "https://placehold.co/200x200/f5f0e8/8a7e6b?text=BH" -o public/avatar.jpg
```

If curl fails, just create a note that `public/avatar.jpg` needs to be added manually.

- [ ] **Step 4: Verify homepage**

```bash
pnpm dev
```

Expected: Homepage shows the asymmetric bento grid with bio card spanning left side, latest posts and now preview on the right, and project/socials/quote across the bottom. Dark mode toggle works.

- [ ] **Step 5: Commit**

```bash
git add src/components/BentoGrid.astro src/pages/index.astro public/avatar.jpg
git commit -m "feat: add bento-box homepage with asymmetric grid layout"
```

---

### Task 9: Blog Index and Post Pages

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`
- Create: `src/layouts/BlogPostLayout.astro`

- [ ] **Step 1: Create blog index page with tag filtering**

Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import BlogPostCard from '../../components/BlogPostCard.astro';

const allPosts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const allTags = [...new Set(allPosts.flatMap(post => post.data.tags))].sort();
---

<BaseLayout title="Blog — Brock Herion">
  <h1 class="font-heading text-3xl font-bold mb-2">Blog</h1>
  <p class="text-text-muted mb-8">Thoughts on tech, life, and everything in between.</p>

  <!-- Tag filter pills -->
  <div class="flex flex-wrap gap-2 mb-8" id="tag-filters">
    <button
      class="tag-pill text-xs px-3 py-1 rounded-full bg-tag-bg text-tag-text cursor-pointer transition-opacity"
      data-tag="all"
    >
      All
    </button>
    {allTags.map(tag => (
      <button
        class="tag-pill text-xs px-3 py-1 rounded-full bg-tag-bg text-tag-text cursor-pointer transition-opacity"
        data-tag={tag}
      >
        {tag}
      </button>
    ))}
  </div>

  <!-- Post list -->
  <div class="space-y-4" id="post-list">
    {allPosts.map(post => (
      <div data-tags={post.data.tags.join(',')}>
        <BlogPostCard
          title={post.data.title}
          description={post.data.description}
          date={post.data.date}
          tags={post.data.tags}
          slug={post.id}
        />
      </div>
    ))}
  </div>

  <script>
    function initTagFiltering() {
      const pills = document.querySelectorAll<HTMLButtonElement>('.tag-pill');
      const posts = document.querySelectorAll<HTMLElement>('#post-list > div');

      const params = new URLSearchParams(window.location.search);
      let activeTag = params.get('tag') || 'all';

      function filterPosts(tag: string) {
        activeTag = tag;
        pills.forEach(pill => {
          pill.classList.toggle('opacity-50', pill.dataset.tag !== tag);
        });
        posts.forEach(post => {
          const postTags = post.dataset.tags?.split(',') || [];
          const visible = tag === 'all' || postTags.includes(tag);
          post.style.display = visible ? '' : 'none';
        });
        const url = new URL(window.location.href);
        if (tag === 'all') {
          url.searchParams.delete('tag');
        } else {
          url.searchParams.set('tag', tag);
        }
        history.replaceState(null, '', url.toString());
      }

      pills.forEach(pill => {
        pill.addEventListener('click', () => filterPosts(pill.dataset.tag || 'all'));
      });

      // Check if there are any posts matching the active tag
      const matchingPosts = Array.from(posts).some(post => {
        const postTags = post.dataset.tags?.split(',') || [];
        return postTags.includes(activeTag);
      });

      // If no matching posts for the tag param, show all
      filterPosts(matchingPosts ? activeTag : 'all');
    }

    initTagFiltering();
  </script>
</BaseLayout>
```

- [ ] **Step 2: Create BlogPostLayout.astro**

```astro
---
import BaseLayout from './BaseLayout.astro';
import TagList from '../components/TagList.astro';

interface Props {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  readingTime: number;
}

const { title, description, date, tags, readingTime } = Astro.props;

const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<BaseLayout title={`${title} — Brock Herion`} description={description}>
  <article class="max-w-3xl mx-auto">
    <header class="mb-8">
      <time class="text-sm text-text-muted">{formattedDate}</time>
      <span class="text-sm text-text-muted mx-2">·</span>
      <span class="text-sm text-text-muted">{readingTime} min read</span>
      <h1 class="font-heading text-3xl font-bold mt-2">{title}</h1>
      <p class="text-text-muted mt-2">{description}</p>
      <div class="mt-4">
        <TagList tags={tags} linked />
      </div>
    </header>
    <div class="prose">
      <slot />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 3: Create blog post page**

Create `src/pages/blog/[...slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts
    .filter(post => !post.data.draft)
    .map(post => ({
      params: { slug: post.id },
      props: { post },
    }));
}

const { post } = Astro.props;
const { Content } = await render(post);

// post.body may not exist in Astro 6 glob loader. If undefined, fall back to 1 min.
// During implementation, verify whether post.body is available and adjust if needed.
const readingTime = post.body ? Math.ceil(post.body.split(/\s+/).length / 200) : 1;
---

<BlogPostLayout
  title={post.data.title}
  description={post.data.description}
  date={post.data.date}
  tags={post.data.tags}
  readingTime={readingTime}
>
  <Content />
</BlogPostLayout>
```

- [ ] **Step 4: Verify blog pages**

```bash
pnpm dev
```

Navigate to `localhost:4321/blog` — should see the blog index with the sample post and tag filter pills. Click the post to navigate to `localhost:4321/blog/hello-world` — should render the post with heading, date, reading time, tags, and content.

- [ ] **Step 5: Commit**

```bash
git add src/pages/blog/ src/layouts/BlogPostLayout.astro
git commit -m "feat: add blog index with tag filtering and individual post pages"
```

---

### Task 10: Projects Page

**Files:**
- Create: `src/pages/projects.astro`

- [ ] **Step 1: Create projects page**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';

const projects = (await getCollection('projects'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout title="Projects — Brock Herion">
  <h1 class="font-heading text-3xl font-bold mb-2">Projects</h1>
  <p class="text-text-muted mb-8">Things I've built.</p>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {projects.map(project => (
      <ProjectCard
        title={project.data.title}
        description={project.data.description}
        url={project.data.url}
        repo={project.data.repo}
        tags={project.data.tags}
      />
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 2: Verify**

```bash
pnpm dev
```

Navigate to `localhost:4321/projects` — should show the sample project card in a grid.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects.astro
git commit -m "feat: add projects page"
```

---

### Task 11: About and Now Pages

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/now.astro`

- [ ] **Step 1: Create about page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About — Brock Herion">
  <article class="max-w-3xl mx-auto">
    <h1 class="font-heading text-3xl font-bold mb-6">About Me</h1>
    <div class="prose">
    <p>
      I'm Brock — a software engineer with 6+ years of experience. I love building things,
      writing about what I learn, and sharing ideas across everything I'm into: tech, gymnastics,
      EVs, books, and games.
    </p>
    <p>
      This site is my corner of the internet. It's not a dev portfolio — it's a space for all of it.
    </p>
    </div>
  </article>
</BaseLayout>
```

Note: Brock should flesh this out with his actual bio.

- [ ] **Step 2: Create now page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const nowFiles = import.meta.glob<{
  frontmatter: { preview?: string; lastUpdated?: string };
  default: any;
}>('/src/data/now.md', { eager: true });

const nowFile = Object.values(nowFiles)[0];
const NowContent = nowFile?.default;
const lastUpdated = nowFile?.frontmatter?.lastUpdated;

const formattedDate = lastUpdated
  ? new Date(lastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  : '';
---

<BaseLayout title="Now — Brock Herion">
  <article class="max-w-3xl mx-auto">
    <h1 class="font-heading text-3xl font-bold mb-2">Now</h1>
    {formattedDate && <p class="text-text-muted mb-6">Last updated {formattedDate}</p>}
    <div class="prose">
      {NowContent && <NowContent />}
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 3: Verify both pages**

```bash
pnpm dev
```

Navigate to `localhost:4321/about` and `localhost:4321/now`. Both should render with the prose styles and correct content.

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro src/pages/now.astro
git commit -m "feat: add about and now pages"
```

---

### Task 12: RSS Feed and Final Cleanup

**Files:**
- Create: `src/pages/rss.xml.ts`
- Modify: `src/layouts/BaseLayout.astro` (add RSS link tag)

- [ ] **Step 1: Create RSS feed**

Create `src/pages/rss.xml.ts`:

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Brock Herion',
    description: 'Thoughts on tech, life, and everything in between.',
    site: context.site?.toString() || 'https://brockherion.com',
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
    })),
  });
}
```

- [ ] **Step 2: Add site URL to astro.config.mjs**

Update `astro.config.mjs` to include the site URL (required for RSS):

```js
// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://brockherion.com',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Add RSS autodiscovery link to BaseLayout**

In `src/layouts/BaseLayout.astro`, add inside `<head>`:

```html
<link rel="alternate" type="application/rss+xml" title="Brock Herion" href="/rss.xml" />
```

- [ ] **Step 4: Add .superpowers to .gitignore**

The `.superpowers/` directory at project root contains brainstorming mockups from the visual companion. Not to be confused with `docs/superpowers/` which holds specs and plans (those are tracked in git).

```bash
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 5: Full build verification**

```bash
pnpm build
```

Expected: Clean build with all pages generated:
- `/index.html`
- `/blog/index.html`
- `/blog/hello-world/index.html`
- `/projects/index.html`
- `/about/index.html`
- `/now/index.html`
- `/rss.xml`

- [ ] **Step 6: Visual smoke test**

```bash
pnpm preview
```

Walk through every page:
1. Homepage — bento grid renders, all cards present
2. Blog — post list shows, tag filtering works
3. Blog post — prose renders correctly
4. Projects — project cards show
5. About — content renders
6. Now — content from now.md renders
7. Dark mode — toggle works on every page, persists across navigation
8. Mobile — resize browser, verify responsive layouts

- [ ] **Step 7: Commit**

```bash
git add src/pages/rss.xml.ts astro.config.mjs src/layouts/BaseLayout.astro .gitignore
git commit -m "feat: add RSS feed, site config, and final cleanup"
```
