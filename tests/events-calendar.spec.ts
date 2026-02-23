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
    test.info().annotations.push({ type: 'epic', description: 'Мероприятия' });
    test.info().annotations.push({ type: 'feature', description: 'Загрузка страницы' });
    test.info().annotations.push({ type: 'story', description: 'Проверка заголовка страницы' });

    await test.step('Проверить заголовок страницы', async () => {
      await expect(page).toHaveTitle(/Мероприятия/);
    });
  });

  test('Календарь отображается', async () => {
    test.info().annotations.push({ type: 'epic', description: 'Мероприятия' });
    test.info().annotations.push({ type: 'feature', description: 'Календарь' });
    test
      .info()
      .annotations.push({ type: 'story', description: 'Проверка видимости поля ввода даты' });

    await test.step('Проверить видимость календаря', async () => {
      await expect(eventsPage.calendarInput).toBeVisible();
    });
  });

  test('Список мероприятий не пуст', async () => {
    test.info().annotations.push({ type: 'epic', description: 'Мероприятия' });
    test.info().annotations.push({ type: 'feature', description: 'Список событий' });
    test
      .info()
      .annotations.push({ type: 'story', description: 'Проверка наличия карточек событий' });

    await test.step('Подсчитать количество карточек', async () => {
      const count = await eventsPage.eventCards.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test('Первое событие содержит заголовок и дату', async () => {
    test.info().annotations.push({ type: 'epic', description: 'Мероприятия' });
    test.info().annotations.push({ type: 'feature', description: 'Карточка события' });
    test.info().annotations.push({
      type: 'story',
      description: 'Проверка наличия заголовка и даты у первой карточки',
    });

    await test.step('Убедиться, что карточки есть', async () => {
      const count = await eventsPage.eventCards.count();
      expect(count).toBeGreaterThan(0);
    });
    await test.step('Получить информацию о первом событии', async () => {
      const eventInfo = await eventsPage.getFirstEventInfo();
      expect(eventInfo.title).toBeTruthy();
      expect(eventInfo.date).toBeTruthy();
    });
  });

  test('Клик по первой карточке ведёт на страницу события', async ({ page }) => {
    test.info().annotations.push({ type: 'epic', description: 'Мероприятия' });
    test.info().annotations.push({ type: 'feature', description: 'Навигация' });
    test.info().annotations.push({
      type: 'story',
      description: 'Переход на детальную страницу события по клику на карточку',
    });

    await test.step('Убедиться, что карточки есть', async () => {
      const count = await eventsPage.eventCards.count();
      expect(count).toBeGreaterThan(0);
    });

    await test.step('Получить ссылку из первой карточки', async () => {
      const firstCard = eventsPage.eventCards.first();
      const parentLink = firstCard.locator('xpath=..');
      const href = await parentLink.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toContain('/events/');

      await test.step('Кликнуть по карточке и дождаться перехода', async () => {
        await Promise.all([page.waitForURL(/\/events\/.+/), parentLink.click()]);
      });
    });
  });
});
