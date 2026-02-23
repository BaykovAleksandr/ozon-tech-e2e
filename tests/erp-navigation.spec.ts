import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Навигация по ERP разделу', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto('/');
    await homePage.closeCookiePopup();
  });

  test('Переход через "О нас" -> ERP -> Вакансии в новой вкладке', async ({ page, context }) => {
    // Открыть подменю "О нас"
    await homePage.openAboutMenu();

    // Кликнуть по пункту "Ozon ERP"
    const erpMenuItem = page.locator('button:has-text("Ozon ERP")').first();
    await expect(erpMenuItem).toBeVisible({ timeout: 5000 });
    await erpMenuItem.click();

    // Проверить, что мы на странице ERP
    await page.waitForURL(/.*erp.*/);
    await expect(page.locator('h1:has-text("ERP")')).toBeVisible();

    // Найти кнопку "Вакансии" на странице ERP
    const vacanciesButton = page
      .locator('a[href*="/vacancies/?teams=ERP+и+учётные+системы"]')
      .first();

    // Кликаем и ожидаем новую вкладку
    const [newPage] = await Promise.all([context.waitForEvent('page'), vacanciesButton.click()]);

    // Ждём загрузки новой вкладки
    await newPage.waitForLoadState();

    // Проверяем, что URL новой вкладки содержит параметры фильтра ERP
    expect(newPage.url()).toContain('/vacancies/?teams=ERP');

    // Дополнительно можно проверить заголовок страницы вакансий
    await expect(newPage).toHaveTitle(/Вакансии/);

    // Закрываем новую вкладку (опционально)
    await newPage.close();

    // Убедимся, что исходная вкладка осталась на странице ERP
    await expect(page).toHaveURL(/.*erp.*/);
  });
});
