import { describe, expect, test } from 'vitest';
import { buildApparitionPool, classifyFile, pickApparition, type Apparition } from '../../src/lib/apparitions';

describe('classifyFile', () => {
  test.each([
    ['hand.PNG', 'image'],
    ['x.webp', 'image'],
    ['x.gif', 'image'],
    ['x.webm', 'video'],
    ['x.mp4', 'video'],
    ['x.mov', 'video'],
    ['README.md', null],
    ['.DS_Store', null],
  ])('%s → %s', (name, kind) => {
    expect(classifyFile(name)).toBe(kind);
  });
});

describe('buildApparitionPool', () => {
  test('images, local video with matching poster (not also listed alone), and linked videos', () => {
    const pool = buildApparitionPool(['hand.png', 'ghost.webm', 'ghost.png', 'README.md'], {
      videos: [{ url: 'https://cdn.x/a.mp4', poster: 'https://cdn.x/a.png' }],
    });
    expect(pool).toEqual([
      { kind: 'video', src: '/apparitions/ghost.webm', poster: '/apparitions/ghost.png' },
      { kind: 'image', src: '/apparitions/hand.png' },
      { kind: 'video', src: 'https://cdn.x/a.mp4', poster: 'https://cdn.x/a.png' },
    ]);
  });

  test('encodes filenames with spaces', () => {
    expect(buildApparitionPool(['my hand.png'], { videos: [] })).toEqual([
      { kind: 'image', src: '/apparitions/my%20hand.png' },
    ]);
  });

  test('ignores dotfiles', () => {
    expect(buildApparitionPool(['.hidden.png'], { videos: [] })).toEqual([]);
  });
});

describe('pickApparition', () => {
  const video: Apparition = { kind: 'video', src: '/apparitions/ghost.webm', poster: '/apparitions/ghost.png' };
  const image: Apparition = { kind: 'image', src: '/apparitions/hand.png' };
  const linked: Apparition = { kind: 'video', src: 'https://cdn.x/a.mp4' };
  const pool = [image, video, linked];

  test('pinned local filename wins regardless of random', () => {
    expect(pickApparition(pool, { pinned: 'ghost.webm', preferStill: false, random: () => 0 })).toEqual(video);
  });

  test('pinned linked url wins', () => {
    expect(pickApparition(pool, { pinned: 'https://cdn.x/a.mp4', preferStill: false, random: () => 0 })).toEqual(
      linked,
    );
  });

  test('unknown pinned falls back to random pick', () => {
    expect(pickApparition(pool, { pinned: 'missing.png', preferStill: false, random: () => 0.5 })).toEqual(
      pool[Math.floor(0.5 * pool.length)],
    );
  });

  test('preferStill turns a video with poster into its poster image', () => {
    expect(pickApparition([video], { preferStill: true, random: () => 0 })).toEqual({
      kind: 'image',
      src: '/apparitions/ghost.png',
    });
  });

  test('preferStill picks an image when the chosen video has no poster', () => {
    expect(pickApparition([linked, image], { preferStill: true, random: () => 0 })).toEqual(image);
  });

  test('empty pool returns null', () => {
    expect(pickApparition([], { preferStill: false, random: () => 0 })).toBeNull();
  });

  test('only poster-less videos with preferStill returns null', () => {
    expect(pickApparition([linked], { preferStill: true, random: () => 0 })).toBeNull();
  });
});
