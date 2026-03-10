import node from "@astrojs/node"
import react from "@astrojs/react"
import boot from "@astroscope/boot"
import tailwindcss from "@tailwindcss/vite"
import pwa from "@vite-pwa/astro"
import compress from "astro-compress"
import compressor from "astro-compressor"
import { defineConfig, envField, fontProviders } from "astro/config"
import babelPluginReactCompiler from "babel-plugin-react-compiler"
import checker from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"

// Environment
const { DEV: isDev } = import.meta.env

// Context
const site = "https://student-statistics.martindotpy.dev"

export default defineConfig({
  site,

  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  integrations: [
    boot(),
    react({ babel: { plugins: [babelPluginReactCompiler] } }),
    pwa({
      base: "/",
      scope: "/",
      includeAssets: ["favicon.svg"],
      registerType: "autoUpdate",
      pwaAssets: {
        config: true,
      },
      manifest: {
        lang: "es",
        start_url: "/",
        name: "Student Statistics",
        short_name: "Student Statistics",
        theme_color: "#09090b",
        background_color: "#09090b",
        display: "standalone",
      },
      workbox: {
        navigateFallback: null,
        globPatterns: [
          "**/*.{html,png,jpg,jpeg,svg,webp,avif,gif,ico,js,css,woff2,woff,ttf,otf}",
        ],
        globIgnores: [
          "**\\/node_modules\\/**\\/*",
          "\\/src\\/**\\/*",
          "sw.js",
          "workbox-*.js",
        ],
        runtimeCaching: [
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && url.pathname === "/logout",
            handler: "NetworkOnly",
          },
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && [/^\/$/].some((r) => r.test(url.pathname)),
            handler: "NetworkFirst",
            options: {
              cacheName: "offline-private-pages-cache",
              matchOptions: { ignoreVary: true, ignoreSearch: true },
              cacheableResponse: { statuses: [200] },
              expiration: { maxEntries: 50 },
            },
          },
          {
            urlPattern: ({ url }) => {
              const extensionPattern =
                /\.(?:png|jpg|jpeg|svg|webp|avif|gif|ico|js|css|woff2?|ttf|otf)$/
              return (
                extensionPattern.test(url.pathname) &&
                !url.pathname.startsWith("/src/") &&
                !url.pathname.startsWith("/node_modules/")
              )
            },
            handler: "CacheFirst",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [],
        suppressWarnings: !isDev,
      },
    }),
    compress({
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
          ignoreCustomComments: [],
        },
      },
      Exclude: "favicon.svg",
    }),
    compressor({ zstd: false }),
  ],

  env: {
    schema: {
      JWT_SECRET: envField.string({ access: "secret", context: "server" }),
      DATABASE_URL: envField.string({ access: "secret", context: "server" }),
    },
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "JetBrains Mono",
        cssVariable: "--font-jetbrains-mono",
        subsets: ["latin"],
        weights: ["100 800"],
        styles: ["normal"],
        fallbacks: ["monospace"],
      },
    ],
  },

  image: {
    layout: "constrained",
  },

  vite: {
    plugins: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      tailwindcss(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      svgr(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ...(isDev
        ? [
            checker({
              typescript: true,
            }),
          ]
        : []),
    ],
    server: {
      allowedHosts: ["dev.martindotpy.dev"],
    },
  },

  devToolbar: {
    enabled: false,
  },

  output: "server",

  adapter: node({
    mode: "standalone",
  }),
})
