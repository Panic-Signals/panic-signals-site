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
