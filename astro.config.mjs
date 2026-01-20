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
      },
    },
    css: {
      postcss: "./postcss.config.mjs",
    },
  },
});
