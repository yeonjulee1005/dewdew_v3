<template>
  <div
    class="main-portfolio flex flex-column flex-justify-center gap-10"
    :class="{'activate': portfolioTrigger}"
  >
    <el-text class="section-title">
      {{ locale === 'ko' ? portfolioTitle?.textTitle.textKo : portfolioTitle?.textTitle.textEn }}
    </el-text>
    <el-text class="section-text">
      {{ locale === 'ko' ? portfolioDescription?.textTitle.textKo : portfolioDescription?.textTitle.textEn }}
    </el-text>
    <el-text class="section-bg-text">
      {{ locale === 'ko' ? portfolioBackground?.textTitle.textKo : portfolioBackground?.textTitle.textEn }}
    </el-text>
    <div class="portfolio-list flex flex-row flex-wrap flex-justify-center flex-align-center mx-80">
      <div
        v-for="item in portfolioImageData"
        :key="item.index"
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
          <el-text class="portfolio-text mt-default">
            {{ item.title }}
          </el-text>
        </div>
      </div>
    </div>
    <div class="portfolio-background" />
    <div class="portfolio-background" />
    <PortfolioDialog
      :select-portfolio="selectPortfolio"
      :portfolio-trigger="portfolioDialogTrigger"
      @close-dialog="() => portfolioDialogTrigger = false"
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
    portfolioImageData: SerializeObject[],
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
