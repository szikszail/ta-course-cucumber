const {By} = require('selenium-webdriver')
const elements = require('../selectors/careers');
const Master = require('./master')

class Careers extends Master {
    constructor(driver) {
        super();
        this.driver = driver;
    }   

    get locationFilterBox() {
        return this.driver.findElement(By.css(elements.locationFilterBox))
    }

    get jobFilterBox() {
        return this.driver.findElement(By.css(elements.jobFilterBox))
    }

    country(value){
        return this.driver.findElement(By.xpath(elements.country(value)))
    }

    container(el){
        return el.findElement(By.xpath('..'))
    }

    async getClasses(el){
        return this.container(el).getAttribute('class');
    }

    async clickLocationFilterBox() {
        return this.locationFilterBox.click()
    }

    async clickJobFilterBox() {
        return this.jobFilterBox.click()
    }

    async isCountryVisible(country){
        return this.driver.isElementVisible(this.country(country))
    }

    async clickCountry(country){
        console.log('clickCountry:', country)
        const countryElement = this.country(country)
        const container = this.container(countryElement)
        const classes = await this.getClasses(container)
        if (!classes.indexOf('dropdown-cities')) {
            return countryElement.click();
        }
    }

}

module.exports = Careers;