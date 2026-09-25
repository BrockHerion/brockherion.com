export interface ReadCandidate {
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
}

/**
 * The posts most related to the current one, newest first among equals.
 *
 * A shared tag counts for less the more posts carry it: two Drizzle posts
 * are closer than two posts that merely both touch TypeScript. Posts with no
 * tags in common still fill the list, newest first, so every post gets a
 * full set.
 */
export function nextReads(current: ReadCandidate, candidates: ReadCandidate[], count = 3) {
  const postsPerTag = new Map<string, number>();
  for (const candidate of candidates) {
    for (const tag of candidate.tags) postsPerTag.set(tag, (postsPerTag.get(tag) ?? 0) + 1);
  }

  const currentTags = new Set(current.tags);
  return candidates
    .filter(candidate => candidate.slug !== current.slug)
    .map(candidate => ({
      candidate,
      score: candidate.tags
        .filter(tag => currentTags.has(tag))
        .reduce((sum, tag) => sum + 1 / postsPerTag.get(tag)!, 0),
    }))
    .sort((a, b) => b.score - a.score || b.candidate.date.valueOf() - a.candidate.date.valueOf())
    .slice(0, count)
    .map(({ candidate }) => candidate);
}
