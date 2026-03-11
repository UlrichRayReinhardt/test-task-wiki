import { test as base, expect } from '@playwright/test';
import { PreferencesPage } from '../pages/preferences.page';
import { MainPage } from '../pages/main.page';

type Fixtures = {
  mainPage: MainPage;
  preferencesPage: PreferencesPage;
  debugLogger: void;
};

export const test = base.extend<Fixtures>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
    await page.close();
  },

  preferencesPage: async ({ page }, use) => {
    await use(new PreferencesPage(page));
    await page.close();

  },

  debugLogger: [
    async ({ page }, use, testInfo) => {

      // Uncomment this to log browser console messages
      // page.on('console', (msg) => console.log(`BROWSER LOG: ${msg.text()}`));
      // Uncomment this to log all network requests
      //   page.on('request', (request) =>
      //     console.log(`>> REQUEST: ${request.method()} ${request.url()}`),
      //   );     

      console.log(`Starting test: ${testInfo.title}`);
      await use();
      console.log(`Finished test: ${testInfo.title} with status: ${testInfo.status}`);
    },
    { auto: true },
  ],

  
});

export { expect };