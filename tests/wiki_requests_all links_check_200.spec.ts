import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';

test('Все валидные ссылки в случайной статье Wikipedia возвращают HTTP-коды', async ({ page, request }) => {
  test.setTimeout(120_000); // увеличенный таймаут  --- 2 минуты

  const home = new WikiHomePage(page);
  const main = new WikiMainPage(page);

  // Переход на главную и выбор языка
  await home.goto();
  await home.chooseLanguage('Русский');

  // Переход к случайной статье
  await main.openRandomArticle();

  // Убедимся, что мы точно на статье
  console.log(`📄 Открыта статья: ${page.url()}`);

  // Ждём появления ссылок внутри статьи
  await page.waitForSelector('#bodyContent a');

  const articleBody = page.locator('#bodyContent');
  const linkLocators = articleBody.locator('a');
  const linkCount = await linkLocators.count();  // count() метода для подсчета 
  console.log(`🔗 Найдено ссылок внутри #bodyContent: ${linkCount}`);

  const links = await linkLocators.elementHandles();

  const checkedLinks: { url: string; status: number }[] = [];
  const badLinks: { url: string; status: number }[] = [];

  for (const link of links) {
    const href = await link.getAttribute('href');

    // Пропускаем невалидные типы ссылок
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
      continue;
    }

    const url = href.startsWith('http') ? href : new URL(href, page.url()).toString();

    try {
      const response = await request.get(url);
      const status = response.status();

      console.log(`🌐 ${url} → ${status}`);
      checkedLinks.push({ url, status });

      if (status < 200 || status >= 300) {
        badLinks.push({ url, status });
      }
    } catch (error) {
      console.warn(`⚠️ ${url} → ошибка запроса`);
      checkedLinks.push({ url, status: 0 });
      badLinks.push({ url, status: 0 });
    }
  }

  // 📋 Финальный вывод
  console.log('\n📋 Все проверенные ссылки:');
  checkedLinks.forEach(({ url, status }) => {
    console.log(` - ${url} → ${status}`);
  });

  if (badLinks.length > 0) {
    console.log('\n❌ Битые ссылки:');
    badLinks.forEach(({ url, status }) => {
      console.log(` - ${url} → ${status}`);
    });
  } else {
    console.log('\n✅ Все ссылки успешны!');
  }

  // ❗ Если есть битые — проваливаем тест
  expect(badLinks, 'Обнаружены битые ссылки').toEqual([]);
});









