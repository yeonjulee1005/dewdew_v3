<template>
  <div style="width:100%;">
    <div class="main-archives-title">
      {{ $t('archives.title') }}
    </div>
    <LazyArchiveImageSlider
      :image-data="thumbImageData"
      main-slider-trigger
    />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()

const { loadArchiveData } = useFetchComposable()

const { randomOrder } = useUi()

useHead({
  title: t('pageTitle.archives'),
  meta: [
    { property: 'description', content: t('openGraph.archivesDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.archives') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/archives/' },
    { property: 'og:description', content: t('openGraph.archivesDesc') }
  ]
})


const { data: thumbImageData }: SerializeObject = useAsyncData('archiveData', async () => {
  const data = await loadArchiveData()

  return generateThumbImageData(data)
}, {
  immediate: true
})

const generateThumbImageData = (imageData:SerializeObject) => {
  const thumbImageData:{ title: string, url: string, route: string }[] = []

  imageData.forEach((image:{ index: number, title: string, deleted: boolean, archiveImage: { title: string, years: string, url: string}[] }) => {
    if (!image.archiveImage) { return }

    const result:{ title: string, url: string, route: string } = {
      title: image.title,
      url: image.archiveImage[randomOrder(image.archiveImage.length)]?.url,
      route: `/archives/${image.title}`
    }

    thumbImageData.push(result)
  })

  return thumbImageData
}

</script>
