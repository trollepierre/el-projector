module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: [
    'jest',
  ],
  rules: {
    /* Jest rules */
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',

    /* YPAM custom rules */
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'eol-last': 'error',
    'import/prefer-default-export': null,
    'key-spacing': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'space-before-function-paren': 'error',

    /* MY OWN custom rules */
    'prefer-const': 'error',
    'no-extra-parens': 'error',
    'prefer-template': 'error',
  },
}
