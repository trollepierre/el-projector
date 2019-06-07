module.exports = {
  root: true,
  env: {
    'jest/globals': true,
  },
  extends: [
    '../.eslintrc.js',
  ],
  plugins: [
    'jest',
  ],
  rules: {
    /* YPAM custom rules */
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'indent': ['error', 2],
  },
}