import {test, expect} from '@playwright/test';

test('Calendar date picker test', async ({page})=>{

const monthNumber = "6";   // June
const date = "6";
const year = "2026";
const expectedDate = [monthNumber, date, year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

// Open date picker
await page.locator(".react-date-picker__inputGroup").click();

// Switch to year selection
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();

// Select year
await page.getByText(year).click();

// Select month (0-based index)
await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();

// Select date
await page.locator(`//abbr[text()="${date}"]`).click();

// Verify selected date
const selectedDate = await page.locator(".react-date-picker__inputGroup__input");

for(let i=0; i<expectedDate.length; i++){

    const value = await selectedDate.nth(i).inputValue();
    expect(value).toEqual(expectedDate[i]);

}





});
