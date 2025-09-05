import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const ignores = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/.out/**',
  '**/*.config.js',
  '**/*.config.cjs',
  '**/*.config.mjs',
  '**/*.d.ts',
];

export default [
  {
    ignores,
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Add any custom rules here
    },
  },
];
