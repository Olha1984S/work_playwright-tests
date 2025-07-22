import { Page } from '@playwright/test';

/** Главная страница русской Википедии */ 
export class WikiMainPage {
  constructor(private page: Page) {}

  /** Переход к случайной статье */ 
  async openRandomArticle() {
    await this.page.getByRole('link', { name: 'Случайная статья' }).click();
  }
}