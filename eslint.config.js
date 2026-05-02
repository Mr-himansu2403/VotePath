const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');
const reactPlugin = require('eslint-plugin-react');

module.exports = [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        STEPS: 'readonly',
        QUIZ: 'readonly',
        GLOSSARY: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier,
      react: reactPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
