import type { Page } from '@playwright/test';

/** Mark the intro as already seen so page tests aren't covered by it. */
export async function skipIntro(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem('ps-intro-seen', '1'));
}
