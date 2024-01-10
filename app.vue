<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <div>
        <NuxtLoadingIndicator
          :height="5"
          color="repeating-linear-gradient(to right,#bdbdbd 0%,#cb8a80 100%)"
        />
        <NuxtPage />
        <DDNotifications />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">

const { meta, fullPath } = useRoute()

const { t } = useLocale()
const { loadMenuData } = useFetchComposable()

loadMenuData('root')
loadMenuData('sub')
loadMenuData('sns')

useHead({
  titleTemplate: (title: string | undefined) => {
    return title && !title?.includes(t('pageTitle.yeonju'))
      ? title?.concat(' | ', t('pageTitle.yeonju'))
      : null
  }
})

const seoUrl = 'https://www.dewdew.dev'
const seoImage = 'https://api.dewdew.dev/storage/v1/object/public/assets/banner/main_banner.webp'

if (process.server) {
  useHead({
    title: (meta.title as string) ?? '개발자 이연주 | Dewdew',
    meta: () => [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
      { name: 'author', content: 'Dewdew' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#705757' },
      { name: 'msapplication-TileColor', content: '#705757' },
      { name: 'keywords', content: 'developer,develop,web,portfolio,개발자,FE웹개발자,웹개발자,포트폴리오,개발자 포트폴리오,프론트앤드 포트폴리오' },
      { name: 'naver-site-verification', content: '7c406de71b03c1e444a4fe2630a29bd7a8e17559' },
      { name: 'description', content: (meta.description as string) ?? t('openGraph.main') },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: seoUrl },
      { property: 'og:image', content: seoImage, key: 'og:image' },
      { property: 'og:image:width', content: '410' },
      { property: 'og:image:height', content: '200' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:title', content: (meta.title as string) ?? t('pageTitle.yeonju') },
      { property: 'og:description', content: (meta.description as string) ?? t('openGraph.main') }
    ],
    link: [
      { rel: 'canonical', href: fullPath },
      { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
      { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ],
    script: [
      {
        hid: 'spiine-viewer',
        src: 'https://unpkg.com/@splinetool/viewer@1.0.17/build/spline-viewer.js',
        type: 'module',
        defer: true
      }
    ]
  })
}

</script>
