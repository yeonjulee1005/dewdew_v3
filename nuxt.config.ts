// https://nuxt.com/docs/api/configuration/nuxt-config
import { sentryVitePlugin } from '@sentry/vite-plugin'
import packageJson from './package.json'

export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/main': { prerender: true }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'ko'
      },
      meta: [
        { property: 'Imagetoolbar', content: 'no' }
      ],
      link: [
        { rel: 'canonical', href: 'https://www.dewdew.dev' }
      ]
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
  pinia: {
    storesDirs: [
      './stores/**'
    ]
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
      minify: true,
      terserOptions: {
        compress: {
          drop_console: true
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
  runtimeConfig: {
    public: {
      emailJsKey: process.env.EMAILJS_KEY,
      emailJSsTemplate: process.env.EMAILJS_TEMPLATE,
      siteUrl: process.env.BASE_URL,
      serviceVersion: JSON.stringify(packageJson.version)
    }
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
    workbox: {
      globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}']
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },
  i18n: {
    langDir: './locales',
    locales: [
      { code: 'ko', file: 'ko.ts' },
      { code: 'en', file: 'en.ts' }
    ],
    defaultLocale: 'ko',
    strategy: 'no_prefix'
  },
  dayjs: {
    locales: ['ko'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul'
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  experimental: {
    componentIslands: true
  },
  stylelint: {
    lintOnStart: true
  },
  vueuse: {
    ssrHandlers: false
  },
  typescript: {
    shim: false
  },
  robots: {
    rules: [
      { UserAgent: '*', Allow: '/' }
    ]
  },
  site: {
    url: 'https://www.dewdew.dev'
  }
})
