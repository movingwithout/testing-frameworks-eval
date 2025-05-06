import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecureAreaPage } from '../pages/SecureAreaPage';

// Extend test by providing an instatiated "loginPage" fixture.
export const test = base.extend<{ loginPage: LoginPage, secureAreaPage: SecureAreaPage }>({
    loginPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await use(loginPage);
    },
    secureAreaPage: async ({ page }, use) => {
      const secureAreaPage = new SecureAreaPage(page);
      await use(secureAreaPage);
    },
});