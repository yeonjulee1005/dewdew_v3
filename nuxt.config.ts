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
        { property: 'Imagetoolbar', content: 'no' }
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
      preload: ['js', 'ts', 'json', 'vue'],
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'dracula-soft'
      }
    }
  },
  htmlValidator: {
    failOnError: true,
    options: {
      rules: {
        'wcag/h37': 'warn',
        'element-permitted-content': 'warn',
        'element-required-attributes': 'warn',
        'attribute-empty-style': 'off'
      }
    }
  },
  fontMetrics: {
    fonts: [
      {
        fallbackName: 'Pretendard fallback',
        family: 'Pretendard',
        fallbacks: ['Arial']
      }
    ]
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Dewdew',
      short_name: 'Dewdew',
      theme_color: '#fa7474',
      icons: [
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: false,
      type: 'module',
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/]
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
