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
    await expect(page).toHaveTitle(/Ozon Tech/);
    await expect(homePage.videoSection).toBeVisible();
  });

  test('Клик по "Вакансии" ведет на страницу вакансий', async ({ page }) => {
    await homePage.goToVacancies();
    await expect(page).toHaveURL(/.*vacancies.*/);
  });

  test('Клик по "Блог" ведет на страницу блога', async ({ page }) => {
    await homePage.goToBlog();
    await expect(page).toHaveURL(/.*blog.*/);
  });

  test('Клик по "Стажировки" ведет на страницу стажировок', async ({ page }) => {
    await homePage.goToInternships();
    await expect(page).toHaveURL(/.*internship.*/);
  });

  test('Клик по "Карьера" ведет на страницу карьеры', async ({ page }) => {
    await homePage.goToCareer();
    await expect(page).toHaveURL(/.*career.*/);
  });

  test('Социальные ссылки присутствуют в футере', async () => {
    await homePage.waitForSocialLinks();
    const count = await homePage.getSocialLinksCount();
    expect(count).toBe(5);
  });

  test('Telegram ссылка ведет на правильный канал', async () => {
    await homePage.waitForSocialLinks();
    const telegramHref = await homePage.telegramLink.getAttribute('href');
    expect(telegramHref).toContain('t.me/ozon_tech');
  });
});
