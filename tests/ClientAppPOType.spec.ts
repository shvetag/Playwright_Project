
import{test,expect,Page, Locator} from '@playwright/test';
import { POManager } from '../pageobjects_ts/POManager';


//JSON -> String -> JavaScript object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));


test('Login to Client App', async ({page})=> 
{


    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl();
    await loginPage.validLogin(dataset.username, dataset.password);

   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(dataset.productName);
   await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataset.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId : any= await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});


