# Personal Site Rebuild — Design Spec

## Overview

Rebuild brockherion.com as a personal site that represents Brock as a whole person — not just a developer portfolio. The site covers tech, gymnastics, EVs, games, books, and life in general. It should feel like a warm, editorial space for writing and sharing.

## Stack

- **Framework:** Astro 6
- **Styling:** Tailwind CSS
- **Content:** MDX via Astro Content Collections
- **Dark mode:** Class-based toggle (`darkMode: 'class'`)
- **Output:** Static HTML (no SSR, no client-side framework)
- **Client JS:** Dark mode toggle + blog tag filtering only

## Pages & Routing

| Route | Purpose |
|-------|---------|
| `/` | Bento-box homepage — mosaic of who Brock is |
| `/blog` | All posts, single chronological feed, tag filtering |
| `/blog/[slug]` | Individual blog post |
| `/projects` | Project showcase grid |
| `/about` | Static about page |
| `/now` | "Now" page — what Brock is currently into |
| `/rss.xml` | RSS feed of blog posts |

## Content Model

### Blog (`src/content/blog/*.mdx`)

Frontmatter schema:

```yaml
title: string (required)
description: string (required)
date: date (required)
tags: string[] (required)
draft: boolean (default: false)
```

Tags are freeform strings — no predefined taxonomy. Examples: tech, life, gymnastics, EVs, books, games, career.

### Projects (`src/content/projects/*.mdx`)

Frontmatter schema:

```yaml
title: string (required)
description: string (required)
date: date (required)
url: string (optional — live site)
repo: string (optional — source code)
tags: string[] (optional)
featured: boolean (default: false)
```

The `featured` flag controls which project appears in the home bento box. If multiple projects are featured, show the one with the most recent `date`. If none are featured, show the project with the most recent `date`.

### Now (`src/content/now.md`)

Single markdown file, not in a content collection. Imported at build time via a direct ESM `import` of the `.md` file (Astro 6 supports this natively). It's a single file with no need for querying or listing, so a collection adds overhead for no benefit. Optional `preview` field in frontmatter for controlling what shows in the bento box snippet. If `preview` is omitted, the bento box shows the first ~100 characters of the content body.

```yaml
preview: string (optional — short text for bento box)
```

## Visual Design

### Color Palette

| Token | Light | Dark |
|-------|-------|------|
| `page` | `#f5f0e8` (warm cream) | `#131825` (deep blue-dark) |
| `card` | `#faf7f2` (paper white) | `#1a2233` (blue-gray) |
| `text` | `#2c2c2c` | `#e2ddd5` |
| `text-muted` | `#8a7e6b` | `#7a8599` |
| `tag-bg` | `#ebe5d9` | `#232d40` |
| `tag-text` | `#6b5f4e` | `#8a9ab5` |
| `border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.05)` |

### Aesthetic

- Cards float above the page surface with subtle shadows — paper on a warm desk
- Warm, not sterile. Personal, not corporate.
- Serif headings: Lora (can be swapped later if it doesn't feel right)
- Sans-serif body: Inter
- Monospace code blocks with slightly tinted background

## Homepage Bento Layout

Asymmetric editorial grid:

```
┌─────────────────┬───────────┐
│                 │  Latest   │
│   Bio + Photo   │  Posts    │
│   (2 rows)      ├───────────┤
│                 │   Now     │
├────────┬────────┼───────────┤
│ Project│ Socials│ Wildcard  │
└────────┴────────┴───────────┘
```

- Bio card spans 2 rows on the left, anchors the grid
- Smaller cards fill the right in a staggered layout
- Wildcard slot: a static quote string hardcoded in the component. Can be evolved to pull from a collection later if wanted.

### Responsive Breakpoints

The grid is implemented as a 6-column CSS grid. Bio spans columns 1-4 and rows 1-2. The right-side cards each span columns 5-6. The bottom row has three cards each spanning 2 columns.

- **Desktop (>= 1024px):** Full asymmetric bento grid as shown above
- **Tablet (640px–1023px):** 2-column even grid, bio goes full-width on top
- **Mobile (< 640px):** Single column stack

## Components

### Layout Components

- **`BaseLayout`** — HTML head, nav, footer, dark mode script, `<slot />`
- **`BlogPostLayout`** — Wraps individual posts: date, tags, reading time (computed at build time: word count / 200 wpm, rounded up), prose styling

### UI Components

- **`Nav`** — Site name left, page links right, dark mode toggle. Horizontal nav at all breakpoints. On mobile (< 640px), links use shorter text or smaller font size to fit in a single row. No hamburger menu, no wrapping to a second line.
- **`Card`** — Core building block. Paper-on-desk shadow, rounded corners, `card` bg on `page` surface.
- **`TagList`** — Horizontal pill-shaped tags. Clickable on blog index to filter.
- **`BentoGrid`** — CSS grid with named areas for asymmetric layout. Collapses responsively.
- **`BlogPostCard`** — Card showing title, date, description, tags.
- **`ProjectCard`** — Card with title, description, optional links (live site, repo).
- **`NowPreview`** — Truncated now.md rendering for bento box, with link to `/now`.
- **`DarkModeToggle`** — Sun/moon icon, persists to localStorage.
- **`Footer`** — Minimal. Copyright, social links.

## Data Flow

### Content Pipeline

All content is build-time via Astro Content Collections. No client-side fetching.

```
src/content/blog/*.mdx     → Content Collections → /blog/[slug]
src/content/projects/*.mdx → Content Collections → /projects
src/content/now.md         → Direct import       → /now + bento preview
```

### Blog Tag Filtering

- `/blog` renders all posts sorted by date (newest first)
- Tag pills at the top of the page — shows all tags that exist across published posts. If the tag list grows unwieldy, this can be revisited with a "show more" truncation, but for now display all.
- URL-based: `/blog?tag=tech`
- Vanilla JS: shows/hides posts by `data-tags` attribute
- Progressive enhancement — all posts visible without JS
- Invalid or empty tag param (e.g. `/blog?tag=nonexistent`) shows all posts

### Dark Mode

1. Inline `<script>` in `<head>` checks `localStorage` for saved preference
2. Falls back to `prefers-color-scheme: dark` media query
3. Sets `dark` class on `<html>` before first paint (no flash)
4. Toggle button updates class + `localStorage`

### RSS

- `@astrojs/rss` generates `/rss.xml`
- Includes all published (non-draft) posts

## Out of Scope

- Search (can add later with Pagefind)
- Comments system
- Analytics (previously used Plausible — can re-add later)
- CMS integration — content is MDX files in the repo
- Client-side framework (React/Vue/Svelte)
- Animations/transitions (can layer in later)
