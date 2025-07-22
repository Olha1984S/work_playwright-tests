import { Page } from '@playwright/test';

export class ForNewWiki_1 {
  constructor(private page: Page) {}

  // заходим на сайт
  async enterToSite() {
    await this.page.goto('https://www.wikipedia.org');
  }
// открываем русскую версию сайта 
  async chooseLanguage(language = 'Русский') {
    await this.page.getByRole('link', { name: language }).click(); 
  }
}

