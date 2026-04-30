import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';

test('Validate that all links in a random Wikipedia article return valid HTTP status codes', async ({ page, request }) => {
  test.setTimeout(120_000); // extended timeout (2 minutes)

  const home = new WikiHomePage(page);
  const main = new WikiMainPage(page);

  // Step 1: Open Wikipedia and select language
  await home.goto();
  await home.chooseLanguage('Русский');

  // Step 2: Open random article
  await main.openRandomArticle();

  console.log(`Article opened: ${page.url()}`);

  // Step 3: Wait for links inside article
  await page.waitForSelector('#bodyContent a');

  const articleBody = page.locator('#bodyContent');
  const linkLocators = articleBody.locator('a');
  const linkCount = await linkLocators.count();

  console.log(`Links found in article: ${linkCount}`);

  const links = await linkLocators.elementHandles();

  const checkedLinks: { url: string; status: number }[] = [];
  const badLinks: { url: string; status: number }[] = [];

  for (const link of links) {
    const href = await link.getAttribute('href');

    // Skip invalid link types
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
      continue;
    }

    const url = href.startsWith('http') ? href : new URL(href, page.url()).toString();

    try {
      const response = await request.get(url);
      const status = response.status();

      console.log(`${url} → ${status}`);
      checkedLinks.push({ url, status });

      if (status < 200 || status >= 300) {
        badLinks.push({ url, status });
      }
    } catch {
      console.warn(`${url} → request failed`);
      checkedLinks.push({ url, status: 0 });
      badLinks.push({ url, status: 0 });
    }
  }

  // Final report
  console.log('\nAll checked links:');
  checkedLinks.forEach(({ url, status }) => {
    console.log(` - ${url} → ${status}`);
  });

  if (badLinks.length > 0) {
    console.log('\nBroken links found:');
    badLinks.forEach(({ url, status }) => {
      console.log(` - ${url} → ${status}`);
    });
  } else {
    console.log('\nAll links are valid');
  }

  // Fail test if broken links exist
  expect(badLinks, 'Broken links were found').toEqual([]);
});









