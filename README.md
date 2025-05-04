# Overview
Repository to experiment with popular testing frameworks against a shared system under test.

## Project Structure
```md
├── cypress/                            [Ref - https://github.com/cypress-io/cypress]
├── playwright/                         [Ref - https://github.com/microsoft/playwright]
│   ├── fixtures/                       Defines fixtures for use across project
│   │   └── test.base.ts                Extend functionality of test fixture to instantiate page objects
│   ├── pages/                          Folder containing lower level models abstrating individual pages/components
│   │   └── LoginPage.ts                Models the Login page
│   ├── tests/                          Folder containing all test specs
│   │   └── login.spec.ts               Tests for Login Scenarios
│   └── playwright.config.ts            Global Playwright Test Configuration
├── selenium/                           [Ref - https://github.com/seleniumhq/selenium]
│   ├── java                            Selenium using Java
│   └── python                          Selenium using Python
├── webdriverio/                        [Ref - https://github.com/webdriverio/webdriverio]
└── README.md
```


