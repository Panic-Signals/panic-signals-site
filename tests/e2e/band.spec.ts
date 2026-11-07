import { expect, test } from '@playwright/test';
import { skipIntro } from './helpers';

test.beforeEach(async ({ page }) => skipIntro(page));

test('home renders the band sections in order', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-band-section] h2')).toHaveText(['About', 'Transmissions']);
});

test('band pages use the monospace font', async ({ page }) => {
  await page.goto('/');
  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(font).toContain('Courier');
});

test('with no shows booked, the shows page says so', async ({ page }) => {
  await page.goto('/shows');
  await expect(page.locator('[data-show-date]')).toHaveCount(0);
  await expect(page.locator('[data-empty-shows]')).toBeVisible();
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

// The browser-side hiding of past shows (ShowList.astro's script) had end-to-end tests
// that used the example show. With no show files there's nothing for them to hide; bring
// them back with a test fixture show. tests/unit covers which shows count as upcoming.
