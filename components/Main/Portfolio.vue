<template>
  <div
    class="main-portfolio flex flex-column flex-justify-center gap-10"
    :class="{'activate': portfolioTrigger}"
  >
    <span class="section-title">
      {{ locale === 'ko' ? portfolioTitle?.textTitle.ko : portfolioTitle?.textTitle.en }}
    </span>
    <span class="section-text">
      {{ locale === 'ko' ? portfolioDescription?.textTitle.ko : portfolioDescription?.textTitle.en }}
    </span>
    <span class="section-bg-text">
      {{ locale === 'ko' ? portfolioBackground?.textTitle.ko : portfolioBackground?.textTitle.en }}
    </span>
    <div class="portfolio-list flex flex-row flex-wrap flex-justify-center flex-align-center">
      <div
        v-for="item in portfolioImageData"
        :key="item.url"
        class="portfolio-item flex flex-column"
      >
        <div
          class="portfolio-item flex flex-column flex-align-center"
          @click="clickReference(item)"
        >
          <nuxt-img
            class="portfolio-thumb"
            :src="item.image"
            width="200"
            height="200"
            format="webp"
            loading="lazy"
            fit="cover"
            :alt="item.alt"
          />
          <span class="portfolio-text mt-default">
            {{ item.title }}
          </span>
        </div>
      </div>
    </div>
    <div
      v-for="item in 2"
      :key="item"
      class="portfolio-background"
    />
    <DialogPortfolio
      :dialog-trigger="portfolioDialogTrigger"
      :select-portfolio="selectPortfolio"
      @close:dialog="() => portfolioDialogTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

withDefaults(
  defineProps<{
    portfolioTitle: SerializeObject,
    portfolioDescription: SerializeObject,
    portfolioBackground: SerializeObject,
    portfolioImageData: { orderIndex: {index: number }, title: string, desc: string, url: string, image: string, thumbnail: string, alt: string, deleted: boolean }[] | null | undefined,
    portfolioTrigger?: boolean
  }>(),
  {
    portfolioTrigger: false
  }
)

const selectPortfolio = ref<SerializeObject>()
const portfolioDialogTrigger = ref(false)

const clickReference = (data:SerializeObject) => {
  selectPortfolio.value = data
  portfolioDialogTrigger.value = true
}

</script>
