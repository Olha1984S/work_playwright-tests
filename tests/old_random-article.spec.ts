import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Open random Wikipedia article and verify title is displayed', async ({ page }) => {

  const homePage = new HomePage(page);

  // Step 1: Open Wikipedia
  await homePage.open('https://www.wikipedia.org');

  // Step 2: Select Russian language
  await page.getByRole('link', { name: 'Русский' }).click();

  // Step 3: Open random article
  await page.getByRole('link', { name: 'Случайная статья' }).click();

  // Step 4: Get article title
  const articleTitle = await page.locator('#firstHeading').textContent();

  console.log('Article title:', articleTitle);

  // Step 5: Verify title exists
  expect(articleTitle).not.toBeNull();

  // Additional check: URL contains /wiki/
  await expect(page).toHaveURL(/wiki/);
});
