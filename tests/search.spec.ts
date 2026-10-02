import { test, expect } from '../src/fixtures/pagefixtures';
import { Jsonhelper } from '../src/utils/Jsonhelper';

test.beforeEach(async ({ loginpage }) => {
    await loginpage.goToLoginPage();
    await loginpage.doLogin(process.env.QA_USERNAME!, process.env.PASSWORD!);

});

let Searchresultspage = Jsonhelper.readJson("src/data/product.json")
for (let row of Searchresultspage) {
    test(`verify search result count-${row.searchkey}-${row.productname}`, async ({ homepage, Searchresultspage }) => {
        await homepage.dosearch(row.searchkey);
        expect(await Searchresultspage.getProductSearchResultcount()).toBe(Number(row.resultcount));

    })
}
for (let row of Searchresultspage) {
    test.only(`verify user is able to land on the product page-${row.searchkey}-${row.productname}`, async ({ homepage, Searchresultspage, page }) => {
        await homepage.dosearch(row.searchkey);
        await Searchresultspage.selectproduct(row.productname);
        expect(await page.title()).toBe(row.productname);

    })
}