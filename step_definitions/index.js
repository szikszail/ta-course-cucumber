require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');

let driver;

setDefaultTimeout(30e3);

BeforeAll(async () => {
    driver = new Builder().forBrowser('chrome').build();
    driver.isElementVisible = async locator => {
        try {
            await driver.findElement(locator);
        } catch (e) {
            return false;
        }
        try {
            return await driver.findElement(locator).isDisplayed();
        } catch (e) {
            return false;
        }
    };
    await driver.manage().window().maximize();
});

AfterAll(() => driver.quit());
