import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Extend test by providing an instatiated "loginPage" fixture.
export const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await use(loginPage);
    },
});