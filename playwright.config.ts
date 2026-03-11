import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const authPath = (name: string) => path.join(__dirname, 'auth', `user-${name}.json`);

export default defineConfig({
  testDir: './',
  testMatch: /.*(spec|setup)\.ts/,
  timeout: 60000,
  workers: 1,  //because lang setup race condition, can be added several users to run in parallel in future
  use: {
    baseURL: 'https://en.wikipedia.org',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
  },
  globalTeardown: require.resolve('./playwright.teardown'),
  projects: [
    // --- SETUPS ---
    {
      name: 'setup-chromium',
      testMatch: 'auth/login.setup.ts',
      use: { 
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'setup-firefox',
      testMatch: 'auth/login.setup.ts',
      use: { 
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'setup-webkit',
      testMatch: 'auth/login.setup.ts',
      use: { 
        ...devices['Desktop Safari'],
      },
    },

    // --- MAIN PROJECTS ---
    {
      name: 'chromium',
      testMatch: 'tests/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: authPath('chromium'),
      },
      dependencies: ['setup-chromium'],
    },
    {
      name: 'firefox',
      testMatch: 'tests/**/*.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        storageState: authPath('firefox'),
      },
      dependencies: ['setup-firefox'],
    },
    {
      name: 'webkit',
      testMatch: 'tests/**/*.spec.ts',
      use: {
        ...devices['Desktop Safari'],
        storageState: authPath('webkit'),
      },
      dependencies: ['setup-webkit'],
    },
  ],
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
