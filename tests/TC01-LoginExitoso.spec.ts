import { test, expect } from '../fixtures/page';
import { validUser } from '../data/testData';

test.describe('TC01-LoginExitoso', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('Login Exitoso', async ({ loginPage, inventoryPage }) => {
    await expect(loginPage.inputPassword).toBeVisible();
    await loginPage.login(validUser.username, validUser.password);
    await expect(inventoryPage.title).toBeVisible();
  });

  test('Login y cierre de sesion exitoso', async ({ loginPage, inventoryPage }) => {
    await expect(loginPage.inputPassword).toBeVisible();
    await loginPage.login(validUser.username, validUser.password);
    await expect(inventoryPage.title).toBeVisible();
    await inventoryPage.logout();
    await expect(loginPage.inputPassword).toBeVisible();
  });

});