module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        "eslint-plugin-no-inline-styles",
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "semi": "off",
        "@typescript-eslint/semi": [
            "error",
            "never"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-inline-styles/no-inline-styles": 2
    }
};