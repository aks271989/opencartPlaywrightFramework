import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginpage }) => {
    await loginpage.goToLoginPage();
    await loginpage.doLogin('akshay27@gmail.com', 'akshay27');

});

test('home page ttitle test', async ({ homepage }) => {
    const pagetitle = await homepage.getHomePageTitle();
    console.log("Home page title", pagetitle);
    expect(pagetitle).toBe('My Account');


})

test('Logout link exist', async ({ homepage }) => {
    expect(await homepage.Logoutlinkisvailable()).toBeTruthy();

})

test('Homepage headers exist', async ({ homepage }) => {
    let allheadres = await homepage.getHomePageHeaders();
    console.log("Home page headers:", allheadres);
    expect.soft(allheadres).toHaveLength(4);
    expect.soft(allheadres).toEqual(['My Account', 'My Orders', 'My Affiliate Account', 'Newsletter'])

})