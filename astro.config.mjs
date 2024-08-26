import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
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
  },
  integrations: [tailwind(), icon()]
});