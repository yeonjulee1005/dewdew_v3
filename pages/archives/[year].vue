<template>
  <div class="archive-detail">
    <AButton
      custom-class="prev-button"
      button-size="lg"
      button-variant="ghost"
      button-label="back"
      use-icon
      icon-name="line-md:arrow-small-left"
      @click:button="navigateTo('/archives')"
    />
    <ImageSlider
      :image-data="yearData"
      :inner-archive-trigger="true"
      :show-pagination="false"
      @open-dialog="openImageDialog"
    />
    <ArchiveDialog
      :dialog-trigger="imageDialogTrigger"
      :select-image-data="selectImageData"
      @close:dialog="() => imageDialogTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">

const client = useSupabaseClient()

const { t } = useLocale()
const { path } = useRoute()

useHead({
  title: t('pageTitle.archives'),
  meta: [
    { property: 'description', content: t('openGraph.archivesDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.archives') }) },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` },
    { property: 'og:description', content: t('openGraph.archivesDesc') }
  ]
})

definePageMeta({
  pageTransition: false,
  layout: 'default'
})

const selectImageData = ref<SerializeObject>()
const imageDialogTrigger = ref(false)

const { data: yearData }:SerializeObject = await useAsyncData('archiveDetailData', async () => {
  const { data, error } = await client
    .from('archiveImage')
    .select('title, years, url, deleted')
    .eq('years', path.split('/archives/')[1])
    .eq('deleted', false)

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})

const openImageDialog = (imageData:SerializeObject) => {
  selectImageData.value = imageData
  imageDialogTrigger.value = true
}

</script>
