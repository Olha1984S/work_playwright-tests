import { Page } from '@playwright/test';

/** Стартовая страница wikipedia.org (выбор языка) */ 
export class WikiHomePage {
  constructor(private page: Page) {}

  /** Открыть wikipedia.org */ 
  async goto() {
    await this.page.goto('https://www.wikipedia.org');
  }

  /** Клик по ссылке нужного языка (по умолчанию — «Русский») */ 
  async chooseLanguage(language = 'Русский') {
    await this.page.getByRole('link', { name: language }).click(); 
  }
}