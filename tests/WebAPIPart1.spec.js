const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayload = { userEmail: "gshveta7@gmail.com", userPassword: "Parnika@0520" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] };


let response;

test.beforeAll(async () => 
    {
      const apiContext = await request.newContext();   
      const apiUtils = new APIUtils(apiContext, loginPayload);
      response = await apiUtils.createOrder(orderPayload);

});


test('Place the order', async ({ page }) => 
    {
    

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    const email = "gshveta7@gmail.com";
    const productName = 'ADIDAS ORIGINAL';

    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    await page.waitForLoadState('networkidle');



    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    await page.pause();

    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});




