const { Before, Given, When, Then } = require("cucumber");
const Site = require('../page_objects/career_site');
const { getDriver } = require("../support/driver");

let site;
let driver;

Before(() => {
    driver = getDriver();
    site = new Site();
});

const WAIT_TIMEOUT = 10e3;
