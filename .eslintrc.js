module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    quotes: ['error', 'single'],
    indent: [2, 2, {
      SwitchCase: 1
    }],
    'vue/no-required-prop-with-default': ['error', {
      autofix: false
    }]
  }
}
