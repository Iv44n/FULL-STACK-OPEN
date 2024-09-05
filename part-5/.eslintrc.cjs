module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'eol-last': 'error',
    'comma-dangle': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'no-duplicate-imports': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'object-curly-spacing': ['error', 'always'],
    'camelcase': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    eqeqeq: 'error',
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ]
  }
}
