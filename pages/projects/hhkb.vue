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
    <ASplineCanvas
      canvas-class="hhkb-canvas"
      :spline-url="splineUrl"
    />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { path } = useRoute()

const splineUrl = 'https://prod.spline.design/piJPNSilaNlBFqN6/scene.splinecode'

useHead({
  title: t('pageSubTitle.hhkb'),
  meta: [
    { property: 'description', content: t('openGraph.hhkb') },
    { property: 'og:title', content: t('pageSubTitle.hhkb') },
    { property: 'og:description', content: t('openGraph.hhkb') },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` }
  ]
})

</script>
