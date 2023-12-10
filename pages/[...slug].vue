<template>
  <main class="content-container">
    <ContentDoc />
  </main>
</template>

<script setup lang="ts">

const { t } = useLocale()

useHead({
  title: t('pageTitle.blog'),
  meta: [
    { property: 'description', content: t('openGraph.blogDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.blog') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/tech/' },
    { property: 'og:description', content: t('openGraph.blogDesc') }
  ]
})

</script>
