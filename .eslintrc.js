module.exports = {
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  parser: 'babel-eslint',
  rules: {
    "prettier/prettier": ["error"]
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
      globalReturn: false,
    },
    allowImportExportEverywhere: false,
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    "quotes": ["error", "single"],
    "import/prefer-default-export": "off",
  }
};
