import { Page, expect } from '@playwright/test';

/** Страница случайной статьи на wikipedia.org  */ 
export class RandomArticle {
  constructor(private page: Page) {}

/** Проверка заголовка */ 
  async articleTitleIsVisible() {
    const thisTitle = await expect(this.page.locator('#firstHeading')).toBeVisible();   // expect(...).toBeVisible()	Проверяет, что элемент действительно виден.
                                                                      // expect в Playwright — это инструмент для проверки условий во время теста.
                                                                      // Он помогает убедиться, что страница или элементы ведут себя так, как ты ожидаешь.
    
    
  }                                                                   
  
  /** Проверка наличия параграфа <p> */
  async articleParagraph() {
    const paragraphs = this.page.locator('p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);                                  // проверка, что есть хотя бы 1 <p>
  }

  /** Проверка наличия ссылки */
  async articleLink() {
    const links = this.page.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);                                  // проверка, что есть хотя бы 1 <p>
  }

  /** Создание скриншота */
  async articleScreenshot() {
    const screenTime = new Date()
    .toISOString()                // Пример: "2025-07-17T12:34:56.789Z"
    .replace(/[:.]/g, '-');       // Заменяем двоеточия и точки на дефисы
    
    const screenName = `screenshot-${screenTime}.png`;
    await this.page.screenshot({ path: `screenshots/${screenName}`, fullPage: true });
  }
}