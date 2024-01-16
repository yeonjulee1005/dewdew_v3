<template>
  <div class="archive-detail">
    <AButton
      custom-class="prev-button"
      button-color="rose"
      button-size="lg"
      button-variant="outline"
      button-label="back"
      use-leading
      icon-name="line-md:arrow-small-left"
      :button-text="$t('archives.back')"
      @click:button="navigateTo('/archives')"
    />
    <ArchiveImageSlider
      :image-data="yearData"
      :show-pagination="false"
      @open-dialog="openImageDialog"
    />
    <DialogArchive
      v-model:dialog-trigger="imageDialogTrigger"
      :select-image-data="selectImageData"
      @close:dialog="() => imageDialogTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { path } = useRoute()

useHead({
  title: t('pageTitle.archives'),
  meta: [
    { property: 'description', content: t('openGraph.archives') },
    { property: 'og:title', content: t('pageTitle.archives') },
    { property: 'og:description', content: t('openGraph.archives') },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` }
  ]
})

definePageMeta({
  layout: 'default'
})

const selectImageData = ref<SerializeObject>()
const imageDialogTrigger = ref(false)

const { data: yearData }: SerializeObject = await useFetch('/api/archive/detail', {
  headers: useRequestHeaders(['cookie']),
  params: {
    years: path.split('/archives/')[1]
  },
  immediate: true
})

const openImageDialog = (imageData:SerializeObject) => {
  selectImageData.value = imageData
  imageDialogTrigger.value = true
}

</script>
