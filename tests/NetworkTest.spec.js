const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayload = { userEmail: "gshveta7@gmail.com", userPassword: "Parnika@0520" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});


test('Intercepting Order Response', async ({ page }) => {


    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            let response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response,
                    body
                });
        });


    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    const message = await page.locator(".mt-4").textContent();
    console.log(message);
});




