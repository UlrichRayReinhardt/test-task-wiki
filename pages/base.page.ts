import { Page } from '@playwright/test'

export abstract class BasePage {

  constructor(protected readonly page: Page) {}


  async getPageTitle() {
    await this.page.waitForLoadState('load');
    return this.page.title();
  }

  async reload() {
    await this.page.reload();
  }
}