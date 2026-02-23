import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Главная страница и навигация', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto('/');
    await homePage.closeCookiePopup();
    await page.waitForLoadState('networkidle');
  });

  test('Главная страница загружается', async ({ page }) => {
    test.info().annotations.push({ type: 'epic', description: 'Главная страница' });
    test.info().annotations.push({ type: 'feature', description: 'Загрузка страницы' });
    test
      .info()
      .annotations.push({ type: 'story', description: 'Проверка заголовка и видео-секции' });

    await test.step('Проверить заголовок страницы', async () => {
      await expect(page).toHaveTitle(/Ozon Tech/);
    });
    await test.step('Проверить видимость видео-секции', async () => {
      await expect(homePage.videoSection).toBeVisible();
    });
  });

  test('Клик по "Вакансии" ведет на страницу вакансий', async ({ page }) => {
    test.info().annotations.push({ type: 'epic', description: 'Главная страница' });
    test.info().annotations.push({ type: 'feature', description: 'Навигация' });
    test.info().annotations.push({ type: 'story', description: 'Переход на страницу вакансий' });

    await test.step('Кликнуть по вкладке "Вакансии"', async () => {
      await homePage.goToVacancies();
    });
    await test.step('Проверить URL', async () => {
      await expect(page).toHaveURL(/.*vacancies.*/);
    });
  });

  test('Клик по "Блог" ведет на страницу блога', async ({ page }) => {
    test.info().annotations.push({ type: 'epic', description: 'Главная страница' });
    test.info().annotations.push({ type: 'feature', description: 'Навигация' });
    test.info().annotations.push({ type: 'story', description: 'Переход на страницу блога' });

    await test.step('Кликнуть по вкладке "Блог"', async () => {
      await homePage.goToBlog();
    });
    await test.step('Проверить URL', async () => {
      await expect(page).toHaveURL(/.*blog.*/);
    });
  });

  test('Клик по "Стажировки" ведет на страницу стажировок', async ({ page }) => {
    test.info().annotations.push({ type: 'epic', description: 'Главная страница' });
    test.info().annotations.push({ type: 'feature', description: 'Навигация' });
    test.info().annotations.push({ type: 'story', description: 'Переход на страницу стажировок' });

    await test.step('Кликнуть по вкладке "Стажировки"', async () => {
      await homePage.goToInternships();
    });
    await test.step('Проверить URL', async () => {
      await expect(page).toHaveURL(/.*internship.*/);
    });
  });

  test('Клик по "Карьера" ведет на страницу карьеры', async ({ page }) => {
    test.info().annotations.push({ type: 'epic', description: 'Главная страница' });
    test.info().annotations.push({ type: 'feature', description: 'Навигация' });
    test.info().annotations.push({ type: 'story', description: 'Переход на страницу карьеры' });

    await test.step('Кликнуть по вкладке "Карьера"', async () => {
      await homePage.goToCareer();
    });
    await test.step('Проверить URL', async () => {
      await expect(page).toHaveURL(/.*career.*/);
    });
  });

  test('Социальные ссылки присутствуют в футере', async () => {
    test.info().annotations.push({ type: 'epic', description: 'Главная страница' });
    test.info().annotations.push({ type: 'feature', description: 'Футер' });
    test
      .info()
      .annotations.push({ type: 'story', description: 'Проверка наличия 5 социальных ссылок' });

    await test.step('Дождаться загрузки футера', async () => {
      await homePage.waitForFooter();
    });
    await test.step('Подсчитать количество ссылок', async () => {
      const count = await homePage.getSocialLinksCount();
      expect(count).toBe(5);
    });
  });

  test('Telegram ссылка ведет на правильный канал', async () => {
    test.info().annotations.push({ type: 'epic', description: 'Главная страница' });
    test.info().annotations.push({ type: 'feature', description: 'Футер' });
    test.info().annotations.push({ type: 'story', description: 'Проверка ссылки на Telegram' });

    await test.step('Дождаться загрузки футера', async () => {
      await homePage.waitForFooter();
    });
    await test.step('Проверить атрибут href у Telegram ссылки', async () => {
      const telegramHref = await homePage.telegramLink.getAttribute('href');
      expect(telegramHref).toContain('t.me/ozon_tech');
    });
  });

  test('Кнопка "Смотреть видео" работает', async ({ page }) => {
    test.info().annotations.push({ type: 'epic', description: 'Главная страница' });
    test.info().annotations.push({ type: 'feature', description: 'Видео' });
    test
      .info()
      .annotations.push({ type: 'story', description: 'Клик по кнопке и появление видео' });

    await test.step('Кликнуть по кнопке "Смотреть видео"', async () => {
      await homePage.clickWatchVideo();
    });
    await test.step('Проверить видимость элемента video', async () => {
      const videoElement = page.locator('video');
      await expect(videoElement).toBeVisible();
    });
  });
});
