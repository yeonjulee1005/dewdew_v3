<template>
  <div style="width:100%;">
    <div class="main-archives-title">
      {{ $t('archives.title') }}
    </div>
    <LazyImageSlider
      :image-data="thumbImageData"
      main-slider-trigger
    />
  </div>
</template>

<script setup lang="ts">

const client = useSupabaseClient()

const { t } = useLocale()

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


const { data: thumbImageData } = useAsyncData('archiveData', async () => {
  const { data, error } = await client
    .from('archiveIndex')
    .select('index, title, deleted, archiveImage(title, years, url)')
    .eq('deleted', false)

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  if (!data) { return }

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
