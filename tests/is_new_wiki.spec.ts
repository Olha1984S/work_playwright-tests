import { test, expect } from '@playwright/test';
import { ForNewWiki_1 } from '../pages/ForNewWiki_1';
import { ForNewWiki_2 } from '../pages/ForNewWiki_2';
import { ForNewWiki_3 } from '../pages/ForNewWiki_3';

test('Тeст для Wiki + Git', async ({ page }) => {

  // вход
  const enterWiki = new ForNewWiki_1(page);
  await enterWiki.enterToSite();
  await enterWiki.chooseLanguage();

  // поиск
  const enterwordtosearch = new ForNewWiki_2(page);
  await enterwordtosearch.enterword();

  // заголовок
  const headlinewordcheck = new ForNewWiki_3(page);
  await headlinewordcheck.headlinecheck();

  

})