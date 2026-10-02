import { test, expect } from '../fixtures/page';
import { validUser, checkoutInfo } from '../data/testData';

test.describe('TC03-Checkout', () => {

  test('Flujo completo de compra exitosa', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.navigate();
    await loginPage.login(validUser.username, validUser.password);

    await inventoryPage.addProductsToCart();

    await expect(cartPage.btnRemoveItem).toHaveCount(6);
    await cartPage.proceedToCheckout();

    await checkoutPage.fillInformation(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);
    await checkoutPage.finishCheckout();

    await expect(checkoutPage.messageCheckoutComplete).toBeVisible();
    await expect(checkoutPage.messageCheckoutComplete).toHaveText('Thank you for your order!');
  });

});
