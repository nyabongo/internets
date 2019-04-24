module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    // "plugin:react/recommended",
  ],
  "env": {
    "browser": true,
    "jest": true
  },
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: "module",  // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,  // Allows for the parsing of JSX
    },
  },
  rules:  {
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "@typescript-eslint/explicit-function-return-type":"off",
    "@typescript-eslint/indent": ["error", 2]
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings:  {
    react:  {
      version:  "detect",  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
}