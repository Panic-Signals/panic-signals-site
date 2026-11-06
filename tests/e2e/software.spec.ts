import { expect, test } from '@playwright/test';

test('software list shows DECKARD', async ({ page }) => {
  await page.goto('/software');
  const card = page.locator('[data-project="deckard"]');
  await expect(card).toContainText('DECKARD');
  await expect(card.locator('a[href="/software/deckard"]')).toBeVisible();
});

test('deckard page links to repo and releases', async ({ page }) => {
  await page.goto('/software/deckard');
  await expect(page.locator('main a[href="https://github.com/Panic-Signals/Deckard"]').first()).toBeVisible();
  await expect(page.locator('main a[href="https://github.com/Panic-Signals/Deckard/releases"]').first()).toBeVisible();
});

test('deckard page says manual coming soon', async ({ page }) => {
  await page.goto('/software/deckard');
  await expect(page.locator('main')).toContainText('Manual coming soon');
});

test('software pages are not monospace, but the wordmark is', async ({ page }) => {
  await page.goto('/software/deckard');
  const bodyFont = await page.locator('main p').first().evaluate((el) => getComputedStyle(el).fontFamily);
  expect(bodyFont).not.toContain('Courier');
  const markFont = await page.locator('header .wordmark').evaluate((el) => getComputedStyle(el).fontFamily);
  expect(markFont).toContain('Courier');
});

test('software pages have no scanline overlay', async ({ page }) => {
  await page.goto('/software');
  const content = await page.evaluate(() => getComputedStyle(document.body, '::before').content);
  expect(['none', 'normal', '']).toContain(content);
});
