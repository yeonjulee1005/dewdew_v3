// https://nuxt.com/docs/api/configuration/nuxt-config

import packageJson from './package.json'

export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  supabase: {
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
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.NUXT_ENV_VERCEL_URL ?? 'http://localhost:4500',
      serviceVersion: JSON.stringify(packageJson.version)
    }
  }
})
