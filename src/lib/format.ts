/**
 * Date and figure formatting for the broadsheet layouts.
 *
 * Frontmatter dates (`date: 2026-05-10`) coerce to UTC midnight. Reading them
 * back through the local-time getters renders the previous day for anyone west
 * of Greenwich, so every formatter here works from the UTC components.
 */

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const pad = (n: number) => String(n).padStart(2, '0');

/** `16.04.26` — the front page's recent-writing column. */
export function dateShort(date: Date): string {
  return [
    pad(date.getUTCDate()),
    pad(date.getUTCMonth() + 1),
    String(date.getUTCFullYear()).slice(2),
  ].join('.');
}

/** `2026.05.10` — the blog index and the post's left rail. */
export function dateStamp(date: Date): string {
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
  ].join('.');
}

/** `10 May 2026` — the lead kicker. */
export function dateLead(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS_LONG[date.getUTCMonth()].slice(0, 3)} ${date.getUTCFullYear()}`;
}

/** `March 2026` — prose-voice date for the Now page. */
export function dateMonthLong(date: Date): string {
  return `${MONTHS_LONG[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** `MAR 2026` — the Now column's mono stamp. */
export function dateMonthStamp(date: Date): string {
  return `${MONTHS_LONG[date.getUTCMonth()].slice(0, 3).toUpperCase()} ${date.getUTCFullYear()}`;
}

/** Minutes to read, at 200 words per minute. Falls back to 1 for empty bodies. */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200));
}
