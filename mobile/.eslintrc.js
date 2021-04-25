module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react-hooks/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
        tsconfigRootDir: __dirname,

        project: "./tsconfig.json",
    },
    plugins: ["react", "@typescript-eslint", "react-hooks", "react-native"],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        indent: ["error", 4, { SwitchCase: 1 }],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-raw-text": 0,
        "react-native/no-single-element-style-arrays": 2,
        "react/display-name": "off",
        "react/prop-types": 0,
        "@typescript-eslint/restrict-plus-operands": 0,
    },
};
