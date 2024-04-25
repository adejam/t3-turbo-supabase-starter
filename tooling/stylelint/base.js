const config = {
  extends: ['stylelint-prettier/recommended', 'stylelint-config-standard'],
  // https://github.com/csstree/stylelint-validator/issues/58
  // the github issue above currently prevents us from being able to use csstree-validators with stylelint
  // once the issue is fixed, we will update the package and uncomment the code below
  // plugins: ['stylelint-csstree-validator'],
  rules: {
    // 'csstree/validator': {
    //   ignoreAtrules: ['tailwind', 'apply'],
    // },
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
