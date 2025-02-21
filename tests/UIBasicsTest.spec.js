const {test, expect} = require('@playwright/test');



test.only('Browser Context Playwright Test', async ({browser})=> 
{
    
    const context = await browser.newContext();
   const page = await context.newPage();

   //page.route('**/*.css',route=>route.abort());
   //page.route('**/*.{jpg,png,jpeg}',route=>route.abort());

   page.on('request', request => console.log (request.url()));
   page.on('response', response =>console.log ( response.url(),response.status()))
   console.log("******************************************");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log("****************************************** after launching browser");

   const userName = page.locator('#username');
    const password = page.locator("[name='password']");
    const signinBtn = page.locator("#signInBtn");
    const cardTitle=  page.locator(".card-body a")


   console.log (await page.title());
   //css 
   await userName.fill("rahulshetty");
   await password.fill("learning");
   await signinBtn.click();
   console.log("****************************************** after sign in");
   console.log ( await page.locator("[style*='block']").textContent() );
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await password.fill("");
   await password.fill("learning");
   await signinBtn.click();
   console.log("****************************************** after sign in");
   console.log(await cardTitle.first().textContent());
   console.log(await cardTitle.nth(1).textContent());
   console.log(await cardTitle.nth(2).textContent());
   console.log(await cardTitle.last().textContent());

   const allTitles = await cardTitle.allTextContents();
   console.log(allTitles);



});

test('UI Controls', async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log (await page.title());

    const userName = page.locator('#username');
    const password = page.locator("[name='password']");
    const dropdown = page.locator("select.form-control");
    const signinBtn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("learning");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect( page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await dropdown.selectOption("consult");
   // await page.pause();
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    //await signinBtn.click();


});


test('Child window handling', async ({browser})=> 
    {

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log (await page.title());
        const userName = page.locator('#username');
         
        const documentLink = page.locator("[href*='documents-request']");

        const [newPage] = await Promise.all(
            [
                context.waitForEvent('page'),
                await documentLink.click(),
            ]
        )
       
        let text = await newPage.locator(".red").textContent();
        console.log(text);
       let arrayText= text.split("@");
        let arrayText1 = arrayText[1].split(" ");
        let domain = arrayText1[0];
        console.log(domain);
        await page.locator("#username").fill("");
        await page.locator("#username").fill(domain);
        console.log("*************");
       // await  page.pause();
        console.log(await page.locator("#username").textContent());
        console.log("*************");
        
    });
