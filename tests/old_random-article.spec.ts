import { test, expect } from '@playwright/test';

test('Открыть случайную статью на Wikipedia и вывести заголовок', async ({ page }) => {
  // Переход на главную страницу Wikipedia
  await page.goto('https://www.wikipedia.org');

  // Нажимаем на ссылку "Русский", чтобы открыть русскую версию сайта 
  await page.getByRole('link', { name: 'Русский' }).click();

  // Нажимаем на "Случайная статья"
  await page.getByRole('link', { name: 'Случайная статья' }).click();

  // Ждём загрузку новой страницы и получаем заголовок
  const articleTitle = await page.locator('#firstHeading').textContent();

  // Выводим заголовок в консоль 
  console.log('Заголовок статьи:', articleTitle);

  // Проверка: заголовок должен существовать 
  expect(articleTitle).not.toBeNull();
});



