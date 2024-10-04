import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
const website = 'https://barab.me';
// https://astro.build/config
export default defineConfig({
  site: website,
  prefetch: true,
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
    imageService: 'passthrough',
  }),
  vite: {
    build: {
      minify: false,
    },
    define: {
      'import.meta.env.BUILD_DATE': JSON.stringify(new Date().toISOString().split('T')[0]),
      "process.env": process.env,
    },
  },
  integrations: [tailwind({
    // Example: Disable injecting a basic `base.css` import on every page.
    // Useful if you need to define and/or import your own custom `base.css`.
    applyBaseStyles: false,
  }),
  sitemap({
    filter: (page) => page !== `${website}/thanks-for-contact/`,
    lastmod: new Date(Date.now()),
  }),
  icon()]
});