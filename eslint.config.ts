import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig(js.configs.recommended, ...tseslint.configs.recommended, prettier, {
  files: ['**/*.{ts,tsx,js}'],
  languageOptions: {
    globals: globals.browser,
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // variables
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // estilo
    eqeqeq: ['error', 'always'], //===
    curly: ['error', 'all'], //{}

    // typescript
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',

    // imports
    'no-duplicate-imports': 'error',
  },
})
