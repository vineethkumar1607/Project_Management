import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    rules: {
      //  Relax rules 
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",

      "no-console": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Optional: reduce noise further
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);