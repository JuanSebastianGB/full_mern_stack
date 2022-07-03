module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ['standard', 'eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
