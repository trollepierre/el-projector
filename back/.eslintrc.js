module.exports = {
  root: true,
  env: {
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    '../.eslintrc.js',
  ],
  plugins: [
    'jest',
  ],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'indent': ['error', 2],
    'max-len': 'off'
  },
}
