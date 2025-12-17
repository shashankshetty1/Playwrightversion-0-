import { test, expect  } from '@playwright/test';
import { only } from 'node:test';


test('Rahul Shetty Academy Login Test', async ({ page }) => {

  // open URL
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  // creating for reusing 

  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signInBtn = page.locator("#signInBtn"); 
  const cardTitles = page.locator(".card-body a");

  //////////

  await page.locator("#username").fill("rahulshetty");
  await page.locator("#password").fill("learning");
  await page.locator("#signInBtn").click(); 

  console.log(await page.locator ("[style*='block']").textContent())   // to extract the text content
  await expect (page.locator ("[style*='block']")).toContainText( 'Incorrect');
  await page.waitForTimeout(2000);
  await page.screenshot( { path: 'screenshot.png' } , { fullPage: true } );

  //////////

  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await signInBtn.click();  

  console.log(await page.locator(".card-body a").nth(0).textContent());
  console.log(await page.locator(".card-body a").nth(1).textContent());
  console.log(await page.locator(".card-body a").nth(2).textContent());

  const cardtitles = await cardTitles.allTextContents()

  console.log(cardtitles);



});

test('UI Controls', async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName = page. locator('#username' ) ;
const signIn = page. locator ("#signInBtn") ;
const DocumentLink = page.locator("[href*='documents-request']");



const dropdown = await page.locator("select.form-control")
await dropdown.selectOption("consult") ;
await page.locator("span.checkmark").last().click();
await page.locator("#okayBtn").click();

console.log(await page.locator(".customradio").last().isChecked())
await expect (page.locator (".customradio").last()).toBeChecked();   //assertion
console.log(await page.locator(".customradio").first().isChecked())

await page.locator("#terms").click();
console.log( await page.locator("#terms").isChecked());

await expect(DocumentLink).toHaveAttribute("class","blinkingText");

await page.waitForTimeout(3000);
});

///  Child Window Handling

test ('Child Window Handling', async ({browser})=>
{
  const context = await browser.newContext();
  const page = await context.newPage(); 

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
  const DocumentLink = page.locator("[href*='documents-request']");

 
const [childpage] = await Promise.all([
  context.waitForEvent('page'),           // Waits for the new tab to open
  DocumentLink.click(),              // Opens a new tab
]);

await childpage.waitForLoadState();

const text = await childpage.locator(".red").textContent();
const arrayText = text.split("@");
const email = arrayText[1].split(" ")[0];
console.log(email)
 

await page.locator("#username").fill(email);



}); 

// generate using code gen

test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).click();
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).fill('car');
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).press('Enter');
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).click();
  await page.getByRole('button', { name: 'Search for Products, Brands' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'SurajAgencies Toooys N.A' }).first().click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Search for products, brands' }).click();
  await page1.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await page1.getByText('₹200').click();
  await page1.getByText('₹200').click();
  await page1.getByText('₹200').click();
  await page1.getByRole('button', { name: 'Place Order' }).click();
  await page1.getByRole('textbox').click();
  await page1.getByRole('textbox').click();
  await page1.getByRole('textbox').fill('123456789');
  await page1.getByRole('button', { name: 'CONTINUE' }).click();
});


