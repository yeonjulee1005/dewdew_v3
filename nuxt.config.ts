// https://nuxt.com/docs/api/configuration/nuxt-config

import packageJson from './package.json'

export default ({
  devtools: {
    enabled: true
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/element-theme.scss" as element;'
        }
      }
    }
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
  runtimeConfig: {
    public: {
      emailJsKey: process.env.EMAILJS_KEY,
      emailJSsTemplate: process.env.EMAILJS_TEMPLATE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.NUXT_ENV_VERCEL_URL ?? 'http://localhost:4500',
      serviceVersion: JSON.stringify(packageJson.version)
    }
  }
})
