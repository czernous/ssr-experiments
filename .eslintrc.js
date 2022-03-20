// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['inferno', 'prettier', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:inferno/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    rules: {
        // enable additional rules
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'always'],
        'prettier/prettier': 'error',
        // override configuration set by extending "eslint:recommended"
        'no-empty': 'warn',
        'no-cond-assign': ['error', 'always'],

        // disable rules from base configurations
        'for-direction': 'off',
        'inferno/jsx-uses-inferno': 'error',
        'inferno/jsx-uses-vars': 'error',
    },
};
