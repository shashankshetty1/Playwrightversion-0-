const { test, expect } = require('@playwright/test');

test('Browser Context - Validating Error Login', async ({ page }) => {
  

  const products = page.locator(".card-body");
  const productName = 'ADIDAS ORIGINAL';

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("shettyshashank089@gmail.com");
  await page.locator("#userPassword").fill("Shetty@8105");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');

  await page.locator(".card-body b").first().waitFor();   // waiting for the products to load

  const titles= await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; i++) 
    { 
        if(await products.nth(i).locator("b").textContent() === productName)
            {
                // adding the product to cart 
                console.log( await products.nth(i).locator("b").textContent());
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
           
    }
    await page.pause();

});
