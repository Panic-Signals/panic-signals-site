import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { assertShowDates, isRealDate } from './lib/showDates';

// Fail the build on impossible dates exactly as typed (see showDates.ts).
assertShowDates();

// Every collection reads *.md from its folder; README.md files are instructions, not content.
const md = (folder: string) => glob({ pattern: ['*.md', '!README.md'], base: `./src/content/${folder}` });

const band = defineCollection({
  loader: md('band'),
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
});

const shows = defineCollection({
  loader: md('shows'),
  schema: z.object({
    // YAML turns an unquoted 2026-12-12 into a Date; normalize it back to text.
    date: z.preprocess(
      (v) => (v instanceof Date && !Number.isNaN(v.getTime()) ? v.toISOString().slice(0, 10) : v),
      z
        .string({ message: 'date must be YYYY-MM-DD (e.g. 2026-12-12)' })
        .refine(isRealDate, { message: 'date must be YYYY-MM-DD (e.g. 2026-12-12)' }),
    ),
    city: z.string(),
    venue: z.string(),
    tickets: z.url().optional(),
    doors: z.string().optional(),
  }),
});

const software = defineCollection({
  loader: md('software'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    repo: z.url(),
    status: z.string(),
    order: z.number(),
    // The project's manual, if it has one: the status links there.
    manual: z.string().startsWith('/').optional(),
    // A version that runs in the browser, if there is one: the page's main button.
    app: z.url().optional(),
  }),
});

// The DECKARD manual: one chapter per file, numbered by `order`.
const manual = defineCollection({
  loader: md('deckard-manual'),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    description: z.string(),
    // Chapters of NI's Maschine manual this one builds on, shown in a box at the top.
    maschine: z.array(z.string()).optional(),
    // A chapter about something not in a DECKARD release yet.
    preview: z.string().optional(),
  }),
});

export const collections = { band, shows, software, manual };
