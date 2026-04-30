import { test, expect } from '@playwright/test';
import { ForNewWiki_1 } from '../pages/ForNewWiki_1';
import { ForNewWiki_2 } from '../pages/ForNewWiki_2';
import { ForNewWiki_3 } from '../pages/ForNewWiki_3';

test('Search functionality on Wikipedia works correctly', async ({ page }) => {

  // Step 1: Open Wikipedia and select language
  const wikiHome = new ForNewWiki_1(page);
  await wikiHome.enterToSite();
  await wikiHome.chooseLanguage();

  // Step 2: Perform search
  const searchPage = new ForNewWiki_2(page);
  await searchPage.enterword();

  // Step 3: Verify search result headline
  const resultPage = new ForNewWiki_3(page);
  await resultPage.headlinecheck();

  // Basic assertion: ensure page has correct URL
  await expect(page).toHaveURL(/wiki/);
});
