import { expect } from '@playwright/test';
import { test } from '../fixtures/test.base';

test.describe('Login Tests', () => {

  test('Login Success', async ({ page, loginPage }) => {

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
      await expect(loginPage.getHeading()).toBeVisible();
    });

    await test.step('Attempt Login - Valid Credentials', async () => {
      await loginPage.login({ username: 'tomsmith', password: 'SuperSecretPassword!' });
    });

    await test.step('Assert Login Success', async () => {
      await expect.soft(page.getByText('You logged into a secure area!')).toBeVisible();
      await expect.soft(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
      await expect.soft(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    });

  });

  test('Login Failure - Invalid Username', async ({ loginPage }) => {

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Attempt Login - Invalid Username', async () => {
      await loginPage.login({ username: 'fakeuser', password: 'SuperSecretPassword!' });
    });

    await test.step('Assert Invalid Username Error', async () => {
      await expect(loginPage.getInvalidInputFieldFlashError('username')).toBeVisible();
    });

  });

  test('Login Failure - Invalid Password', async ({ loginPage }) => {

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Attempt Login - Invalid Password', async () => {
      await loginPage.login({ username: 'tomsmith', password: 'FakePassword1!' });
    });

    await test.step('Assert Invalid Password Error', async () => {
      await expect(loginPage.getInvalidInputFieldFlashError('password')).toBeVisible();
    });

  });

});