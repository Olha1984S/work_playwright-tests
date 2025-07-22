import { Page } from '@playwright/test';

export class ForNewWiki_3 {
  constructor(private page: Page) {}

  // проверка зоголовка
  async headlinecheck() {
    const title = await this.page.locator('#firstHeading').textContent();
    return title;
     

  }
}

