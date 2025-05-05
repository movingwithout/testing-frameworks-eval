# Overview
Repository to experiment with popular testing frameworks against a shared [system under test](https://the-internet.herokuapp.com).

## Project Structure
```md
cypress/                        
playwright/                     
├── fixtures/                   Defines fixtures for use across project
│   └── test.base.ts            Extend functionality of test fixture to instantiate page objects
├── pages/                      Folder containing lower level models abstrating individual pages/components
│   └── LoginPage.ts            Models the Login page
├── tests/                      Folder containing all test specs
│   └── login.spec.ts           Tests for Login Scenarios
└── playwright.config.ts        Global Playwright Test Configuration
selenium/                       
├── java/                       Selenium using Java
└── python/                     Selenium using Python
webdriverio/
README.md
```

## How To Run Tests Locally

1. Copy the repo to your local machine
1. Ensure you have runtime dependancies installed \
   *E.g. Node JS, Java, Maven, Python*
1. Execute commands associated with each test framework as needed

#### Cypress
```
cd .\cypress\
npm install
npx cypress run
```
#### Playwright
```
cd .\playwright\
npm install
npx playwright test
```
#### Selenium - Java
```
cd .\selenium\java\
mvn test
```
#### Selenium - Python
```
cd .\python\
pip install -r requirements.txt
pytest login_test.py
```
#### WebdriverIO
```
cd .\webdriverio\
npm install
npx wdio run ./wdio.conf.js
```