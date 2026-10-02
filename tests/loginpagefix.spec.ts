import { test, expect } from '../src/fixtures/pagefixtures';
import { Jsonhelper } from '../src/utils/Jsonhelper';
//import { Jsonhelper } from '../src/utils/jsonhelper';
//import { Page } from '@playwright/test';

test.beforeEach(async ({ loginpage }) => {

    await loginpage.goToLoginPage();


});


test('login page title test', async ({ loginpage }) => {
    const pagetitle = await loginpage.getLoginPageTitle();
    console.log('login page title', pagetitle);
    expect(pagetitle).toBe("Account Login");
});


test('forgot password link test exist', async ({ loginpage }) => {
    await loginpage.goToLoginPage();
    expect(await loginpage.forgorPaswdLink()).toBeTruthy();
});


test('User is able to login apptest', async ({ loginpage, homepage }) => {

    await loginpage.doLogin(process.env.QA_USERNAME!, process.env.PASSWORD!);
    expect(await homepage.Logoutlinkisvailable()).toBeTruthy();

});

let loginJSONdata = Jsonhelper.readJson("src/data/logindata.json");
for (let row of loginJSONdata) {
    test.only(`invalid login test with json data-${row.username}`, async ({ loginpage }) => {

        await loginpage.doLogin(row.username, row.password);
        //expect(await homepage.Logoutlinkisvailable()).toBeTruthy();

    });
}