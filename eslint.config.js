import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        myCustomGlobal: 'readonly',
      },
      parser: typescriptParser,
    },
    ignores: ['dist'],
    plugins: { 'react-refresh': reactRefreshPlugin, 'react-hooks': reactHooksPlugin },
    rules: {
      // 'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': 'error',
      eqeqeq: 'error',
      'no-unused-vars': 'error',
    },
  },
];
