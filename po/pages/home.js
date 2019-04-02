const elements = require('../selectors/home');

class Home {
    constructor(driver) {
        this.driver = driver;
    }

    get cookieButton() {
        return this.driver.findElement(by.css(elements.cookieButton));
    }

    get sliderSlide() {
        return this.driver.findElement(by.css(elements.sliderSlide))
    }

    get locationFilterBox() {
        return this.driver.findElement(by.css(elements.locationFilterBox))
    }

    get jobFilterBox() {
        return this.driver.findElement(by.css(elements.jobFilterBox))
    }

    async open(url) {
        return this.driver.get(url);
    }

    async loadPage(url){
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

    async clickLocationFilterBox() {
        return this.locationFilterBox.click()
    }

    async clickJobFilterBox() {
        return this.jobFilterBox.click()
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

module.exports = Home;