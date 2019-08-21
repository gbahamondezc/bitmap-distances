module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['@ridedott/eslint-config'],
  overrides: [
    {
      env: {
        jest: true,
        node: true,
      },
      files: ['src/**/*spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 10,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/promise-function-async': 'off',
    'simple-import-sort/sort': 'off',
    'unicorn/new-for-builtins': 'off',
    'array-func/prefer-array-from': 'off',
    'no-await-in-loop': 'off',
    'sort-keys': 'off',
    'new-cap': 'off',
    '@typescript-eslint/no-type-alias': 'off',
  },
};
