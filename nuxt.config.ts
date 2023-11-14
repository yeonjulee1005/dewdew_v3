// https://nuxt.com/docs/api/configuration/nuxt-config

import packageJson from './package.json'

export default ({
  devtools: {
    enabled: true
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
      link: [
        { rel: 'canonical', href: 'https://www.dewdew.dev' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  loadingIndicator: {
    name: 'chasing-dots',
    color: 'purple',
    background: 'green'
  },
  supabase: {
    redirect: false,
    // redirectOptions: {
    //   login: '/login',
    //   callback: '/confirm',
    //   exclude: [
    //     '/',
    //     '/blog',
    //     '/blog/*',
    //     '/projects',
    //     '/projects/*',
    //     '/archives',
    //     '/archives/*'
    //   ]
    // },
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
    '@nuxt/devtools',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/supabase',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@element-plus/nuxt',
    'nuxt-icon',
    'dayjs-nuxt'
  ],
  css: [
    '~/assets/scss/style.scss'
  ],
  stylelint: {
    lintOnStart: true
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  imports: {
    dirs: [
      'composables',
      'composables/**',
      'stores',
      'stores/**'
    ]
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
    UserAgent: '*',
    Allow: '/'
  },
  elementPlus: {
    importStyle: 'scss',
    themes: ['dark']
  },
  dayjs: {
    locales: ['ko'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/element-theme.scss" as element;'
        }
      }
    }
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
