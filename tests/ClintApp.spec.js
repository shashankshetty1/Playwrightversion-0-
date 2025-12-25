const { test, expect } = require('@playwright/test');

test('Browser Context - Validating Error Login', async ({ page }) => {
  

  const products = page.locator(".card-body");
  const productName = 'ADIDAS ORIGINAL';

  const email = "shettyshashank089@gmail.com";


  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
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
    await page.locator("[routerlink*='cart']").click();

    await page.locator("div li").first().waitFor(); // waiting for the cart page to load

    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible(); // verifying the product is added to cart

    expect(bool).toBeTruthy();   // assertion to verify the product is added to cart

    await page.locator("text=Checkout").click();

    await page.locator("[placeholder='Select Country']").pressSequentially("ind");  // typing 'ind' to filter countries

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const Optionscount =await  dropdown.locator("button").count();

    for(let i=0; i<Optionscount; i++)  // iterating through the filtered options
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text  === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }   
    expect(page.locator(".details__user [type='text']").first()).toHaveText(email);  // assertion to verify the email on checkout page
    await page.locator("text=Place Order").click();
    expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();  // getting the order id

    console.log(orderId);

    await page.locator("button[routerlink='/dashboard/myorders']").click(); // navigating to 'My Orders' page
    await page.locator("tbody").first().waitFor(); // waiting for the orders table to load

    const rows = page.locator("tbody tr"); // locating all rows in the orders table
    const rowCount = await rows.count();

    for(let i=0; i<rowCount; i++) // iterating through each row to find the order
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();  // getting the order id from the current row

        if(orderId.includes(rowOrderId)) // comparing with the order id obtained earlier
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent(); // getting the order id from order details page
    expect(orderId.includes(orderIdDetails)).toBeTruthy();  // assertion to verify the order id matches
    



});
