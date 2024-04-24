const config = {
  extends: ['stylelint-prettier/recommended', 'stylelint-config-standard'],
  plugins: ['stylelint-csstree-validator'],
  rules: {
    'csstree/validator': {
      ignoreAtrules: ['tailwind', 'apply'],
    },
    'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind', 'apply'] }],
  },
  cache: true,
  ignoreFiles: [
    'build/**',
    'dist/**',
    '**/reset*.css',
    '**/bootstrap*.css',
    '.next/',
    'out/**',
  ],
}

export default config
