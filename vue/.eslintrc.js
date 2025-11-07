/* eslint-env node */
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2022,
    sourceType: 'module',
    requireConfigFile: false
  },
  globals: {
    Vue: 'readonly',
    process: 'readonly'
  },
  extends: ['plugin:vue/essential', 'eslint:recommended']
}