import { BasePage } from './base.page';
import { User } from '../models/userInterface';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByLabel('Username');
  private readonly passwordInput = this.page.getByLabel('Password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Log In' });
  private readonly centralLogin = this.page.locator('[class*="CentralAutoLogin"]'); // this motification message might be in any language depends on previous runs

  async navigateTo() {
    await this.page.goto('https://auth.wikimedia.org/enwiki/wiki/Special:UserLogin'); // go here directly to speed up tests and avoid redirection from main page
    await this.page.waitForURL('**/Special:UserLogin**');
  }

  async login(user: User) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
    await this.centralLogin.waitFor();
    await this.page.getByText(user.username).first().waitFor();
  }

}
