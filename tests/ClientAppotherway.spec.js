const { test, expect } = require('@playwright/test');    ///using special locators getByRole , getByPlaceholder , getByLabel    

test('@Webst Client App login', async ({ page }) => {

  const email = "shettyshashank089@gmail.com";
  const productName = "ADIDAS ORIGINAL";

  await page.goto("https://rahulshettyacademy.com/client");

  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Shetty@8105");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForLoadState("networkidle");

  await page.locator(".card-body b").first().waitFor();

  // Add product to cart
  await page.locator(".card-body").filter({ hasText: productName }).getByRole("button", { name: "Add To Cart" }).click();

  // Go to cart
  await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

  await page.locator("div li").first().waitFor();

  await expect(page.getByText(productName)).toBeVisible();

  // Checkout
  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button", { name: "India" }).nth(1).click();

  // Verify email
  await expect(page.locator(".details__user [type='text']").first()).toHaveText(email);

  // Place order
  await page.getByText("PLACE ORDER").click();

  await expect(
    page.getByText("Thankyou for the order.")
 ).toBeVisible();

  // Get Order ID
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  // Go to My Orders
  await page.getByRole("button", { name: "ORDERS" }).click();

  await page.locator("tbody").first().waitFor();

  const rows = page.locator("tbody tr");
  const count = await rows.count();

  for (let i = 0; i < count; i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).getByRole("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
