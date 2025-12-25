import { test, expect } from '@playwright/test';   // Special locatrs for PLaywright onlyyyyyyyyyyyyy


test("playwright special locator", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/angularpractice/");

//   await page.getByPlaceholder("Name").fill("Hello");
//   await page.getByPlaceholder("Email").fill("Shetty28105@gmail.com");
  await page.getByPlaceholder("Password").fill("Shetty@8105");

  
  await page.getByLabel("Check me out if you Love IceCreams!").check();

  await page.locator("select").selectOption("Female");

  await page.getByLabel("Employed").check();
  await page.getByRole("button", { name: "Submit" }).click();

  const check = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  console.log(check);

  await page.getByRole("link", { name: "Shop" }).click();

  await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button", { name: "Add" }).click();

  await page.waitForTimeout(3000);





});
