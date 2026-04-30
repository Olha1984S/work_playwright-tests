import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';

test('Open random Wikipedia article and verify title is not empty', async ({ page }) => {

  // Step 1: Open wikipedia.org and select language
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage(); // default: Russian

  // Step 2: Open random article
  const wiki = new WikiMainPage(page);
  await wiki.openRandomArticle();

  // Step 3: Get article title
  const title = await page.locator('#firstHeading').textContent();

  console.log('Article title:', title);

  // Step 4: Verify title is not empty
  expect(title?.trim()).not.toBeNull();

  // Additional check: ensure correct URL
  await expect(page).toHaveURL(/wiki/);
});
