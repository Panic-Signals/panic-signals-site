import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

type Apparition = { kind: 'image' | 'video'; src: string; poster?: string };

/** Replace the build-time apparition list for this page (test-only hook read by intro.ts). */
async function withPool(page: Page, pool: Apparition[], pinned?: string) {
  await page.addInitScript(
    ([p, pin]) => {
      (window as any).__PS_INTRO_OVERRIDE__ = { pool: p, pinned: pin };
    },
    [pool, pinned] as const,
  );
}

const done = (page: Page, timeout = 9000) =>
  expect(page.locator('html')).toHaveAttribute('data-intro-state', 'done', { timeout });

test('plays on first visit then ends on the wordmark', async ({ page }) => {
  await withPool(page, []);
  await page.goto('/');
  await expect(page.locator('#intro')).toBeVisible();
  await expect(page.locator('#intro')).toContainText('PANIC SIGNALS');
  await done(page);
  await expect(page.locator('#intro')).toHaveCount(0);
  await expect(page.locator('#content')).toBeFocused();
});

test('does not replay in the same session', async ({ page }) => {
  await withPool(page, []);
  await page.goto('/');
  await page.locator('[data-intro-skip]').click();
  await done(page, 1000);
  await page.reload();
  await page.waitForTimeout(500);
  await expect(page.locator('#intro')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-intro-state', 'done');
});

test('skip button ends it immediately', async ({ page }) => {
  await withPool(page, []);
  await page.goto('/');
  await page.locator('[data-intro-skip]').click();
  await done(page, 500);
});

test('any key skips', async ({ page }) => {
  await withPool(page, []);
  await page.goto('/');
  await expect(page.locator('#intro')).toBeVisible();
  await page.keyboard.press('Escape');
  await done(page, 500);
});

test('no apparition: completes with no request to /apparitions/', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('/apparitions/')) requests.push(r.url());
  });
  await withPool(page, []);
  await page.goto('/');
  await done(page);
  expect(requests).toEqual([]);
});

test('image apparition is shown', async ({ page }) => {
  const png = readFileSync('tests/fixtures/apparition.png');
  await page.route('**/apparitions/test.png', (r) => r.fulfill({ body: png, contentType: 'image/png' }));
  await withPool(page, [{ kind: 'image', src: '/apparitions/test.png' }]);
  await page.goto('/');
  await expect(page.locator('#intro img[data-apparition]')).toHaveAttribute('src', '/apparitions/test.png');
  await done(page);
});

test('video fails: intro still completes', async ({ page }) => {
  await page.route('https://cdn.test/broken.webm', (r) => r.fulfill({ status: 404, body: '' }));
  await withPool(page, [{ kind: 'video', src: 'https://cdn.test/broken.webm' }]);
  await page.goto('/');
  await done(page);
});

test('video stalls: intro still completes', async ({ page }) => {
  await page.route('https://cdn.test/stall.webm', () => {
    /* never respond */
  });
  await withPool(page, [{ kind: 'video', src: 'https://cdn.test/stall.webm' }]);
  // A stalled video holds the window load event in WebKit; the intro must not depend on it.
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await done(page);
});

test('mobile autoplay attrs on video apparitions', async ({ page }) => {
  const webm = readFileSync('tests/fixtures/apparition.webm');
  await page.route('https://cdn.test/ok.webm', (r) => r.fulfill({ body: webm, contentType: 'video/webm' }));
  await withPool(page, [{ kind: 'video', src: 'https://cdn.test/ok.webm' }]);
  await page.goto('/');
  const video = page.locator('#intro video[data-apparition]');
  await expect(video).toHaveCount(1);
  const props = await video.evaluate((v: HTMLVideoElement) => ({
    muted: v.muted,
    playsInline: v.playsInline,
    autoplay: v.autoplay,
  }));
  expect(props).toEqual({ muted: true, playsInline: true, autoplay: true });
});

test('reduced motion: no flash, no video, quick', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    (window as any).__flashSeen = false;
    const poll = () => {
      const f = document.querySelector('[data-flash]');
      if (f && parseFloat(getComputedStyle(f).opacity) > 0) (window as any).__flashSeen = true;
      if (document.documentElement.dataset.introState !== 'done') requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
  });
  await withPool(page, [{ kind: 'video', src: 'https://cdn.test/no-poster.webm' }]);
  await page.goto('/');
  await done(page, 2500);
  expect(await page.evaluate(() => (window as any).__flashSeen)).toBe(false);
  expect(await page.evaluate(() => document.querySelectorAll('video').length)).toBe(0);
});

test.describe('no js', () => {
  test.use({ javaScriptEnabled: false });
  test('band content readable and no overlay', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#intro')).toHaveCount(0);
    for (const s of await page.locator('[data-band-section]').all()) await expect(s).toBeVisible();
  });
});

test('an animation error still ends the intro on its own', async ({ page }) => {
  await page.addInitScript(() => {
    Element.prototype.animate = () => {
      throw new Error('animate unsupported');
    };
  });
  await withPool(page, []);
  await page.goto('/');
  await done(page);
  await expect(page.locator('#intro')).toHaveCount(0);
});
