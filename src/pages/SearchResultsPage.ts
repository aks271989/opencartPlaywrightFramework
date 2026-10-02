import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
    private readonly Searchresults: Locator;



    constructor(page: Page) {
        super(page);
        this.Searchresults = page.locator('div.product-layout');


    }
    async getProductSearchResultcount(): Promise<number> {
        return await this.Searchresults.count();

    }

    async selectproduct(productName:string): Promise<void> {
        await this.page.getByRole('link',{name:productName,exact:true}).first().click();

    }



}