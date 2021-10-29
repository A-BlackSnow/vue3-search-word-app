module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 'off',
    '@typescript-eslint/indent': [
      'error', 2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': 'first',
        'MemberExpression': 2,
        'FunctionDeclaration': { 'parameters': 'first' },
        'FunctionExpression': { 'parameters': 'first' },
        'CallExpression': { 'arguments': 'first' },
        'ArrayExpression': 'first',
        'ObjectExpression': 'first',
      },
    ],
    "max-len": [ "error", { "code": 120 } ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'guard-for-in': 'off'
  },
};
