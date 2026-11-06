import { expect, test } from '@playwright/test';
import { skipIntro } from './helpers';

test.beforeEach(async ({ page }) => skipIntro(page));

test('home renders the four band sections in order', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-band-section] h2')).toHaveText([
    'About',
    "Where We're From",
    'Our Sound',
    'Vision',
  ]);
});

test('band pages use the monospace font', async ({ page }) => {
  await page.goto('/');
  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(font).toContain('Courier');
});

test('shows page lists the example show', async ({ page }) => {
  await page.goto('/shows');
  await expect(page.locator('[data-show-date="2026-12-12"]')).toBeVisible();
  await expect(page.locator('[data-show-date="2026-12-12"]')).toContainText('Example Venue');
});

test('home shows summary links to /shows and /booking', async ({ page }) => {
  await page.goto('/');
  const summary = page.locator('#shows');
  await expect(summary.locator('a.button[href="/shows"]')).toBeVisible();
  await expect(summary.locator('a.button[href="/booking"]')).toBeVisible();
});

test('nav has Home, Shows, Booking, Software', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav[aria-label="Main"] a')).toHaveText(['Home', 'Shows', 'Booking', 'Software']);
});

test.describe('past shows hide themselves even if the nightly rebuild stops', () => {
  test('a show whose date has passed is hidden and the empty state appears', async ({ page }) => {
    // 2026-12-14 noon UTC: the example show (2026-12-12) is in the past.
    await page.clock.setFixedTime(new Date('2026-12-14T12:00:00Z'));
    await page.goto('/shows');
    await expect(page.locator('[data-show-date="2026-12-12"]')).toBeHidden();
    await expect(page.locator('[data-empty-shows]')).toBeVisible();
  });

  test('a show dated today in the site timezone stays visible', async ({ page }) => {
    // 03:00 UTC Dec 13 = evening of Dec 12 in New York.
    await page.clock.setFixedTime(new Date('2026-12-13T03:00:00Z'));
    await page.goto('/shows');
    await expect(page.locator('[data-show-date="2026-12-12"]')).toBeVisible();
    await expect(page.locator('[data-empty-shows]')).toBeHidden();
  });

  test('no-JS visitors still see the list', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const p = await ctx.newPage();
    await p.goto('/shows');
    await expect(p.locator('[data-show-date="2026-12-12"]')).toBeVisible();
    await ctx.close();
  });
});
