import { expect, test } from '@playwright/test';
import { skipIntro } from './helpers';

const PAGES = ['/', '/shows', '/booking', '/software', '/software/deckard', '/software/eps16plus', '/software/deckard/manual'];

test.beforeEach(async ({ page }) => skipIntro(page));

for (const path of PAGES) {
  test(`${path} loads without console errors and its internal links resolve`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    expect(errors).toEqual([]);

    const hrefs = await page.$$eval('a[href^="/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')!))]);
    for (const href of hrefs) {
      const r = await request.get(href);
      expect(r.status(), `${path} → ${href}`).toBe(200);
    }
  });
}

test('unknown pages show the NO SIGNAL 404', async ({ page }) => {
  const res = await page.goto('/nope');
  expect(res?.status()).toBe(404);
  await expect(page.locator('main')).toContainText('NO SIGNAL');
  await expect(page.locator('main a[href="/"]')).toBeVisible();
});

test('the site icons load', async ({ page, request }) => {
  await page.goto('/');
  for (const href of ['/favicon.ico', '/icon-192.png', '/apple-touch-icon.png']) {
    await expect(page.locator(`head link[href="${href}"]`)).toHaveCount(1);
    expect((await request.get(href)).ok()).toBe(true);
  }
});

test('the header shows the logo, linked home, with the glitch split', async ({ page }) => {
  for (const path of ['/', '/software']) {
    await page.goto(path);
    const logo = page.locator('header a.wordmark[href="/"] img[alt="Panic Signals"]');
    await expect(logo).toBeVisible();
    expect(await logo.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    expect(await logo.evaluate((el) => getComputedStyle(el).filter)).toContain('drop-shadow');
  }
});
