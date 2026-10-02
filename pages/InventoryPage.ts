import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly item: Locator;
  readonly itemNames: Locator;
  readonly productPrice: Locator;
  readonly btnAddToCart: Locator;
  readonly btnCart: Locator;
  readonly countCartIcon: Locator;
  readonly btnFilter: Locator;
  readonly btnDropdown: Locator;
  readonly btnLogout: Locator;

  constructor(page: Page) {
    super(page);

    this.title = page.locator('[data-test="title"]');
    this.item = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.btnAddToCart = page.locator('.btn_inventory');
    this.btnCart = page.locator('.shopping_cart_link');
    this.countCartIcon = page.locator('.shopping_cart_badge');
    this.btnFilter = page.locator('[data-test="product-sort-container"]');
    this.btnDropdown = page.getByRole('button', { name: 'Open Menu' });
    this.btnLogout = page.locator('[data-test="logout-sidebar-link"]');
  }

  async filterProductsBy(option: string): Promise<void> {
    await this.btnFilter.selectOption(option);
  }

  async getProductsNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  async getProductsPrices(): Promise<number[]> {
    const pricesText = await this.productPrice.allTextContents();
    return pricesText.map(price => parseFloat(price.replace('$', '')));
  }

  async addProductsToCart(): Promise<string[]> {
    const itemCount = await this.item.count();
    const productsAdded: string[] = [];

    for (let i = 0; i < itemCount; i++) {
      const currentItem = this.item.nth(i);
      const nameItem = currentItem.locator('[data-test="inventory-item-name"]');
      const productName = await nameItem.textContent();

      if (productName) {
        productsAdded.push(productName.trim());
      }

      const addCartButton = currentItem.locator('.btn_inventory');
      await addCartButton.click();
    }

    await this.btnCart.click();
    return productsAdded;
  }

  async goToCart(): Promise<void> {
    await this.btnCart.click();
  }

  async logout(): Promise<void> {
    await this.btnDropdown.click();
    await this.btnLogout.click();
  }
}
