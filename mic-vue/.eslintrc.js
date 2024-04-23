module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-v-for-template-key-on-child': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-async-promise-executor': 'off',
    'promise-executor': 'off',
    'prefer-const': 'off',
    'vue/multi-word-component-names': 'off',
    'eslint-plugin-vue': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/no-setup-props-destructure': 'off',
    'no-empty': 'off'
  }
}
