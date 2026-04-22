import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Astro config
  ...eslintPluginAstro.configs.recommended,

  // Prettier must be last to override conflicting rules
  prettier,

  // Global ignores
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      ".pnpm-store/**",
      ".wrangler/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },

  // Node scripts (CLI utilities, build scripts)
  {
    files: ["scripts/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Custom rules for TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
