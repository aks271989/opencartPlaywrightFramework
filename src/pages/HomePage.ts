import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    private readonly search: Locator;
    private readonly searchIcon: Locator;


    constructor(page: Page) {
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
        this.search = page.getByRole('textbox', { name: 'search' });
        this.searchIcon = page.locator('div#search button');

    }

    async getHomePageTitle(): Promise<string> {
        return await this.page.title();

    }
    async Logoutlinkisvailable(): Promise<boolean> {
        return await this.logoutLink.isVisible();

    }


    async getHomePageHeaders(): Promise<string[]> {
        return await this.headers.allInnerTexts();

    }


    async dosearch(searchkey: string): Promise<void> {
        console.log(`search key:${searchkey}`);
        await this.search.fill(searchkey);
        await this.searchIcon.click();

    }

}