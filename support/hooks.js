require('chromedriver');

const { AfterAll, BeforeAll, setDefaultTimeout } = require("cucumber");
const {startChrome, getDriver} = require("./driver");

setDefaultTimeout(60000);

BeforeAll(async () => {
    const driver = startChrome();
    await driver.manage().window().maximize();
});

AfterAll(() => getDriver().quit());