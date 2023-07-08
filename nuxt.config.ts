// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-icons',
    '@maanex/nuxt-apollo-upload',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
  ],

  // Disabled so storage forms like localStorage work for our application
  // Since the deploy target is static anyway we don't really need the benefits of ssr anyway
  ssr: false,

  // experimental: {
  //   viewTransition: true
  // },

  app: {
    head: {
      title: 'Mensatt',
      meta: [
        { charset: 'utf-8' },
        { hid: 'description', name: 'description', content: 'Mensatt is providing your high quality information about all Mensas 👍' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'darkreader-lock', content: 'true' },
        { name: 'ScreenOrientation', "http-equiv": 'ScreenOrientation', content: 'autoRotate:disabled' },
        // { name: 'msapplication-TileColor', content: '#c9f1b6' },
        // { name: 'theme-color', content: '#c9f1b6' }
      ],
      link: [
        // { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
        // { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      theme_color: '#ffffff',
      background_color: '#dce3ea',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      name: 'Mensatt',
      short_name: 'Mensatt',
      description: 'Mensatt - In der Mensa wird man satt',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: false,
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/imports.scss";'
        }
      }
    }
  },

  apollo: {
    clients: {
      prod: {
        httpEndpoint: 'https://api.mensatt.de/v1/graphql',
        useUploadLink: true
      },
      dev: {
        httpEndpoint: 'https://dev-api.mensatt.de/v1/graphql',
        useUploadLink: true
      },
      local: {
        httpEndpoint: 'https://localhost:4000/v1/graphql',
        useUploadLink: true
      },
    },
  },

  i18n: {
    legacy: false,
    langDir: 'lang',
    defaultLocale: 'de',
    fallbackLocale: 'de',
    jsTsFormatResource: true,
    lazy: true,
    // ↓ remove strategy to get mensatt.de/en/about like urls. Downside: PWA entry point url is static -> language gets overwritten on startup. For now we'll rely on cookies only for language persistence.
    strategy: 'no_prefix',
    locales: [
      {
        code: 'de',
        iso: 'de',
        file: 'de.js',
        name: 'Deutsch'
      },
      {
        code: 'en',
        iso: 'en',
        file: 'en.js',
        name: 'English'
      },
    ]
  }
})
