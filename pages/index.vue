<template>
  <div class="intro">
    <div class="intro-component abs-middle flex flex-column flex-align-center gap-8">
      <LazyIntroTransitionTitle />
      <LazyIntroTypeText />
      <LazyIntroController />
    </div>
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()

useHead({
  meta: [
    { property: 'og:title', content: t('openGraph.dewdew', { text: 'dewdew' }) }
  ]
})

definePageMeta({
  layout: 'raw'
})

</script>
