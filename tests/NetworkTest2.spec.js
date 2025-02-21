
const { test, expect } = require('@playwright/test');


test('Security Test Request Intercept', async ({ page }) => {

    const email = "gshveta7@gmail.com";
    const productName = 'ADIDAS ORIGINAL';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Parnika@0520");
    await page.locator("[name='login']").click();
    console.log(await page.title());
    await page.waitForLoadState('networkidle');

    await page.locator("button[routerlink*='myorders']").click();



    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=66de565dae2afd4c0b6d0a6e'
        })
    )
    // await page.pause();
    await page.locator("button:has-text('View')").first().click();

    const errMsg = await page.locator(".blink_me").textContent()
    console.log(errMsg);
    // expect(errMsg,'You are not authorize to view this order');

    expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");



});