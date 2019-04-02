require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');
const { expect } = require('chai');
const Home = require('../../po/pages/home');
const urls = require('../data/urls');

let driver;
let home;

setDefaultTimeout(30e3);

BeforeAll(async () => {
    driver = new Builder().forBrowser('chrome').build();
    global.by = By;
    home = new Home(driver);
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

Given('the EPAM career page is opened', async () => {
    await home.loadPage(urls.careerSite);
});

When(/^the (Location|Skills) filter box is clicked$/, (box) => {
    switch (box) {
        case "Location":
            return home.clickLocationFilterBox();
        default:
            return home.clickJobFilterBox();
    }
});

When(/^the (country|city|role) "([^"]*)" is selected$/, async (type, value) => {
    switch (type) {
        case "country":
            const countryLocator = By.xpath('//strong[contains(@class, "results__group")][.="' + value + '"]');
            if (!await driver.isElementVisible(countryLocator)) {
                throw new Error("There is no such country: " + value);
            }
            const $country = driver.findElement(countryLocator);
            const $container = $country.findElement(By.xpath('..'));
            const classes = await $container.getAttribute('class');
            if (!classes.indexOf('dropdown-cities')) {
                await $country.click();
            }
            break;
        case "city":
            const cityLocator = By.xpath('//li[.="' + value + '"]');
            if (!await driver.isElementVisible(cityLocator)) {
                throw new Error("There is no such city: " + value);
            }
            return driver.findElement(cityLocator).click();
        case "role":
            const roleLocator = By.xpath('//label[./input[@data-value="' + value + '"]]');
            if (!await driver.isElementVisible(roleLocator)) {
                throw new Error("There is no such role/skills: " + value);
            }
            return driver.findElement(roleLocator).click();
    }
});

When('the Find button is clicked', async () => {
    await driver.findElement(By.css('.recruiting-search__submit')).click();
    await driver.wait(until.elementLocated(By.css('.search-result__heading')));
});

Then('the position {string} should be visible', async (position) => {
    const $position = driver.findElement(By.xpath('//article[./header/h5/a[normalize-space(.)="' + position + '"]]'));
    expect(await $position.isDisplayed()).to.be.true;
});

Then(/^the priority of "([^"]*)" position should be (high|normal)$/, async (position, priority) => {
    const $priority = By.xpath('//article[./header/h5/a[normalize-space(.)="' + position + '"]]//li[contains(@class, "search-result__item-type--hot")]');
    expect(await driver.isElementVisible($priority), "The position is not " + priority).to.equal(priority === "high");
});

Then('the location of {string} position should be {string}', async (position, location) => {
    const $location = driver.findElement(By.xpath('//article[./header/h5/a[normalize-space(.)="' + position + '"]]//strong[@class="search-result__location"]'));
    expect(`[${await $location.getText()}]`).to.equal(`[${location.toUpperCase()}]`);
});

Then('the Apply button for {string} position should be visible', async (position) => {
    const $apply = By.xpath('//article[./header/h5/a[normalize-space(.)="' + position + '"]]//a[@class="search-result__item-apply"]');
    expect(await driver.isElementVisible($apply)).to.be.true;
});

When('the Apply button for {string} position is clicked', async (position) => {
    await driver.findElement(By.xpath('//article[./header/h5/a[normalize-space(.)="' + position + '"]]//a[@class="search-result__item-apply"]')).click();;
    await driver.wait(until.elementLocated(By.css('header.recruiting-page__header > h1')));
});

Then('the job description should contain the following text:', async (text) => {
    expect(await driver.findElement(By.css('.recruiting-page__top-description')).getText()).to.contain(text);
});