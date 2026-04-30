import { expect, test } from '@playwright/test';

test.describe('Example.com frontend smoke checks', () => {
  test('loads the homepage with the expected title and content', async ({ page }) => {
    await page.goto('http://example.com/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('body')).toContainText('Example Domain');
  });

  test('contains a working IANA information link', async ({ page }) => {
    await page.goto('http://example.com/', { waitUntil: 'domcontentloaded' });

    const moreInformationLink = page.locator('a[href*="iana.org"]').first();

    await expect(moreInformationLink).toBeVisible();

    const href = await moreInformationLink.getAttribute('href');
    expect(href).toContain('iana.org');
  });
});
