import { test, expect } from '@playwright/test';

test.describe('Frontend tests - Example Domain', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://example.com');
  });

  test('should load Example Domain page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should display documentation description text', async ({ page }) => {
    await expect(
      page.getByText('This domain is for use in documentation examples without needing permission.')
    ).toBeVisible();
  });

  test('should state that the domain is not a service', async ({ page }) => {
    await expect(page.getByText('This is not a service')).toBeVisible();
  });
});
