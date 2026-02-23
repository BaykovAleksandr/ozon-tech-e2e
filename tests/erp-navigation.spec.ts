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
    test.info().annotations.push({ type: 'epic', description: 'ERP' });
    test.info().annotations.push({ type: 'feature', description: 'Навигация по сайту' });
    test.info().annotations.push({
      type: 'story',
      description: 'Переход на страницу вакансий ERP через подменю "О нас"',
    });
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    test.info().annotations.push({ type: 'tag', description: 'smoke' });

    await test.step('Открыть подменю "О нас"', async () => {
      await homePage.openAboutMenu();
    });

    await test.step('Кликнуть по пункту "Ozon ERP"', async () => {
      const erpMenuItem = page.locator('button:has-text("Ozon ERP")').first();
      await expect(erpMenuItem).toBeVisible({ timeout: 5000 });
      await erpMenuItem.click();
    });

    await test.step('Проверить загрузку страницы ERP', async () => {
      await page.waitForURL(/.*erp.*/);
      await expect(page.locator('h1:has-text("ERP")')).toBeVisible();
    });

    await test.step('Кликнуть по кнопке "Вакансии" и перехватить новую вкладку', async () => {
      const vacanciesButton = page
        .locator('a[href*="/vacancies/?teams=ERP+и+учётные+системы"]')
        .first();

      const [newPage] = await Promise.all([context.waitForEvent('page'), vacanciesButton.click()]);

      await newPage.waitForLoadState();
      expect(newPage.url()).toContain('/vacancies/?teams=ERP');
      await expect(newPage).toHaveTitle(/Вакансии/);

      await test.step('Закрыть новую вкладку', async () => {
        await newPage.close();
      });
    });

    await test.step('Проверить, что исходная вкладка осталась на странице ERP', async () => {
      await expect(page).toHaveURL(/.*erp.*/);
    });
  });
});
