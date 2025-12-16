const { test, expect } = require('@playwright/test');

test.only('Browser Context - Validating Error Login', async ({ page }) => {
  
  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("#userEmail").fill("shettyshashank089@gmail.com");
  await page.locator("#userPassword").fill("Shetty@8105");
  await page.locator("[value='Login']").click();

  await page.waitForLoadState('networkidle');
  const titles= await page.locator(".card-body b").allTextContents();
  console.log(titles);

});
