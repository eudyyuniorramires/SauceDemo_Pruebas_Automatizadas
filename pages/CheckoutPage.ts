import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputPostalCode: Locator;
  readonly buttonContinue: Locator;
  readonly buttonCancel: Locator;
  readonly buttonFinish: Locator;
  readonly messageCheckoutComplete: Locator;

  constructor(page: Page) {
    super(page);

    this.inputFirstName = page.locator('[data-test="firstName"]');
    this.inputLastName = page.locator('[data-test="lastName"]');
    this.inputPostalCode = page.locator('[data-test="postalCode"]');
    this.buttonContinue = page.locator('[data-test="continue"]');
    this.buttonCancel = page.locator('[data-test="cancel"]');
    this.buttonFinish = page.locator('[data-test="finish"]');
    this.messageCheckoutComplete = page.locator('[data-test="complete-header"]');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.inputFirstName.fill(firstName);
    await this.inputLastName.fill(lastName);
    await this.inputPostalCode.fill(postalCode);
    await this.buttonContinue.click();
  }

  async finishCheckout(): Promise<void> {
    await this.buttonFinish.click();
  }
}
