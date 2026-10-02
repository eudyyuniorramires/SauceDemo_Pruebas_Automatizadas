import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly btnLogin: Locator;
  readonly errorMessage: Locator;

  // Elementos posteriores al login (también disponibles en InventoryPage)
  readonly title: Locator;
  readonly btnDropdown: Locator;
  readonly btnLogout: Locator;

  constructor(page: Page) {
    super(page);

    this.inputUsername = page.locator('[data-test="username"]');
    this.inputPassword = page.locator('[data-test="password"]');
    this.btnLogin = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.title = page.locator('[data-test="title"]');
    this.btnDropdown = page.getByRole('button', { name: 'Open Menu' });
    this.btnLogout = page.locator('[data-test="logout-sidebar-link"]');
  }

  async navigate(): Promise<void> {
    await this.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.btnLogin.click();
  }

  // Alias para mantener compatibilidad
  async Login(username: string, password: string): Promise<void> {
    await this.login(username, password);
  }
}