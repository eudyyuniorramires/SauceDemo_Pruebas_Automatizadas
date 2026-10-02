import { test, expect } from '../fixtures/page';
import { invalidUser, validUser } from '../data/testData';

test.describe('TC02-LoginError', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('Login con usuario bloqueado', async ({ loginPage }) => {
    await loginPage.login(invalidUser.username, invalidUser.password);

    // Validamos que el mensaje de error sea visible y esperado
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Login con campos vacíos', async ({ loginPage }) => {
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

  test('Login con usuario faltante', async ({ loginPage }) => {
    await loginPage.login('', validUser.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

  test('Login con contraseña faltante', async ({ loginPage }) => {
    await loginPage.login(validUser.username, '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
  });

});