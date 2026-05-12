import {
  defineConfig,
  fontProviders,
  svgoOptimizer,
  envField,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
const website = "https://barab.me";
export default defineConfig({
  site: website,
  prefetch: true,
  output: "server",
  fonts: [
    {
      name: "Noto Sans",
      cssVariable: "--font-noto",
      provider: fontProviders.fontsource(),
      fallbacks: ["monospace"],
    },
  ],
  experimental: {
    svgOptimizer: svgoOptimizer(),
    queuedRendering: {
      enabled: true,
    },
  },
  env: {
    schema: {
      EMAIL_TO: envField.string({
        context: "server",
        access: "secret",
        optional: false,
        default: "mail@example.com",
      }),
      DISCORD_ID: envField.number({
        context: "server",
        access: "secret",
        optional: false,
        default: 0,
      }),
      RESEND_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
        default: "RE_KEY",
      }),
      FOOTER_NOTE: envField.string({
        context: "client",
        access: "public",
        optional: true,
        default: "Nothing to add",
      }),
      TURNSTILE_SERVER: envField.string({
        context: "server",
        access: "secret",
        optional: false,
        // default: "1x0000000000000000000000000000000AA", // Fail : 2x0000000000000000000000000000000AA
      }),
      TURNSTILE_CLIENT: envField.string({
        context: "client",
        access: "public",
        optional: false,
        // default: "1x00000000000000000000AA", // Fail : 3x00000000000000000000FF
      }),
      BUILD_DATE: envField.string({
        context: "client",
        access: "public",
        optional: true,
        default: JSON.stringify(new Date().toISOString().split("T")[0]),
      }),
    },
  },
  adapter: cloudflare({}),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) => page !== `${website}/thanks-for-contact/`,
      lastmod: new Date(Date.now()),
    }),
  ],
});
