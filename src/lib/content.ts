import { getCollection } from 'astro:content';
import { loadSiteConfig } from './siteConfig';
import { upcomingShows } from './shows';

export async function getUpcomingShows() {
  const { timezone } = loadSiteConfig();
  const all = await getCollection('shows');
  return upcomingShows(
    all.map((entry) => ({ date: entry.data.date, entry })),
    timezone,
  ).map((s) => s.entry);
}

export async function getBandSections() {
  return (await getCollection('band')).sort((a, b) => a.data.order - b.data.order);
}

/** The DECKARD manual's chapters in order, each with its chapter number (from 1). */
export async function getManualChapters() {
  const all = (await getCollection('manual')).sort((a, b) => a.data.order - b.data.order);
  return all.map((entry, i) => ({ entry, number: i + 1, href: `/software/deckard/manual/${entry.id}` }));
}
