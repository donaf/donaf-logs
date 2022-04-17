/*
 * @Author: qf
 * @Date: 2022-04-16 21:37:33
 * @LastEditTime: 2022-04-13 10:05:12
 * @LastEditors: qf
 * @Description:
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        'src/views/**/*.vue'
      ],
      env: {
        jest: true
      }
    }
  ]
}
