const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        STEPS: 'readonly',
        QUIZ: 'readonly',
        GLOSSARY: 'readonly',
      },
      ecmaVersion: 12,
      sourceType: 'commonjs',
    },
    plugins: {
      prettier,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
];
