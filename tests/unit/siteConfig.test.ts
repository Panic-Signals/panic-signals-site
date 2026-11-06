import { describe, expect, test } from 'vitest';
import { loadSiteConfig, parseSiteConfig } from '../../src/lib/siteConfig';

const endpoint = 'https://formspree.io/f/abc';

describe('site config', () => {
  test('parses the committed site.config.yaml', () => {
    const cfg = loadSiteConfig();
    expect(cfg.timezone).toBe('America/New_York');
    expect(cfg.apparitions.videos).toEqual([]);
  });

  test('defaults missing timezone/apparitions/social', () => {
    expect(parseSiteConfig({ formspreeEndpoint: endpoint })).toEqual({
      formspreeEndpoint: endpoint,
      timezone: 'America/New_York',
      apparitions: { videos: [] },
      social: [],
    });
  });

  test('rejects non-formspree endpoint', () => {
    expect(() => parseSiteConfig({ formspreeEndpoint: 'https://evil.example/f/x' })).toThrow(
      /formspreeEndpoint/,
    );
  });

  test.each(['https://youtu.be/x', 'https://www.youtube.com/watch?v=x', 'https://vimeo.com/1'])(
    'rejects YouTube/Vimeo video url %s',
    (url) => {
      expect(() =>
        parseSiteConfig({ formspreeEndpoint: endpoint, apparitions: { videos: [{ url }] } }),
      ).toThrow(/direct video file/);
    },
  );

  test('rejects video url without .mp4/.webm/.mov path', () => {
    expect(() =>
      parseSiteConfig({
        formspreeEndpoint: endpoint,
        apparitions: { videos: [{ url: 'https://cdn.x/clip' }] },
      }),
    ).toThrow(/direct video file/);
  });

  test('accepts a direct video url with a query string', () => {
    const cfg = parseSiteConfig({
      formspreeEndpoint: endpoint,
      apparitions: { videos: [{ url: 'https://cdn.x/clip.webm?v=2', poster: 'https://cdn.x/clip.png' }] },
    });
    expect(cfg.apparitions.videos).toEqual([
      { url: 'https://cdn.x/clip.webm?v=2', poster: 'https://cdn.x/clip.png' },
    ]);
  });

  test('treats empty pinned as undefined', () => {
    const cfg = parseSiteConfig({ formspreeEndpoint: endpoint, apparitions: { pinned: null } });
    expect(cfg.apparitions.pinned).toBeUndefined();
  });
});
