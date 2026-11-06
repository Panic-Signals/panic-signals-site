import { existsSync, readdirSync } from 'node:fs';

/** Filenames in public/apparitions (build time only). */
export function readApparitionDir(dir = 'public/apparitions'): string[] {
  return existsSync(dir) ? readdirSync(dir) : [];
}
