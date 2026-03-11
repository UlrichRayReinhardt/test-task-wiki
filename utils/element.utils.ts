import { Locator, expect } from '@playwright/test';

export class ElementUtils {
  /**
   * @param locator 
   * @param expanded 
   */
  static async waitForExpansion(locator: Locator, expanded: boolean) {
    const state = expanded ? 'true' : 'false';
    await expect(locator).toHaveAttribute('aria-expanded', state, { timeout: 5000 });
  }

  static async clickWhenVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    await locator.click();
}
}