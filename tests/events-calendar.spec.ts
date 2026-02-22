import { test, expect } from '@playwright/test';
import { EventsPage } from '../src/pages/EventsPage';

test.describe('Страница мероприятий', () => {
  let eventsPage: EventsPage;

  test.beforeEach(async ({ page }) => {
    eventsPage = new EventsPage(page);
    await page.goto('/events');
    await eventsPage.closeCookiePopup();
    await eventsPage.waitForCards();
  });

  test('Страница загружается', async ({ page }) => {
    await expect(page).toHaveTitle(/Мероприятия/);
  });

  test('Календарь отображается', async () => {
    await expect(eventsPage.calendarInput).toBeVisible();
  });

  test('Список мероприятий не пуст', async () => {
    const count = await eventsPage.eventCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Первое событие содержит заголовок и дату', async () => {
    const count = await eventsPage.eventCards.count();
    expect(count).toBeGreaterThan(0);
    const eventInfo = await eventsPage.getFirstEventInfo();
    expect(eventInfo.title).toBeTruthy();
    expect(eventInfo.date).toBeTruthy();
  });

  test('Клик по первой карточке ведёт на страницу события', async ({ page }) => {
    const count = await eventsPage.eventCards.count();
    expect(count).toBeGreaterThan(0);

    const firstCard = eventsPage.eventCards.first();
    const parentLink = firstCard.locator('xpath=..');
    const href = await parentLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('/events/');

    await Promise.all([page.waitForURL(/\/events\/.+/), parentLink.click()]);
  });
});
