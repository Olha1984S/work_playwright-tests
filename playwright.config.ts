import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://www.wikipedia.org',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
