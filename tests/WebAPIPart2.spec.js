const {test, expect} = require('@playwright/test');

let webContext;

test.beforeAll(async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const email = "gshveta7@gmail.com";
    console.log (await page.title());
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Parnika@0520");
    await page.locator("[name='login']").click();
    await page.pause();
    console.log (await page.title());
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});  
    webContext = await browser.newContext({storageState:'state.json'});
}
);

test ('Login to Client App', async ()=> 
{
   
    const productName = 'ADIDAS ORIGINAL';
    const email = "gshveta7@gmail.com";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const products = page.locator(".card-body");
    
   
    const allTitles =   await page.locator(".card-body b").allTextContents();
    console.log(allTitles);
    console.log("***************");
    const count = await products.count();
    for (let i=0; i<count ; i++)
    {
        if (await products.nth(i).locator("b").textContent() == productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }


    }
    await page.locator("[routerlink*='cart']").click();
    //await page.pause();
    await page.locator("div li").first().waitFor();
    await page.locator("div li").last().waitFor();

    const res = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(res).toBeTruthy();
    await page.locator("text=checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    let optionsCount = await dropdown.locator("button").count();
    for(let i=0 ; i< optionsCount ; i++)
    {
        let country = await dropdown.locator("button").nth(i).textContent() ;
        if (country.trim() === "India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    
    }

   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

   await page.locator(".action__submit").click();

   await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();

   const rows =  page.locator("tbody tr");

   for (let i=0 ; i< await rows.count() ; i++)
   {
    const rowOrderID= await rows.nth(i).locator("th").textContent();
    if(orderId.includes(rowOrderID))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
   }

   const orderIdDetails = await page.locator(".col-text").textContent();
   await expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
