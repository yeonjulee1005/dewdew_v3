<template>
  <div
    class="main-portfolio flex flex-column flex-justify-center gap-10"
    :class="{'activate': portfolioTrigger}"
  >
    <p class="section-title">
      {{ $t('main.reference.title') }}
    </p>
    <div class="section-text-group flex gap-5">
      <p class="text">
        {{ $t('main.reference.description') }}
      </p>
      <div
        class="move-portfolio flex flex-align-center gap-1"
        @click="navigateTo('/portfolio')"
      >
        <p class="enter-text">
          {{ $t('main.reference.moveTo') }}
        </p>
        <Icon
          name="line-md:log-in"
          :width="30"
          :height="30"
        />
      </div>
    </div>
    <p class="section-bg-text">
      {{ $t('main.reference.background') }}
    </p>
    <div class="portfolio-list flex flex-row flex-wrap flex-justify-center flex-align-center">
      <div
        v-for="item in portfolioImageData"
        :key="item.url"
        class="portfolio-item flex flex-column flex-justify-center flex-align-center"
        @click="navigatePortfolio(item)"
      >
        <spline-viewer
          v-if="item.dynamic_thumbnail"
          class="portfolio-thumb"
          :url="item.dynamic_thumbnail"
        />
        <nuxt-img
          v-else
          class="portfolio-thumb"
          :src="item.image"
          width="200"
          height="200"
          format="webp"
          loading="lazy"
          fit="cover"
          :alt="item.alt"
          :draggable="false"
          @contextmenu.prevent
        />
        <span class="portfolio-text mt-default">
          {{ locale === 'ko' ? item.title.ko : item.title.en }}
        </span>
      </div>
    </div>
    <div
      v-for="count in 4"
      :key="count"
      class="portfolio-background"
      :class="`portfolio-background-${count}`"
    />
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

const { selectedPortfolioData } = storeToRefs(usePortfolioStore())

withDefaults(
  defineProps<{
    portfolioImageData: { orderIndex: {index: number }, title: { ko: string, en: string }, description: { ko: string, en: string }, url: string, image: string, dynamic_thumbnail:string, thumbnail: string, alt: string, deleted: boolean }[] | null | undefined,
    portfolioTrigger?: boolean
  }>(),
  {
    portfolioTrigger: false
  }
)

const navigatePortfolio = (item: SerializeObject) => {
  selectedPortfolioData.value = item
  navigateTo('/portfolio')
}

</script>
