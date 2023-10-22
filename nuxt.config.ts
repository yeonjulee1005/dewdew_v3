// https://nuxt.com/docs/api/configuration/nuxt-config

import packageJson from './package.json'

export default ({
  devtools: {
    enabled: true
  },
  app: {
    keepalive: true,
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Dewdew',
      htmlAttrs: {
        lang: 'ko'
      },
      meta: [
        { name: 'Author', content: 'Dewdew' },
        { name: 'description', content: '안녕하세요. FE 개발자 이연주입니다.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#705757' },
        { name: 'keywords', content: 'developer,develop,web,portfolio,개발자,FE웹개발자,웹개발자,포트폴리오,개발자 포트폴리오' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'FE 개발자 이연주' },
        { property: 'og:url', content: 'https://www.dewdew.kr' },
        { property: 'og:image', content: 'https://tgtlrqqasaiavynmlxkc.supabase.co/storage/v1/object/public/assets/banner/main_banner.webp' },
        { property: 'og:description', content: '안녕하세요. FE 개발자 이연주입니다.' },
        { property: 'Imagetoolbar', content: 'no' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
      enabled: true,
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
    build: {
      chunkSizeWarningLimit: 1000,
      commonjsOptions: {
        esmExternals: true
      },
      rollupOptions: {
        output: {
          manualChunks: (id:string) => {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.NUXT_ENV_VERCEL_URL ?? 'http://localhost:4500',
      serviceVersion: JSON.stringify(packageJson.version)
    }
  }
})
