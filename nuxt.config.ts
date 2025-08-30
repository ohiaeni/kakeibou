import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error: Vite plugin config type mismatch with Vuetify plugin
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2025-07-15',
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
