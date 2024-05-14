import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import reactRefresh from 'eslint-plugin-react-refresh';

export default {
  languageOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      myCustomGlobal: 'readonly',
    },
    parser: typescriptParser,
  },
  // extends: [
  //   'eslint:recommended',
  //   'plugin:@typescript-eslint/recommended',
  //   'plugin:react-hooks/recommended',
  // ],
  ignores: ['dist'],
  plugins: { reactRefresh },
  rules: {
    'reactRefresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-console': 'warn',
    eqeqeq: 'error',
    'no-unused-vars': 'error',
  },
};
