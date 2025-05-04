import type { Page, Locator } from '@playwright/test';
import { config } from '../playwright.config';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly invalidInputFieldFlashError: (field: 'username' | 'password') => Locator;

  constructor(public readonly page: Page) {
    this.usernameInput = this.page.getByLabel('Username');
    this.passwordInput = this.page.getByLabel('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.invalidInputFieldFlashError = (field: 'username' | 'password') => this.page.getByText(`Your ${field} is invalid!`);
  }

  async goto() {
    await this.page.goto(`${config.theInternetURL}/login`);
  }

  async login(options: { username?: string, password?: string }) {
    if (options.username) await this.usernameInput.fill(options.username);
    if (options.password) await this.passwordInput.fill(options.password);
    await this.loginButton.click();
  }

  // Overkill, not optimal, but demonstrates a dynamic locator
  // Incidentally the fact login error reveals the field which is invalid, e.g. username or password, is surely a security vulnerability
  getInvalidInputFieldFlashError(field: 'username' | 'password') {
    return this.invalidInputFieldFlashError(field);
  }

  getHeading() {
    return this.page.getByRole('heading', { name: 'Login Page' });
  }

}