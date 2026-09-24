import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://soldin.co",
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
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Manrope",
      cssVariable: "--font-manrope",
      weights: [300, 400],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument-serif",
      weights: [400],
      styles: ["normal", "italic"],
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: [400, 700],
      fallbacks: ["monospace"],
    },
  ],
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
