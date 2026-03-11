import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules', 'test-results', 'playwright-report'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      playwright,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...playwright.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'playwright/no-wait-for-timeout': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
);