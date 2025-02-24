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

  After(async function () {
    console.log("Scenario tested successfully. I'm in after block");

    // Close browser after scenario execution
    if (this.page) {
      await this.page.close();  // Ensure page is closed
  }

  if (this.context) {
      await this.context.close(); // Close context
  }

  if (this.browser) {
      await this.browser.close(); // Close browser
  }
    // Force exit to prevent workflow from hanging
    process.exit(0);
});