// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "nuxt-vuefire"],
  vuefire: {
    config: {
      apiKey: process.env.NUXT_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,

      // there could be other properties depending on the project
    },

    auth: {
      enabled: true,
    },

  },



  typescript: {
    tsConfig: {
      extends: "../../../tsconfig.base.json",
    },
  },
});
