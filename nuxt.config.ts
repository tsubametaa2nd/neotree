// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["nuxt-lucide-icons"],

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  app: {
    head: {
      title: "NutriHarian - Rekomendasi Menu Sehat Harian",
      htmlAttrs: {
        lang: "id",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Dapatkan rekomendasi menu sehat harian yang disesuaikan dengan kebutuhan kalori dan preferensi Anda. Panduan nutrisi seimbang untuk gaya hidup sehat.",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#16a34a" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  routeRules: {
    "/": { prerender: true },
  },
});
