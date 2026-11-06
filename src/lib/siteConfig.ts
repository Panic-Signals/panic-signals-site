import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

export interface LinkedVideo {
  url: string;
  poster?: string;
}

export interface SiteConfig {
  formspreeEndpoint: string;
  timezone: string;
  apparitions: { pinned?: string; videos: LinkedVideo[] };
  social: { label: string; url: string }[];
}

const DEFAULT_TIMEZONE = 'America/New_York';
const VIDEO_HOSTS = /(^|\.)(youtube\.com|youtu\.be|vimeo\.com)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

function fail(field: string, why: string): never {
  throw new Error(`site.config.yaml: ${field} ${why}`);
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function optionalString(v: unknown, field: string): string | undefined {
  if (v === null || v === undefined || v === '') return undefined;
  if (typeof v !== 'string') fail(field, 'must be text');
  return v;
}

function parseVideo(v: unknown, i: number): LinkedVideo {
  const field = `apparitions.videos[${i}]`;
  if (!isObject(v) || typeof v.url !== 'string') fail(field, 'needs a url');
  let url: URL;
  try {
    url = new URL(v.url);
  } catch {
    fail(`${field}.url`, 'is not a valid URL');
  }
  if (VIDEO_HOSTS.test(url.hostname) || !VIDEO_EXT.test(url.pathname)) {
    fail(`${field}.url`, 'must link to a direct video file (.mp4, .webm or .mov), not a YouTube/Vimeo page');
  }
  const poster = optionalString(v.poster, `${field}.poster`);
  return poster ? { url: v.url, poster } : { url: v.url };
}

export function parseSiteConfig(raw: unknown): SiteConfig {
  if (!isObject(raw)) fail('file', 'must be a YAML mapping');

  const formspreeEndpoint = raw.formspreeEndpoint;
  if (typeof formspreeEndpoint !== 'string' || !formspreeEndpoint.startsWith('https://formspree.io/f/')) {
    fail('formspreeEndpoint', 'must start with https://formspree.io/f/');
  }

  const timezone = optionalString(raw.timezone, 'timezone') ?? DEFAULT_TIMEZONE;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone });
  } catch {
    fail('timezone', `"${timezone}" is not a valid IANA timezone (e.g. America/New_York)`);
  }

  const app = raw.apparitions ?? {};
  if (!isObject(app)) fail('apparitions', 'must be a mapping');
  const pinned = optionalString(app.pinned, 'apparitions.pinned');
  const videosRaw = app.videos ?? [];
  if (!Array.isArray(videosRaw)) fail('apparitions.videos', 'must be a list');
  const videos = videosRaw.map(parseVideo);

  const socialRaw = raw.social ?? [];
  if (!Array.isArray(socialRaw)) fail('social', 'must be a list');
  const social = socialRaw.map((s, i) => {
    if (!isObject(s) || typeof s.label !== 'string' || typeof s.url !== 'string') {
      fail(`social[${i}]`, 'needs a label and a url');
    }
    return { label: s.label, url: s.url };
  });

  return {
    formspreeEndpoint,
    timezone,
    apparitions: pinned ? { pinned, videos } : { videos },
    social,
  };
}

export function loadSiteConfig(path = 'site.config.yaml'): SiteConfig {
  return parseSiteConfig(parse(readFileSync(path, 'utf8')));
}
