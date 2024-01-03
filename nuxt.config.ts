// https://nuxt.com/docs/api/configuration/nuxt-config
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
          type: 'module'
        }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
        { rel: 'canonical', href: 'https://www.dewdew.dev' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }
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
    registerType: 'autoUpdate',
    srcDir: './public/worker',
    filename: 'sw.ts',
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
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    injectManifest: {
      globDirectory: './.nuxt/dev-sw-dist',
      globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}'],
      globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js']
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
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
    }
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
