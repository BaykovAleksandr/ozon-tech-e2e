import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class EventsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get calendarInput(): Locator {
    return this.page.locator('input[placeholder*="дд.мм.гггг"]').first();
  }

  get eventCards(): Locator {
    return this.page.locator('[data-testid="eventCard"]');
  }

  async waitForCards(timeout = 10000) {
    await this.page.waitForSelector('[data-testid="eventCard"]', { timeout });
  }

  async getFirstEventInfo() {
    const firstEvent = this.eventCards.first();
    const parentLink = firstEvent.locator('xpath=..');
    return {
      title: await firstEvent.locator('._title_swbm4_55').textContent(),
      date: await firstEvent.locator('._date_swbm4_65').textContent(),
      link: await parentLink.getAttribute('href'),
    };
  }
}
