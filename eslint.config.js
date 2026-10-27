// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat.js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default defineConfig([
  expoConfig,
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      prettier: eslintPluginPrettier,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]);
