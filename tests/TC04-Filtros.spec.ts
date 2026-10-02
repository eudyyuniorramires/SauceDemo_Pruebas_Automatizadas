import { test, expect } from '../fixtures/page';
import { validUser } from '../data/testData';

test.describe('TC04-Filtros', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(validUser.username, validUser.password);
  });

  test('Filtrar productos de Z a A', async ({ inventoryPage }) => {
    const initialNames = await inventoryPage.getProductsNames();
    const sortedNamesZA = [...initialNames].sort().reverse();

    await inventoryPage.filterProductsBy('za');
    const namesAfterFilter = await inventoryPage.getProductsNames();

    expect(namesAfterFilter).toEqual(sortedNamesZA);
  });

  test('Filtrar productos de precio menor a mayor (Low to High)', async ({ inventoryPage }) => {
    const initialPrices = await inventoryPage.getProductsPrices();
    const sortedPricesLowToHigh = [...initialPrices].sort((a, b) => a - b);

    await inventoryPage.filterProductsBy('lohi');
    const pricesAfterFilter = await inventoryPage.getProductsPrices();

    expect(pricesAfterFilter).toEqual(sortedPricesLowToHigh);
  });

  test('Filtrar productos de precio mayor a menor (High to Low)', async ({ inventoryPage }) => {
    const initialPrices = await inventoryPage.getProductsPrices();
    const sortedPricesHighToLow = [...initialPrices].sort((a, b) => b - a);

    await inventoryPage.filterProductsBy('hilo');
    const pricesAfterFilter = await inventoryPage.getProductsPrices();

    expect(pricesAfterFilter).toEqual(sortedPricesHighToLow);
  });

  test('Filtrar productos de A a Z', async ({ inventoryPage }) => {

    await inventoryPage.filterProductsBy('za');

    const initialNames = await inventoryPage.getProductsNames();
    const sortedNamesAZ = [...initialNames].sort();

    await inventoryPage.filterProductsBy('az');
    const namesAfterFilter = await inventoryPage.getProductsNames();

    expect(namesAfterFilter).toEqual(sortedNamesAZ);
  });

});
