import { test, expect } from '@playwright/test';

import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';
import { RandomArticle } from '../pages/RandomArticle';

test('Open random Wikipedia article and validate content', async ({ page }) => {

  // Step 1: Open wikipedia.org and select language
  const home = new WikiHomePage(page);
  await home.goTo();
  await home.chooseLanguage(); // default: Russian

  // Step 2: Open random article
  const wiki = new WikiMainPage(page);
  await wiki.openRandomArticle();

  // Step 3: Validate article content
  const article = new RandomArticle(page);

  await article.articleTitleIsVisible();
  await article.articleParagraph();
  await article.articleLink();
  await article.articleScreenshot();

  // Additional check: ensure correct URL
  await expect(page).toHaveURL(/wiki/);
});

