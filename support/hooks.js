require('chromedriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
global.expect = chai.expect;

const {By, Builder, Capabilities} = require('selenium-webdriver');
global.by = By;

const { AfterAll, BeforeAll, setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60000);

BeforeAll(async () => {
    global.driver = new Builder().withCapabilities(Capabilities.chrome()).build();
    global.driver.isElementVisible = async locator => {
        if (!await driver.isElementPresent(locator)) {
            return false;
        }
        try {
            return await driver.findElement(locator).isDisplayed();
        } catch (e) {
            return false;
        }
    };
    await global.driver.manage().window().maximize();
});

AfterAll(() => global.driver.quit());