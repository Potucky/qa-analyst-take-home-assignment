import { test, expect } from '@playwright/test';

test.describe('Frontend tests - Example Domain', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://example.com');
  });

  test('should load Example Domain page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should display main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
  });

  test('should display documentation description text', async ({ page }) => {
    await expect(
      page.getByText('This domain is for use in documentation examples without needing permission.')
    ).toBeVisible();
  });

  test('should display Learn more link with correct URL', async ({ page }) => {
    const learnMoreLink = page.getByRole('link', { name: 'Learn more' });

    await expect(learnMoreLink).toBeVisible();
    await expect(learnMoreLink).toHaveAttribute(
      'href',
      'https://iana.org/domains/example'
    );
  });
});
