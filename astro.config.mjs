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
      enabled: false,
    },
    imageService: "cloudflare",
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
    icon({
      include: {
        // Include only three `mdi` icons in the bundle
        tabler: [
          "xbox-a",
          "xbox-b",
          "xbox-x",
          "xbox-y",
          "chart-circles",
          "keyboard",
          "brand-github",
          "calendar-code",
          "brand-svelte",
          "brand-tailwind",
          "chevron-right",
          "brand-vite",
          "brand-tabler",
          "brand-cloudflare",
          "circle-number-1",
          "database",
          "brand-react",
          "brand-github-copilot",
          "brand-html5",
          "brand-css3",
          "brand-astro",
          "brand-javascript",
          "brand-bulma",
          "brand-nodejs",
          "brand-npm",
          "brand-debian",
          "brand-deno",
          "brand-vscode",
          "brand-spotify",
          "lemon-2",
          "circle-dashed-x",
          "brand-react-native",
          "file",
        ],
        "file-icons": ["kicad"],
        mdi: ["nix", "arch"],
        "line-md": ["iconify2-static"],
        "simple-icons": ["hyprland", "zedindustries", "bun", "expo"],
      },
    }),
  ],
});
