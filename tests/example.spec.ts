import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Verify that Example Domain page loads correctly', async ({ page }) => {
  const homePage = new HomePage(page);

  // Open base URL
  await homePage.open('/');

  // Verify page title
  await expect(page).toHaveTitle(/Wikipedia/);

  // Verify header is visible
  const isVisible = await homePage.isLogoVisible();
  expect(isVisible).toBeTruthy();
});
