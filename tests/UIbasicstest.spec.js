import { test, expect  } from '@playwright/test';


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

test.only('UI Controls', async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName = page. locator('#username' ) ;
const signIn = page. locator ("#signInBtn") ;

const dropdown = await page.locator("select.form-control")
await dropdown.selectOption("consult") ;
await page.locator("span.checkmark").last().click();
await page.locator("#okayBtn").click();

console.log(await page.locator(".customradio").last().isChecked())
await expect (page.locator (".customradio").last()).toBeChecked();   //assertion
console.log(await page.locator(".customradio").first().isChecked())

await page.locator("#terms").click();
console.log( await page.locator("#terms").isChecked());

await page.waitForTimeout(3000);




});
