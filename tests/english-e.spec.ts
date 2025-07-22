import { test, expect } from '@playwright/test';


test('Все валидные ссылки на странице сайта https://english-e-reader.net возвращают HTTP-коды', async ({ page, request }) => {
  test.setTimeout(120_000); // увеличенный таймаут

  /** Открыть https://english-e-reader.net */ 
  
  await page.goto('https://english-e-reader.net');

  await page.waitForTimeout(3000);

  await page.click('#onesignal-slidedown-cancel-button');
  
  // // Убедимся, что мы точно на нужной странице
  // console.log(`📄 Открыта страница: ${page.url()}`);

  // // Ждём появления ссылок внутри статьи
  
  // await page.waitForSelector('.category-wrap:nth-of-type(0) a');

  // const articleBody = page.locator('.category-wrap:nth-of-type(0) a');
  // const linkLocators = articleBody.locator('a');
  // const linkCount = await linkLocators.count();
  // console.log(`🔗 Найдено ссылок внутри блока: ${linkCount}`);

 // Убедимся, что открыта нужная страница
  console.log(`📄 Открыта страница: ${page.url()}`);

  // Ждём появления ссылок внутри блока
  await page.waitForSelector('.category-wrap:nth-of-type(1) a');

  // Выбираем 1-й блок и ссылки в нём
  const articleBody = page.locator('.category-wrap').nth(0);
  const linkLocators = articleBody.locator('a');
  const linkCount = await linkLocators.count();
  console.log(`🔗 Найдено ссылок внутри блока: ${linkCount}`);

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









