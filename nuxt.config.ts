// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts"
  ],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
  runtimeConfig: {
    public: {
      discordURL: process.env.DISCORD_URL
    }
  },
  googleFonts: {
    families: {
        "Kelly Slab": true,
        "Cuprum": true,
        "Open Sans": true
    }
}
})