import { test, expect } from '@playwright/test';

test('Простой тест — проверка заголовка', async ({ page }) => { 
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');

    console.log("This is first commit in new branch");
});

