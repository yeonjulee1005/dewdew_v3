<template>
  <div>
    <div class="main-archives-title">
      {{ $t('archives.title') }}
    </div>
    <LazyImageSlider
      :image-data="thumbImageData"
      :main-slider-trigger="true"
    />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()

const { thumbImageData } = useArchiveStore()

useHead({
  title: t('pageTitle.archives'),
  meta: [
    { property: 'description', content: t('pageTitle.archives') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.archives') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/archives/' },
    { property: 'og:description', content: t('pageTitle.archives') }
  ]
})

</script>
