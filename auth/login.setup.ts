import { test as setup } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { LoginPage } from '../pages/login.page';
import { ENV } from '../utils/utils';
import path from 'path';


setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();

  await loginPage.login({
    username: ENV.USERNAME,
    password: ENV.PASSWORD,
  });

  const projectName = setup.info().project.name;
  const browserName = projectName.replace('setup-', '');
  const storagePath = path.join(__dirname, 'user-' + browserName + '.json');

  await page.context().storageState({ path: storagePath });
  console.log(`Saved auth state for ${browserName} to ${storagePath}`);
});
