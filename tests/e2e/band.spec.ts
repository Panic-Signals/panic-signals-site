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
  await expect(summary.locator('a[href="/shows"]')).toBeVisible();
  await expect(summary.locator('a[href="/booking"]')).toBeVisible();
});

test('nav has Home, Shows, Booking, Software', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav[aria-label="Main"] a')).toHaveText(['Home', 'Shows', 'Booking', 'Software']);
});
