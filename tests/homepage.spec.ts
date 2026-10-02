import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


let loginPage: LoginPage;
let homepage: HomePage;

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('akshay27@gmail.com', 'akshay27');
    homepage = new HomePage(page);

});

test('home page ttitle test', async () => {
    const pagetitle = await homepage.getHomePageTitle();
    console.log("Home page title", pagetitle);
    expect(pagetitle).toBe('My Account');


})

test('Logout link exist', async () => {
    expect(await homepage.Logoutlinkisvailable()).toBeTruthy();

})

test('Homepage headers exist', async () => {
    let allheadres = await homepage.getHomePageHeaders();
    console.log("Home page headers:", allheadres);
    expect.soft(allheadres).toHaveLength(4);
    expect.soft(allheadres).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter'])

})