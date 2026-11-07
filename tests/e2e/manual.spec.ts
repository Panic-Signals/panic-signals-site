import { expect, test } from '@playwright/test';

test('manual contents lists every chapter in order', async ({ page }) => {
  await page.goto('/software/deckard/manual');
  const items = page.locator('.contents li');
  await expect(items.first()).toContainText('Using this manual');
  await expect(items).toHaveCount(10);
  await expect(items.nth(7)).toContainText('Multi-output plug-ins');
});

test('a chapter marks itself in the sidebar and numbers its sections', async ({ page }) => {
  await page.goto('/software/deckard/manual/modulation');
  await expect(page.locator('h1')).toContainText('6.');
  await expect(page.locator('.manual-nav a[aria-current="page"]')).toContainText('Modulation');
  await expect(page.locator('.manual-body')).toHaveAttribute('style', /counter-reset: chapter 6/);
  await expect(page.locator('.manual-toc')).toContainText('6.1');
});

test('chapters link to the previous and next chapter', async ({ page }) => {
  await page.goto('/software/deckard/manual/maschine-mk3');
  await expect(page.locator('.pager a[rel="prev"]')).toContainText('Differences from Maschine');
  await page.locator('.pager a[rel="next"]').click();
  await expect(page).toHaveURL(/launchpad-pro-mk3/);
});

test('diagrams and screenshots load', async ({ page }) => {
  for (const path of ['/software/deckard/manual/maschine-mk3', '/software/deckard/manual/multi-output-plug-ins']) {
    await page.goto(path);
    const imgs = page.locator('.manual-body figure img');
    const n = await imgs.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i++) {
      const img = imgs.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
    }
  }
});

test('on a phone the chapter list folds into a menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/software/deckard/manual/launchpad-pro-mk3');
  await expect(page.locator('.manual-nav')).toBeHidden();
  await page.locator('.manual-nav-mobile summary').click();
  await expect(page.locator('.manual-nav-mobile a[aria-current="page"]')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
