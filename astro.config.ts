import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
const website = "https://barab.me";
export default defineConfig({
  site: website,
  prefetch: true,
  output: "server",
  // env: {
  //   schema: {
  //     EMAIL_TO: envField.string({
  //       context: "server",
  //       access: "secret",
  //       optional: false,
  //     }),
  //     DISCORD_ID: envField.number({
  //       context: "server",
  //       access: "secret",
  //       optional: false,
  //     }),
  //     RESEND_KEY: envField.string({
  //       context: "server",
  //       access: "secret",
  //       optional: false,
  //     }),
  //     FOOTER_NOTE: envField.string({
  //       context: "client",
  //       access: "public",
  //       optional: false,
  //     }),
  //   },
  // },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.json',
    },
    imageService: "compile",
  }),
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.BUILD_DATE": JSON.stringify(
        new Date().toISOString().split("T")[0],
      ),
      build: {
        minify: false,
      },
    },
  },
  integrations: [
    sitemap({
      filter: (page) => page !== `${website}/thanks-for-contact/`,
      lastmod: new Date(Date.now()),
    }),
    icon({
      include: {
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
