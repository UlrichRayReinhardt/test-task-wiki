import { BasePage } from './base.page';
import { expect } from '@playwright/test';
import { ElementUtils } from '../utils/element.utils';

export class MainPage extends BasePage {
  private readonly loginLink = this.page.getByRole('link', { name: 'Log in' });
  private readonly userProfileLink = this.page.getByTitle(/Your user page/);
  private readonly userMenuDropdown = this.page.getByRole('button', { name: 'Personal tools' });
  private readonly preferencesLink = this.page.getByRole('link', { name: 'Preferences' });

  async navigateTo() {
    await this.page.goto('/wiki/Main_Page');
    await this.page.waitForURL('**/wiki/Main_Page**');
  }

  async navigateToPreferences() {
    await this.userMenuDropdown.click();
    await ElementUtils.waitForExpansion(this.userMenuDropdown, true);
    await this.preferencesLink.waitFor({ state: 'visible' });
    await this.preferencesLink.click();
    await expect(this.page).toHaveURL(/.*Special:Preferences/);
  }

  async openLoginPage() {
    await this.loginLink.click();
  }

  async isUserLoggedIn(name: string): Promise<boolean> {
    return await this.userProfileLink.filter({ hasText: name }).isVisible();
  }

  async goToPreferences() {
    await this.userMenuDropdown.click();
    await ElementUtils.waitForExpansion(this.userMenuDropdown, true);
    await this.preferencesLink.waitFor({ state: 'visible' });
    await this.preferencesLink.click();
    await expect(this.page).toHaveURL(/.*Special:Preferences/);
  }
}
