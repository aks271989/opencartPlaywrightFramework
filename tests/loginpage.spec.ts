import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

let loginPage: LoginPage;
let homepage: HomePage;   //after clicking on login button we are checking page redirect to home page or not

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homepage = new HomePage(page);

});


test('login page title test', async ({ }) => {
    const pagetitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pagetitle);
    expect(pagetitle).toBe("Account Login");
});


test('forgot password link test exist', async ({ }) => {
    await loginPage.goToLoginPage();
    expect(await loginPage.forgorPaswdLink()).toBeTruthy();
});


test('User is able to lOgin apptest', async ({ }) => {

    await loginPage.doLogin('akshay27@gmail.com', 'akshay27');
    expect(await homepage.Logoutlinkisvailable()).toBeTruthy();

});
