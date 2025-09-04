import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
  js.configs.recommended,
  prettierConfig,
  {
    rules: {
      // Add your custom rules here
    },
  },
];
