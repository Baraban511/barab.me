import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
const website = "https://barab.me";
// https://astro.build/config
export default defineConfig({
  site: website,
  prefetch: true,
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "passthrough",
  }),
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: false,
    },
    define: {
      "import.meta.env.BUILD_DATE": JSON.stringify(
        new Date().toISOString().split("T")[0]
      ),
      "process.env": process.env,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => page !== `${website}/thanks-for-contact/`,
      lastmod: new Date(Date.now()),
    }),
    icon(),
  ],
});
