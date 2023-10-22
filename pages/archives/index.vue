<template>
  <div>
    <div class="main-archives-title">
      {{ $t('archives.title') }}
    </div>
    <LazyImageSlider
      :image-data="archiveData"
      :main-slider-trigger="true"
    />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()

const { archiveData } = useArchiveStore()

useHead({
  title: t('pageTitle.archives'),
  meta: [
    { property: 'description', content: t('pageTitle.archives') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.archives') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/archives/' },
    { property: 'og:description', content: t('pageTitle.archives') }
  ]
})

// const thumbImageData = ref<SerializeObject[]>([])

console.log(archiveData)

// const generateThumbImage = () => {
//   thumbImageData.value = []
//   const
//   archiveData.forEach((image:SerializeObject) => {
//     const randomNumber = Math.floor(Math.random() * image.data.length)
//     const data:SerializeObject = {
//       year: image.id,
//       url: image.data[randomNumber].url,
//       route: '/archives/' + image.id
//     }
//     thumbImageData.value.push(data)
//   })
//   console.log(thumbImageData.value)
// }

// generateThumbImage()

// const initImageData = () => {
//   thumbImageData.value = []
//   coreImages.forEach((images:any) => {
//     if (images.id !== 'assets' && images.id !== 'resources' && images.data.length) {
//       const randomNumber = Math.floor(Math.random() * images.data.length)
//       const data:ArchivesData = {
//         year: images.id,
//         url: images.data[randomNumber].url,
//         route: '/archives/' + images.id
//       }
//       thumbImageData.value.push(data)
//     }
//   })
// }

</script>
