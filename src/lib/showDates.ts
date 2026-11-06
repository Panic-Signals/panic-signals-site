// Astro's frontmatter parser turns an unquoted 2026-02-30 into a real Date (March 2),
// so the content schema can't see impossible dates. Check the text exactly as typed.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml'; // YAML 1.2 core schema: dates stay as text

export function isRealDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

/** An error message for this show file's date, or null if it's fine. */
export function showDateError(filename: string, text: string): string | null {
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  let date: unknown;
  try {
    date = fm ? (parse(fm[1]) as Record<string, unknown> | null)?.date : undefined;
  } catch {
    return null; // malformed YAML is reported by Astro itself
  }
  if (typeof date === 'string' && isRealDate(date)) return null;
  return `src/content/shows/${filename}: date must be a real date written YYYY-MM-DD (e.g. 2026-12-12), got ${JSON.stringify(date ?? null)}`;
}

/** Throws if any show file in the folder has a bad date. */
export function assertShowDates(dir = 'src/content/shows'): void {
  const errors = readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => showDateError(f, readFileSync(join(dir, f), 'utf8')))
    .filter((e): e is string => e !== null);
  if (errors.length) throw new Error(errors.join('\n'));
}
