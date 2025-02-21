const { Before, After,AfterStep,Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');

Before(async function () {

    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new POManager(this.page);
});

AfterStep( async function ({result}) {
    
    if (result.status === Status.FAILED) {
      await this.page.screenshot({path: 'FailedStepScreenshot.png'});
    }
  });

After(function () {
    console.log("Scenario tested sucessfully. I'm in after block")
  });