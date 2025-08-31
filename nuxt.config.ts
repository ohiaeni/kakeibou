import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  // ハイドレーションエラーを回避するためのSSR設定
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error: Vite plugin config type mismatch with Vuetify plugin
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  ssr: true,
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    storage: {
      // クライアントサイドのみでストレージを使用
      redis: {
        driver: 'memory',
      },
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
