import { test, expect } from '@playwright/test';

import { WikiHomePage } from '../pages/WikiHomePage'; 
import { WikiMainPage } from '../pages/WikiMainPage';
import { RandomArticle } from '../pages/RandomArticle';

test('Открыть случайную статью на Wikipedia и вывести заголовок', async ({ page }) => {
  
  // *** Шаг 1: открываем wikipedia.org и выбираем русский язык Смотрим файл pages/WikiHomePage.ts
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();        // «Русский» по умолчанию

  // *** Шаг 2: кликаем «Случайная статья» Смотрим файл pages/WikiMainPage.ts
  const wiki = new WikiMainPage(page); 
  await wiki.openRandomArticle();

  // *** Шаг 3: проверяем заголовок статьи 
  const title = new RandomArticle(page); 
  await title.articleTitleIsVisible();
  await title.articleParagraph();
  await title.articleLink();
  await title.articleScreenshot();

});



