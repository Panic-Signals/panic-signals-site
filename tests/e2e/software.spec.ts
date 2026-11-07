import { expect, test } from '@playwright/test';

test('software list shows DECKARD', async ({ page }) => {
  await page.goto('/software');
  const card = page.locator('[data-project="deckard"]');
  await expect(card).toContainText('DECKARD');
  await expect(card.locator('a[href="/software/deckard"]')).toBeVisible();
});

test('the status in the software list opens the manual', async ({ page }) => {
  await page.goto('/software');
  await page.locator('[data-project="deckard"] a.status').click();
  await expect(page).toHaveURL(/\/software\/deckard\/manual\/?$/);
});

test('deckard page links to repo and releases', async ({ page }) => {
  await page.goto('/software/deckard');
  await expect(page.locator('main a[href="https://github.com/Panic-Signals/Deckard"]').first()).toBeVisible();
  await expect(page.locator('main a[href="https://github.com/Panic-Signals/Deckard/releases"]').first()).toBeVisible();
});

test('deckard page links to the manual', async ({ page }) => {
  await page.goto('/software/deckard');
  await expect(page.locator('main a[href="/software/deckard/manual"]').first()).toBeVisible();
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

test('software list shows the EPS16+ utility, and its page opens the online editor', async ({ page }) => {
  await page.goto('/software');
  const card = page.locator('[data-project="eps16plus"]');
  await expect(card).toContainText('EPS16+');
  await card.locator('a[href="/software/eps16plus"]').click();
  await expect(page.locator('h1')).toContainText('EPS16+ Wavesample Utility');
  await expect(page.locator('main a[href="https://summitt.github.io/EnsoniqEPS16Plus/"]').first()).toBeVisible();
  await expect(page.locator('main a[href="https://github.com/summitt/EnsoniqEPS16Plus"]').first()).toBeVisible();
});

test('deckard page embeds its video', async ({ page }) => {
  await page.goto('/software/deckard');
  const frame = page.locator('main .video iframe');
  await expect(frame).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/BENUyHwMlmg/);
  const box = await frame.boundingBox();
  expect(box && Math.round((box.width / box.height) * 9)).toBe(16);
});

test('the EPS16+ status in the software list opens the online editor', async ({ page }) => {
  await page.goto('/software');
  await expect(page.locator('[data-project="eps16plus"] a.status')).toHaveAttribute(
    'href',
    'https://summitt.github.io/EnsoniqEPS16Plus/',
  );
});
