export interface ShowLike {
  date: string; // YYYY-MM-DD
}

/** Today's date as YYYY-MM-DD in the given IANA timezone. */
export function todayIn(timezone: string, now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/** Shows dated today or later (in the site timezone), soonest first. */
export function upcomingShows<T extends ShowLike>(shows: T[], timezone: string, now: Date = new Date()): T[] {
  const today = todayIn(timezone, now);
  return shows.filter((s) => s.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}
