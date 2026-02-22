import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  get header(): Locator {
    return this.page.locator('header');
  }

  get footer(): Locator {
    return this.page.locator('._footer_8h9kr_8');
  }

  get navigationMenu(): Locator {
    return this.page.locator('nav');
  }

  async checkPageTitle(expectedTitle: string | RegExp) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async checkPageLoaded() {
    const response = await this.page.goto(this.page.url());
    expect(response?.status()).toBe(200);
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }

  async waitForNavigation(timeout = 30000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async waitForPageLoad() {
    await this.page.waitForSelector('body', { state: 'attached' });
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async closeCookiePopup() {
    try {
      const cookieButton = this.page.locator('button:has-text("ОК")').first();
      await cookieButton.click({ timeout: 3000 });
    } catch {
      // попапа нет или он уже закрыт
    }
  }

  async waitForFooter(timeout = 10000) {
    await this.page.waitForSelector('._footer_8h9kr_8', { timeout });
  }
}
