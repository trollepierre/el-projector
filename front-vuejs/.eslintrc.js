module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  globals: {
    'createLocalVue': false,
    'shallowMount': false,
    'mount': false,
    'RouterLinkStub': false,
  },
  extends: [
    '../.eslintrc.js',
    'plugin:vue/recommended',
  ],
  plugins: [
    'vue',
    'jest',
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js'],
    }],

    /* VueX rules */
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
        'acc',
        'e',
      ],
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    /* YPAM custom rules */
    'object-shorthand': 'error',
    'padded-blocks': 'error',

    // PERSO
    'arrow-parens': ['error', 'as-needed'],
    'generator-star-spacing': 'off',
  },
}
