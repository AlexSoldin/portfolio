import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  server: {
    port: 3000,
  },
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
        // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
        ...(process.env.NODE_ENV === "production" && {
          "react-dom/server": "react-dom/server.edge",
        }),
      },
    },
    css: {
      postcss: "./postcss.config.mjs",
    },
  },
});
