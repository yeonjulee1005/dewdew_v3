<template>
  <div
    class="main-portfolio flex flex-column flex-justify-center gap-10"
    :class="{'activate': portfolioTrigger}"
  >
    <el-text class="section-title">
      {{ locale === 'ko' ? portfolioTitle?.textTitle.ko : portfolioTitle?.textTitle.en }}
    </el-text>
    <el-text class="section-text">
      {{ locale === 'ko' ? portfolioDescription?.textTitle.ko : portfolioDescription?.textTitle.en }}
    </el-text>
    <el-text class="section-bg-text">
      {{ locale === 'ko' ? portfolioBackground?.textTitle.ko : portfolioBackground?.textTitle.en }}
    </el-text>
    <div
      v-if="portfolioData"
      class="portfolio-list flex flex-row flex-wrap flex-justify-center flex-align-center mx-80"
    >
      <div
        v-for="item in portfolioData"
        :key="item.url ?? ''"
        class="portfolio-item flex flex-column"
      >
        <div
          class="portfolio-item flex flex-column flex-align-center"
          @click="clickReference(item)"
        >
          <nuxt-img
            class="portfolio-thumb"
            :src="item.image ?? ''"
            width="200"
            height="200"
            format="webp"
            loading="lazy"
            fit="cover"
            :alt="item.alt ?? 'image'"
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
      @close:dialog="() => portfolioDialogTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

const { portfolioData } = storeToRefs(usePortfolioStore())

withDefaults(
  defineProps<{
    portfolioTitle: SerializeObject,
    portfolioDescription: SerializeObject,
    portfolioBackground: SerializeObject,
    portfolioTrigger?: boolean
  }>(),
  {
    portfolioTrigger: false
  }
)

const selectPortfolio = ref<Tables<'portfolio'> | { orderIndex: {index: number | null} | null; title: string | null; desc: string | null; url: string | null; image: string | null; thumbnail: string | null; alt: string | null; deleted: boolean | null; }>()
const portfolioDialogTrigger = ref(false)

const clickReference = (data:Tables<'portfolio'> | { orderIndex: {index: number | null} | null; title: string | null; desc: string | null; url: string | null; image: string | null; thumbnail: string | null; alt: string | null; deleted: boolean | null; }) => {
  selectPortfolio.value = data
  portfolioDialogTrigger.value = true
}

</script>
