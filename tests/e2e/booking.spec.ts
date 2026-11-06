import { expect, test, type Page } from '@playwright/test';
import { skipIntro } from './helpers';

const FORMSPREE = 'https://formspree.io/**';

async function fill(page: Page) {
  await page.fill('[name="name"]', 'Ada Promoter');
  await page.fill('[name="email"]', 'ada@example.com');
  await page.fill('[name="event"]', 'Dark Night Fest');
  await page.fill('[name="city"]', 'Chicago, IL');
  await page.fill('[name="date"]', '2027-03-14');
  await page.fill('[name="message"]', 'Want you to headline.');
}

test.beforeEach(async ({ page }) => {
  await skipIntro(page);
  await page.goto('/booking');
});

test('required fields block submit', async ({ page }) => {
  let requests = 0;
  await page.route(FORMSPREE, (r) => {
    requests++;
    return r.fulfill({ status: 200, body: '{"ok":true}' });
  });
  await page.click('[data-booking] button[type="submit"]');
  await page.waitForTimeout(300);
  expect(requests).toBe(0);
  expect(await page.locator('[name="name"]').evaluate((el: HTMLInputElement) => el.matches(':invalid'))).toBe(true);
});

test('successful submit', async ({ page }) => {
  let body = '';
  let accept = '';
  await page.route(FORMSPREE, async (r) => {
    body = r.request().postData() ?? '';
    accept = (await r.request().allHeaders())['accept'] ?? '';
    return r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await fill(page);
  await page.click('[data-booking] button[type="submit"]');
  await expect(page.locator('[data-booking-status]')).toContainText('Thanks');
  await expect(page.locator('[name="message"]')).toHaveValue('');
  expect(body).toContain('ada@example.com');
  expect(body).toContain('name="_gotcha"');
  expect(accept).toContain('application/json');
});

test('error keeps input', async ({ page }) => {
  await page.route(FORMSPREE, (r) =>
    r.fulfill({ status: 422, contentType: 'application/json', body: '{"errors":[{"message":"bad"}]}' }),
  );
  await fill(page);
  await page.click('[data-booking] button[type="submit"]');
  await expect(page.locator('[data-booking-status]')).toContainText("couldn't send");
  await expect(page.locator('[data-booking-status]')).not.toContainText('email us');
  await expect(page.locator('[name="message"]')).toHaveValue('Want you to headline.');
  await expect(page.locator('[data-booking] button[type="submit"]')).toBeEnabled();
});

test('network failure keeps input', async ({ page }) => {
  await page.route(FORMSPREE, (r) => r.abort());
  await fill(page);
  await page.click('[data-booking] button[type="submit"]');
  await expect(page.locator('[data-booking-status]')).toContainText("couldn't send");
  await expect(page.locator('[name="message"]')).toHaveValue('Want you to headline.');
  await expect(page.locator('[data-booking] button[type="submit"]')).toBeEnabled();
});

test('submit disabled while sending', async ({ page }) => {
  await page.route(FORMSPREE, async (r) => {
    await new Promise((res) => setTimeout(res, 1000));
    return r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await fill(page);
  const button = page.locator('[data-booking] button[type="submit"]');
  await button.click();
  await expect(button).toBeDisabled();
  await expect(button).toHaveText('Sending…');
  await expect(page.locator('[data-booking-status]')).toContainText('Thanks');
});

test.describe('without JS', () => {
  test.use({ javaScriptEnabled: false });
  test('form posts straight to Formspree', async ({ page }) => {
    await page.goto('/booking');
    const form = page.locator('[data-booking]');
    await expect(form).toHaveAttribute('action', 'https://formspree.io/f/REPLACE_ME');
    expect(await form.evaluate((f: HTMLFormElement) => f.method)).toBe('post');
  });
});
