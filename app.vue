<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtLoadingIndicator :height="5" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ID_INJECTION_KEY } from 'element-plus'

provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0
})

const { loadMenuData, loadMainData } = useLoadComposable()

const { loadStackData } = useStackStore()
const { loadPortfolioData } = usePortfolioStore()
const { loadLeaveColorData } = useLeaveColorStore()
const { loadArchiveGroup } = useArchiveStore()

const seoTitle = 'Developer Dewdew | 개발자 이연주'
const seoDescription = '안녕하세요. FE 개발자 이연주입니다.'
const seoUrl = 'https://www.dewdew.dev'
const seoImage = 'https://tgtlrqqasaiavynmlxkc.supabase.co/storage/v1/object/public/assets/banner/main_banner.webp'

loadMenuData('root')
loadMenuData('sub')
loadMenuData('sns')

loadMainData()
loadStackData()
loadPortfolioData()
loadLeaveColorData()
loadArchiveGroup()

useSeoMeta({
  charset: 'utf-16',
  viewport: 'width=device-width, initial-scale=1.0',
  formatDetection: 'telephone=no',
  themeColor: '#705757',
  keywords: 'developer,develop,web,portfolio,개발자,FE웹개발자,웹개발자,포트폴리오,개발자 포트폴리오',
  title: seoTitle,
  author: 'Dewdew',
  description: seoDescription,
  ogType: 'website',
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogUrl: seoUrl,
  ogImage: seoImage,
  ogImageSecureUrl: seoImage,
  ogImageType: 'image/png',
  ogImageWidth: '410',
  ogImageHeight: '200',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: seoImage
})

</script>
