const path = require("path");

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [path.join(process.cwd(), "tsconfig.json")],
    tsconfigRootDir: process.cwd(),
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "import",
    "react",
    "react-hooks",
    "jsx-a11y"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      typescript: true
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-misused-promises": ["error", { "checksVoidReturn": { "attributes": false } }],
    "import/order": [
      "warn",
      {
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "newlines-between": "always",
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"]
      }
    ]
  },
  overrides: [
    {
      files: ["**/*.test.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
      env: {
        jest: false,
        node: true
      },
      globals: {
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly"
      }
    }
  ]
};
