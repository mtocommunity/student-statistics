/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-organize-imports",
    "prettier-plugin-astro-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  printWidth: 80,
  tabWidth: 2,
  proseWrap: "always",
  overrides: [
    {
      files: "*.astro",
      options: {
        tabWidth: 2,
        parser: "astro",
      },
    },
  ],
  tailwindFunctions: ["tw", "tv", "cn", "clsx", "twMerge", "cva"],
};
