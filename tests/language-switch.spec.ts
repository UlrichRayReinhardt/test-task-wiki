import { test, expect } from '../fixtures/test.fixture';

const languages = [
  { name: 'Українська', label: 'uk - українська', expectedTitle: 'Налаштування — Wikipedia' },
  { name: 'Deutsch', label: 'de - Deutsch', expectedTitle: 'Einstellungen – Wikipedia' },
  { name: 'English', label: 'en - English', expectedTitle: 'Preferences - Wikipedia'}
];

test.describe('Profile setup: change interface language', () => {
  for (const { label, expectedTitle } of languages) {
    test(`Should set language to '${label}'`, async ({ preferencesPage }) => {
      await preferencesPage.navigateTo();
-     await preferencesPage.changeLanguageTo(label);
      await preferencesPage.saveChanges();
      await preferencesPage.reload();
      const title = await preferencesPage.getPageTitle();
      expect(title).toBe(expectedTitle);

    });
    //here would be better to reset language to en via API in afterAll, but since we don't have it, use as is to be sure that each test is independent and can be run separately if needed.
  }
});

//other tests are using direct links for navigation, 
//but this test was added as demo purpose to navigate with clicks
test.describe('Profile setup: navigate to preferences', () => {
  test(`Should navigate manually to preferences page`, async ({ mainPage, preferencesPage }) => {
      await mainPage.navigateTo();
      await mainPage.navigateToPreferences();
      const title = await preferencesPage.getPageTitle();
      await expect(title).toBe('Preferences - Wikipedia');
    });


});