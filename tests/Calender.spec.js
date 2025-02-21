const {test, expect} = require('@playwright/test');


test.only('Calendar validations', async ({page})=> 
{
const month="6";
const date= "15";
const year= "2027";
const expectedList=[month,date,year];


await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers") ;
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label__labelText").click();
await page.locator(".react-calendar__navigation__label__labelText").click();
await page.getByText(year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
await page.locator("//abbr[text()='"+date+"']").click();

const input = page.locator(".react-date-picker__inputGroup");

for (let i=0; i< input.count;  i++)
{
    const value = input(i).getAttribute("value");
    await expect(value).toEqual(expectedList[i]);

}

});