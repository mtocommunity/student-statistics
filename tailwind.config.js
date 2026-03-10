/** @type {import("tailwindcss").Config} */
export default {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: "var(--font-serif)",
              textAlign: "center",
            },
            h2: {
              fontFamily: "var(--font-serif)",
            },
            h3: {
              fontFamily: "var(--font-serif)",
            },
            h4: {
              fontFamily: "var(--font-serif)",
            },
            h5: {
              fontFamily: "var(--font-serif)",
            },
            h6: {
              fontFamily: "var(--font-serif)",
            },
            p: {
              lineHeight: "150%",
            },
          },
        },
      },
    },
  },
}
