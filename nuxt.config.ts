// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo'],

  nitro: {
    prerender: {
      crawlLinks: true
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/all.scss";'
        }
      }
    },
    optimizeDeps: {
      exclude: [
        '@maanex/spacelib-common'
      ]
    }
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.mensatt.de/v1/graphql'
      }
    },
  },
})
