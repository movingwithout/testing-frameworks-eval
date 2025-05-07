import { expect } from '@playwright/test';
import { test } from '../src/fixtures/test.base';
import { config } from '../playwright.config';

// Publicly available for test site otherwise would be in secrets manager
const USERNAME = 'tomsmith';
const PASSWORD = 'SuperSecretPassword!'; 

test.describe('Login Tests', { tag: ['@login'] }, () => {

  test('Login Success', async ({ loginPage, secureAreaPage }) => {

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
      await expect(loginPage.getHeading()).toBeVisible();
    });

    await test.step('Attempt Login - Valid Credentials', async () => {
      await loginPage.login({ username: USERNAME, password: PASSWORD });
    });

    await test.step('Assert Login Success', async () => {
      await expect.soft(secureAreaPage.getFlashMessage()).toContainText('You logged into a secure area!');
      await expect.soft(secureAreaPage.getHeading()).toBeVisible();
    });

  });

  test('Login Failure - Invalid Username', { tag: ['@negative-test'] }, async ({ loginPage }) => {

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Attempt Login - Invalid Username', async () => {
      await loginPage.login({ username: 'fakeuser', password: PASSWORD });
    });

    await test.step('Assert Invalid Username Error', async () => {
      await expect(loginPage.getInvalidInputFieldFlashError('username')).toBeVisible();
    });

  });

  test('Login Failure - Invalid Password', { tag: ['@negative-test'] }, async ({ loginPage }) => {

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Attempt Login - Invalid Password', async () => {
      await loginPage.login({ username: USERNAME, password: 'FakePassword1!' });
    });

    await test.step('Assert Invalid Password Error', async () => {
      await expect(loginPage.getInvalidInputFieldFlashError('password')).toBeVisible();
    });

  });

  test('Login Failure - Missing Username', { tag: ['@negative-test'] }, async ({ loginPage }) => {

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Attempt Login - Missing Username', async () => {
      await loginPage.login({ password: PASSWORD });
    });

    await test.step('Assert Invalid Username Error', async () => {
      await expect(loginPage.getInvalidInputFieldFlashError('username')).toBeVisible();
    });

  });

  test('Login Failure - Missing Password', { tag: ['@negative-test'] }, async ({ loginPage }) => {

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Attempt Login - Missing Password', async () => {
      await loginPage.login({ username: USERNAME });
    });

    await test.step('Assert Invalid Password Error', async () => {
      await expect(loginPage.getInvalidInputFieldFlashError('password')).toBeVisible();
    });

  });


});

test.describe('Logout Tests', { tag: ['@logout'] }, () => {

  test('Logout Success', async ({ page, loginPage, secureAreaPage, locale }) => {

    await test.step('Login via API', async () => {
  
      /* Re: Accept-Language header usage
       * Interestingly when the server generates the session it uses the Accept-Language header to prevent session hijacking.
       * Digging through https://github.com/saucelabs/the-internet it uses an old version of sinatra and rack-protection:
       * https://github.com/saucelabs/the-internet/blob/master/Gemfile.lock 
       * https://github.com/sinatra/sinatra/blob/v1.4.7/lib/sinatra/base.rb#L1750
       * https://github.com/sinatra/rack-protection/blob/v1.5.3/lib/rack/protection/session_hijacking.rb#L17
       *
       * It seems newer versions remove the Accept-Language header from the session cookie after it was merged upstream 
       * into the sinatra project.
       * https://github.com/sinatra/sinatra/commit/6cf49c885554fa6265f119e6ad5b8d3707c22f64
       *
       * Because subsequent Playwright UI navigation passes the Accept-Language header it must match the header used
       * when generating the authenticated session cookie.
       */
      const response = await page.request.post(`${config.theInternetURL}/authenticate`, {
        form: { username: USERNAME, password: PASSWORD },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept-Language': locale ?? 'en-US', 
        },
        maxRedirects: 0
      });
  
      // Extract the rack.session value from the response headers
      const session = response.headers()['set-cookie'].split(';')[0].split('=')[1];
  
      // Add the session cookie to the context
      await page.context().addCookies([{
        name: 'rack.session',
        value: `${session}`,
        domain: config.theInternetURL, 
        path: '/',
        httpOnly: true,
        secure: true
      }]);
  
    });
  
    await test.step('Navigate to Secure Area', async () => {
      await secureAreaPage.goto();
    });
  
    await test.step('Assert User is in Secure Area', async () => {
      await expect.soft(secureAreaPage.getHeading()).toBeVisible();
    });
  
    await test.step('Logout', async () => {
      await secureAreaPage.logout();
    });
  
    await test.step('Assert User returned to Login Page', async () => {
      await expect(loginPage.getHeading()).toBeVisible();
    });
  
  });

});