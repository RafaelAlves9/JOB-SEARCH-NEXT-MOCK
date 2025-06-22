module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "prettier",
      "plugin:cypress/recommended",
   ],
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   parser: "@typescript-eslint/parser",
   plugins: ["@typescript-eslint", "react", "prettier"],
   settings: {
      react: {
         version: "detect",
      },
   },
   rules: {
      "no-unused-vars": [
         "error",
         {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
         },
      ],
      "padding-line-between-statements": [
         "error",
         { blankLine: "always", prev: "*", next: "function" },
         { blankLine: "always", prev: "function", next: "*" },
      ],
      "no-multiple-empty-lines": ["error", { max: 3, maxEOF: 0 }],
   },
};
