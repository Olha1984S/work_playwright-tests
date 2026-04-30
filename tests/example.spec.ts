import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Verify that Example Domain page loads correctly', async ({ page }) => {
  const homePage = new HomePage(page);

  // Open Example website
  await homePage.open('https://example.com');

  // Verify page title
  await expect(page).toHaveTitle(/Example Domain/);

  // Verify header is visible (basic UI check)
  const isVisible = await homePage.isLogoVisible();
  expect(isVisible).toBeTruthy();
});
