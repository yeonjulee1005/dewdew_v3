<template>
  <div class="hhkb h-full">
    <p class="hhkb-title">
      HHKB Keyboard
    </p>
    <div class="hhkb-input">
      <DDTextarea
        padded
        color="violet"
        size="lg"
        placeholder="영어로 작성하거나 마우스로 키보드를 클릭하면, 아래의 3D 모델링된 hhkb 키보드가 동작합니다."
        :rows="5"
      />
    </div>
    <ClientOnly>
      <spline-viewer
        class="hhkb-canvas"
        :url="splineUrl"
      />
    </ClientOnly>
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
