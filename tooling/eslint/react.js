import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      'react/no-unescaped-entities': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'error',
      'react/prop-types': 'off',
    },
    languageOptions: {
      globals: {
        React: 'writable',
      },
    },
  },
]
