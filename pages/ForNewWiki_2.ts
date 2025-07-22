import { Page } from '@playwright/test';

export class ForNewWiki_2 {
  constructor(private page: Page) {}

  // вводим запрос в строку поиска
  async enterword() {
    await this.page.locator('input[name="search"]').fill('Тестирование');

  // ждём появления выпадающего списка
    await this.page.waitForSelector('.suggestions-results a'); 

  // кликаем по первой ссылке в выпадающем списке
    await this.page.locator('.suggestions-results a').first().click();

  }
   
    
}

