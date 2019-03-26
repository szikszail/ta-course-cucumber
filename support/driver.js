const {Builder, Capabilities} = require('selenium-webdriver');

let driver = null;

module.exports.startChrome = () => {
    driver = new Builder().withCapabilities(Capabilities.chrome()).build();
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

    return driver;
}

module.exports.getDriver = () => driver;