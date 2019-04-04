const {
    By
} = require('selenium-webdriver')
const elements = require('../selectors/master');

class Master {
    constructor(driver) {
        this.driver = driver;
    }

    get cookieButton() {
        return this.driver.findElement(By.css(elements.cookieButton));
    }

    get sliderSlide() {
        return this.driver.findElement(By.css(elements.sliderSlide))
    }

    async open(url) {
        return this.driver.get(url);
    }

    async loadPage(url) {
        await this.open(url);
        await this.waitForLoading();
        await this.dismissCookies();
    }

    async waitForLoading() {
        return this.driver.wait(() => this.sliderSlide.isDisplayed());
    }

    async isCookieButtonDisplayed() {
        return this.cookieButton.isDisplayed();
    }

    async clickCookieButton() {
        return this.cookieButton.click();
    }

    async dismissCookies() {
        try {
            const isVisible = await this.isCookieButtonDisplayed()
            if (isVisible) {
                return this.clickCookieButton();
            }
        } catch (e) {}
    }
}

module.exports = Master;