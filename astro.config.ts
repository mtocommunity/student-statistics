import node from "@astrojs/node";
import preact from "@astrojs/preact";
import svgr from "@svgr/rollup";
import tailwindcss from "@tailwindcss/vite";
import pwa from "@vite-pwa/astro";
import compress from "astro-compress";
import { defineConfig, fontProviders } from "astro/config";
import { isDev, site } from "./src/config";

export default defineConfig({
  site,

  integrations: [
    preact(),
    pwa({
      mode: isDev ? "development" : "production",
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
                /\.(?:png|jpg|jpeg|svg|webp|avif|gif|ico|js|css|woff2?|ttf|otf)$/;
              return (
                extensionPattern.test(url.pathname) &&
                !url.pathname.startsWith("/src/") &&
                !url.pathname.startsWith("/node_modules/")
              );
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
  ],

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        subsets: ["latin"],
        weights: ["100 900"],
        styles: ["normal"],
        fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    ],
  },

  devToolbar: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss(), svgr()],
  },

  adapter: node({
    mode: "standalone",
  }),
});
