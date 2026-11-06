// Shared by the build (to list what's available) and the browser (to pick one).
// Keep this file free of Node imports; folder reading lives in apparitionsFs.ts.

export type Apparition = { kind: 'image'; src: string } | { kind: 'video'; src: string; poster?: string };

export interface ApparitionSettings {
  pinned?: string;
  videos: { url: string; poster?: string }[];
}

const IMAGE = /\.(png|gif|webp)$/i;
const VIDEO = /\.(mp4|webm|mov)$/i;

export function classifyFile(filename: string): 'image' | 'video' | null {
  if (filename.startsWith('.')) return null;
  if (IMAGE.test(filename)) return 'image';
  if (VIDEO.test(filename)) return 'video';
  return null;
}

const stem = (name: string) => name.replace(/\.[^.]+$/, '');
const local = (name: string) => `/apparitions/${encodeURIComponent(name)}`;

export function buildApparitionPool(files: string[], cfg: ApparitionSettings): Apparition[] {
  const usable = [...files].sort().filter((f) => classifyFile(f));
  const images = usable.filter((f) => classifyFile(f) === 'image');
  const videos = usable.filter((f) => classifyFile(f) === 'video');

  const posters = new Set<string>();
  const videoItems: Apparition[] = videos.map((v) => {
    const poster = images.find((i) => stem(i) === stem(v));
    if (poster) posters.add(poster);
    return poster ? { kind: 'video', src: local(v), poster: local(poster) } : { kind: 'video', src: local(v) };
  });
  const imageItems: Apparition[] = images
    .filter((i) => !posters.has(i))
    .map((i) => ({ kind: 'image', src: local(i) }));
  const linked: Apparition[] = cfg.videos.map((v) =>
    v.poster ? { kind: 'video', src: v.url, poster: v.poster } : { kind: 'video', src: v.url },
  );

  return [...videoItems, ...imageItems, ...linked];
}

function matchesPinned(a: Apparition, pinned: string): boolean {
  return a.src === pinned || a.src === local(pinned);
}

function still(a: Apparition): Apparition | null {
  if (a.kind === 'image') return a;
  return a.poster ? { kind: 'image', src: a.poster } : null;
}

export function pickApparition(
  pool: Apparition[],
  opts: { pinned?: string; preferStill: boolean; random: () => number },
): Apparition | null {
  if (pool.length === 0) return null;
  const pinned = opts.pinned ? pool.find((a) => matchesPinned(a, opts.pinned!)) : undefined;
  const chosen = pinned ?? pool[Math.floor(opts.random() * pool.length)];
  if (!opts.preferStill) return chosen;

  const asStill = still(chosen);
  if (asStill) return asStill;
  const images = pool.filter((a) => a.kind === 'image');
  return images.length ? images[Math.floor(opts.random() * images.length)] : null;
}
