export class HomePage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator('header');
    this.menuLinks = page.locator('nav a');
  }

  async open(url) {
    await this.page.goto(url);
  }

  async isLogoVisible() {
    return await this.logo.isVisible();
  }

  async getMenuLinksCount() {
    return await this.menuLinks.count();
  }
}
