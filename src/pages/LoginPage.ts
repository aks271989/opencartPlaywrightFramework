import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly Loginbtn: Locator;
  private readonly frdtpasswdlink: Locator;
  private readonly Logo: Locator;

  constructor(page: Page) {

    super(page);
    this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.Loginbtn = page.getByRole('button', { name: 'Login' });
    this.frdtpasswdlink = page.getByRole('link', { name: 'Forgotten Password' }).first();
    this.Logo = page.getByAltText('naveenopencart');


  }

  async goToLoginPage(): Promise<void> {
    await this.page.goto("opencart/index.php?route=account/login");

  }

  async getLoginPageTitle(): Promise<string> {
    return await this.page.title();

  }

  async forgorPaswdLink(): Promise<boolean> {
    return await this.frdtpasswdlink.isVisible();

  }

  async doLogin(username: string, password: string): Promise<void> {
    console.log(`Logging in with username: ${username}`);
    await this.emailId.fill(username);
    await this.password.fill(password);
    await this.Loginbtn.click();
  }



}
