<template>
  <div class="hhkb h-full">
    <p class="hhkb-title">
      {{ $t('hhkb.title') }}
    </p>
    <div class="hhkb-input">
      <DDTextarea
        padded
        color="violet"
        size="lg"
        :placeholder="$t('hhkb.inputPlaceholder')"
        :rows="5"
        name="hhkb-input"
      />
    </div>
    <spline-viewer
      class="hhkb-canvas"
      :url="splineUrl"
    />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()

useHead({
  title: t('pageTitle.hhkb'),
  meta: [
    { property: 'description', content: t('openGraph.hhkbDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.hhkb') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/projects/hhkb/' },
    { property: 'og:description', content: t('openGraph.hhkbDesc') }
  ]
})

const splineUrl = 'https://prod.spline.design/piJPNSilaNlBFqN6/scene.splinecode'

</script>
