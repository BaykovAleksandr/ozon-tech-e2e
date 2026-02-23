import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get videoSection(): Locator {
    return this.page.locator('._video_1q8y1_1');
  }

  get watchVideoButton(): Locator {
    return this.page.locator('._contentButton_1q8y1_47');
  }

  get eventsTab(): Locator {
    return this.page.locator('a[data-testid="menuItem"][href="/events/"]').first();
  }

  get vacanciesTab(): Locator {
    return this.page.locator('a[data-testid="menuItem"][href="/vacancies/"]').first();
  }

  get blogTab(): Locator {
    return this.page.locator('a[data-testid="menuItem"][href="/blog/"]').first();
  }

  get internshipsTab(): Locator {
    return this.page.locator('a[data-testid="menuItem"][href="/internship/"]').first();
  }

  get careerTab(): Locator {
    return this.page.locator('a[data-testid="menuItem"][href="/career/"]').first();
  }

  get aboutMenuButton(): Locator {
    return this.page.locator('button:has-text("О нас")').first();
  }

  get socialLinks(): Locator {
    return this.footer.locator('._networksWrapper_8h9kr_34 a');
  }

  get telegramLink(): Locator {
    return this.footer.locator('a[href*="t.me/ozon_tech"]').first();
  }

  get vkLink(): Locator {
    return this.footer.locator('a[href*="vk.com"]').first();
  }

  get youtubeLink(): Locator {
    return this.footer.locator('a[href*="youtube.com"]').first();
  }

  get githubLink(): Locator {
    return this.footer.locator('a[href*="github.com"]').first();
  }

  get habrLink(): Locator {
    return this.footer.locator('a[href*="habr.com"]').first();
  }

  async openAboutMenu() {
    await this.aboutMenuButton.click();
    await this.page.waitForSelector('button:has-text("Ozon ERP")', { timeout: 5000 });
  }

  async waitForSocialLinks() {
    await this.footer.locator('._networksWrapper_8h9kr_34 a').first().waitFor({ timeout: 10000 });
  }

  async goToEvents() {
    await this.eventsTab.click();
    await this.waitForNavigation();
  }

  async goToVacancies() {
    await this.vacanciesTab.click();
    await this.waitForNavigation();
  }

  async goToBlog() {
    await this.blogTab.click();
    await this.waitForNavigation();
  }

  async goToInternships() {
    await this.internshipsTab.click();
    await this.waitForNavigation();
  }

  async goToCareer() {
    await this.careerTab.click();
    await this.waitForNavigation();
  }

  async clickWatchVideo() {
    await this.watchVideoButton.click();
    await this.page.waitForTimeout(1000);
  }

  async getSocialLinksCount() {
    return this.socialLinks.count();
  }
}
