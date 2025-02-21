const { test, expect } = require('@playwright/test');

test.describe.configure({mode: 'parallel'});

test("Popup validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("http://google.com");
    await page.goBack();
    await page.goForward();
    await page.goBack();
    
    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("input[value='Hide']").click();

    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog',dialog => dialog.accept());
    //await page.pause();
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const framePage =  page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    const textCheck = await framePage.locator(".text h2").textContent();

    console.log (textCheck.split(" ")[1]);
 
});


test("Screenshot and Visual Comparison", async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'});
        await page.locator("input[value='Hide']").click();
        await page.screenshot({path : 'screenshot.png'});
        await expect(page.locator("#displayed-text")).toBeHidden();
     
});

test("visual", async({page})=>
    {
        await page.goto("https://flightware.com/");
        expect (await page.screenshot()).toMatchSnapshot('landingPage.png');

    });