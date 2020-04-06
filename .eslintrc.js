module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/base',
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  rules: {
    "nuxt/no-cjs-in-config": "off",
    'no-console': 'off',
  },
  globals: {
    '$': true,
    '_': true,
    'axios': true,
  }
}
