import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Validate that all links return correct HTTP status codes', async ({ page, request }) => {
  test.setTimeout(120_000); // extended timeout for link validation

  const homePage = new HomePage(page);

  // Open target website
  await homePage.open('https://english-e-reader.net');

  await page.waitForTimeout(3000);

  // Close notification popup if present
  await page.click('#onesignal-slidedown-cancel-button');

  // Verify correct page is opened
  console.log(`Page opened: ${page.url()}`);

  // Wait for links to appear inside content block
  await page.waitForSelector('.category-wrap:nth-of-type(1) a');

  // Select first content block and extract links
  const articleBody = page.locator('.category-wrap').nth(0);
  const linkLocators = articleBody.locator('a');
  const linkCount = await linkLocators.count();

  console.log(`Links found in block: ${linkCount}`);

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





