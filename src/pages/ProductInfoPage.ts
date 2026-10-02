import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductInfoPage extends BasePage {
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private map: Map<string, string | number>;


    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { name: 'MacBook Pro', level: 1 });
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string>();

    }


    async getProductHeader(): Promise<string> {
       // await this.header.first().waitFor({ state: 'visible' });
        return await this.header.innerText();

    }

    async getProductImageCount(): Promise<number> {
        await this.productImages.first().waitFor({ state: 'visible' });
        return await this.productImages.count();

    }
    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImages', await this.getProductImageCount());
        await this.getProductMetaData();
        await this.getProductPricingData();
        return this.map;
    }




    private async getProductMetaData(): Promise<void> {
        let metadata = await this.productMetaData.allInnerTexts();

        for (let data of metadata) {

            let meta = data.split(':');
            let metakey = meta[0].trim();
            let metavalue = meta[1].trim();
            this.map.set(metakey, metavalue);

        }

    }
    private async getProductPricingData(): Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('ProductPrice', productPrice);
        this.map.set('ProductPrice', exTaxPrice);

    }




}