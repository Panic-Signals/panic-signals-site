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
