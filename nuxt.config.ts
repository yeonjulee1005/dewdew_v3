// https://nuxt.com/docs/api/configuration/nuxt-config
import { sentryVitePlugin } from '@sentry/vite-plugin'
import packageJson from './package.json'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'ko'
      },
      meta: [
        { property: 'Imagetoolbar', content: 'no' },
        { name: 'naver-site-verification', content: '7c406de71b03c1e444a4fe2630a29bd7a8e17559' }
      ],
      script: [
        {
          hid: 'spline-viewer',
          src: 'https://unpkg.com/@splinetool/viewer@1.0.17/build/spline-viewer.js',
          type: 'module',
          async: true
        }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/iconapple-touch-icon.png' },
        { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#5bbad5' },
        { rel: 'canonical', href: 'https://www.dewdew.dev' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' }
      ]
    }
  },
  experimental: {
    componentIslands: true
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [
        '/',
        '/tech',
        '/tech/*',
        '/blog',
        '/blog/*',
        '/projects',
        '/projects/*',
        '/archives',
        '/archives/*'
      ]
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      }
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/devtools',
    '@nuxt/content',
    '@nuxtjs/device',
    '@nuxtjs/fontaine',
    '@nuxtjs/robots',
    '@nuxtjs/supabase',
    '@nuxtjs/eslint-module',
    '@nuxtjs/html-validator',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/i18n',
    'nuxt-time',
    'nuxt-icon',
    'nuxt-simple-sitemap',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'dayjs-nuxt'
  ],
  css: [
    '~/assets/scss/style.scss'
  ],
  ui: {
    prefix: 'DD'
  },
  stylelint: {
    lintOnStart: true
  },
  components: [
    {
      path: '~/components',
      pathPrefix: true
    }
  ],
  imports: {
    dirs: [
      'composables/**',
      'stores/**'
    ]
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'dracula-soft'
      }
    }
  },
  pwa: {
    manifest: false, // public/manifest.webmanifest
    strategies: 'generateSW',
    injectRegister: 'script',
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,json,svg,png,ico,webmanifest}'],
      globIgnores: ['google*.html'],
      navigateFallbackDenylist: [
        /^\/.*\\?giscus=.*/,
        /^\/.*\\?api.*/,
        /^\/privacy.*/
      ],
      runtimeCaching: [
        {
          urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.match(/^\/.*(avatar|favicon|privacy|manifest|).*/i),
          handler: 'NetworkFirst' as const,
          options: { cacheName: 'homepage' }
        }, // Every article have to be visited before it is cached
        {
          urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.match(/^\/(api|article)\/.*/i),
          handler: 'NetworkFirst' as const,
          options: { cacheName: 'articles' }
        } // when this is cached - the frontpage is working offline
      ]
    },
    devOptions: {
      enabled: false,
      type: 'module',
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 300
    }
  },
  i18n: {
    langDir: './locales',
    locales: [
      {
        code: 'ko',
        file: 'ko.ts'
      },
      {
        code: 'en',
        file: 'en.ts'
      }
    ],
    defaultLocale: 'ko',
    strategy: 'no_prefix'
  },
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'spline-viewer'
        }
      }
    },
    build: {
      sourcemap: true,
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-i18n': ['vue-i18n']
          }
        }
      }
    },
    plugins: [
      sentryVitePlugin({
        org: 'dewdew',
        project: 'dewdew_v3',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        telemetry: false
      })
    ]
  },
  pinia: {
    storesDirs: [
      './stores/**'
    ]
  },
  vueuse: {
    ssrHandlers: false
  },
  typescript: {
    shim: false
  },
  robots: {
    rules: [
      {
        UserAgent: '*',
        Allow: '/'
      }
    ]
  },
  site: {
    url: 'https://www.dewdew.dev'
  },
  dayjs: {
    locales: ['ko'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul'
  },
  runtimeConfig: {
    public: {
      emailJsKey: process.env.EMAILJS_KEY,
      emailJSsTemplate: process.env.EMAILJS_TEMPLATE,
      siteUrl: process.env.BASE_URL,
      serviceVersion: JSON.stringify(packageJson.version)
    }
  }
})
