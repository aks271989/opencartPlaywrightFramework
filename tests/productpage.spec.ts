import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginpage }) => {
    await loginpage.goToLoginPage();
    await loginpage.doLogin(process.env.QA_USERNAME!, process.env.PASSWORD!);

});

test('verify images count', async ({ homepage, Searchresultspage, Productinfopage }) => {
    await homepage.dosearch('macbook')
    await Searchresultspage.selectproduct('MacBook Pro');
    const imagecount = await Productinfopage.getProductImageCount();
    console.log("total images:", imagecount);
    expect(imagecount).toBe(4);


})

test.only('verify product data', async ({ homepage, Searchresultspage, Productinfopage }) => {
    await homepage.dosearch('macbook')
    await Searchresultspage.selectproduct('MacBook Pro');
    let productdetailsmap = await Productinfopage.getProductInfo();
    console.log("Paroduct details are:", productdetailsmap);
    expect.soft(productdetailsmap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(productdetailsmap.get('Brand')).toBe('Apple');
    expect.soft(productdetailsmap.get('Reward Points')).toBe('800');
    expect.soft(productdetailsmap.get('ProductPrice')).toBe('$2,000.00');
})