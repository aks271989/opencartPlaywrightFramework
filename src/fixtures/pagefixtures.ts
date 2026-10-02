import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

type pagefixtures =
    {
        loginpage: LoginPage,
        homepage: HomePage;
        Searchresultspage: SearchResultsPage;
        Productinfopage:ProductInfoPage;
    }
export let test = baseTest.extend<pagefixtures>({

    loginpage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);


    },

    homepage: async ({ page }, use) => {
        let homepage = new HomePage(page);
        await use(homepage);


    },
    Searchresultspage: async ({ page }, use) => {
        let Searchresultspage = new SearchResultsPage(page);
        await use(Searchresultspage);


    },
    Productinfopage: async ({ page }, use) => {
        let Productinfopage = new ProductInfoPage(page);
        await use(Productinfopage);
    }

})
export { expect } from '@playwright/test';