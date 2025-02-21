const {test, expect} = require('@playwright/test');
const ExcelJs = require('exceljs');


async function writeExcelTest(searchText, replacedText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await  readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.colChange);
    cell.value = replacedText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}


test('Upload download excel validation', async({page})=>
{
    const textSearch= 'Mango';
    const updateValue = '435';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    await page.pause();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name: 'Download'}).click();
    await downloadPromise;
    writeExcelTest(textSearch, updateValue, {rowChange : 0, colChange : 2}, "C:\\Users\\Local User\\Downloads\\download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\Local User\\Downloads\\download.xlsx");

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has : textLocator});

    await expect (desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);


});

