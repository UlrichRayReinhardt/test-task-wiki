import { BasePage } from './base.page';
import { ElementUtils } from '../utils/element.utils';

export class PreferencesPage extends BasePage {
  // here I'd rather use page.locator for elements because of dynamic content depending on localization
  private readonly mainHeading = this.page.getByRole('heading', { name: 'Preferences' });
  private readonly saveButton = this.page.getByRole('button', { name: 'Save' });
  private readonly langDropdown = this.page.getByRole('combobox', { name: /^Language/ });
  private readonly langDropdownAria = this.langDropdown.locator('xpath=ancestor-or-self::*[@aria-expanded]');
  
  get languageHeading() {
    return this.mainHeading;
  }

  async navigateTo() {
    await this.page.goto('/wiki/Special:Preferences?uselang=en'); //param uselang to be sure next time en version is opened even if preference was changed
    await this.page.waitForURL('**/Special:Preferences**');
  }


  async changeLanguageTo(language: string) {
    await this.page.waitForLoadState('networkidle');
    await ElementUtils.clickWhenVisible(this.langDropdown);
    await ElementUtils.waitForExpansion(this.langDropdownAria, true);
    const languageOption = this.page.getByRole('option', { name: language });
    await languageOption.hover();
    await languageOption.click();
    await ElementUtils.waitForExpansion(this.langDropdownAria, false);
  }

  async saveChanges() {
    this.page.waitForLoadState('load');
    await Promise.all([
      this.page.waitForLoadState('load'),
      this.saveButton.click()
  ]);
  }
}
