<template>
  <div class="portfolio">
    <Flicking
      :options="option"
      :plugins="plugin"
    >
      <nuxt-picture
        v-for="item in portfolioData"
        :key="item.url"
        class="portfolio-picture"
        :src="item?.image ?? ''"
        width="200"
        height="200"
        format="webp"
        fit="cover"
        :alt="item?.alt"
        :img-attrs="{ class: 'portfolio-image' }"
        :draggable="false"
        @contextmenu.prevent
        @click="selectPortfolio(item)"
        @mouseenter="selectPortfolio(item)"
      />
      <template #viewport>
        <div class="flicking-pagination" />
      </template>
    </Flicking>
    <DDCard
      v-if="selectedPortfolioData"
      class="portfolio-card"
      :ui="{ ring: 'ring-0', divide: 'divide-fuchsia-200 dark:divide-fuchsia-950', rounded: 'rounded-2xl', background: 'bg-zinc-100 dark:bg-neutral-900' }"
      @click="navigateTo(selectedPortfolioData.url, { external: true, open: { target: '_blank' } })"
    >
      <template #header>
        <div class="flex flex-column gap-10">
          <p class="card-title mb-default">
            {{ locale === 'ko' ? selectedPortfolioData.title.ko : selectedPortfolioData.title.en }}
          </p>
          <p class="card-description mb-default">
            {{ locale === 'ko' ? selectedPortfolioData.description.ko : selectedPortfolioData.description.en }}
          </p>
        </div>
      </template>
      <nuxt-picture
        class="card-image"
        :src="selectedPortfolioData.image"
        width="2000"
        height="2400"
        format="webp"
        fit="cover"
        :alt="selectedPortfolioData.alt"
        :img-attrs="{ class: 'image' }"
        :draggable="false"
        @contextmenu.prevent
      />
    </DDCard>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import { AutoPlay, Pagination } from '@egjs/flicking-plugins'
import '@egjs/vue3-flicking/dist/flicking.css'
import '@egjs/flicking-plugins/dist/pagination.css'

const { t, locale } = useLocale()
const { path } = useRoute()

const { portfolioData, selectedPortfolioData } = storeToRefs(usePortfolioStore())
const { loadPortfolioData } = useFetchComposable()

useHead({
  title: t('pageTitle.portfolio'),
  meta: [
    { property: 'description', content: t('openGraph.portfolio') },
    { property: 'og:title', content: t('pageTitle.portfolio') },
    { property: 'og:description', content: t('openGraph.portfolio') },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` }
  ]
})

const plugin = [
  new AutoPlay({
    animationDuration: 1000,
    direction: 'NEXT',
    stopOnHover: true
  }),
  new Pagination({ type: 'scroll' })
]

const option = {
  inputType: ['touch', 'mouse'],
  circular: true,
  deceleration: 0.0035
}

if (!portfolioData.value) {
  await loadPortfolioData()
  if (portfolioData.value) {
    selectedPortfolioData.value = portfolioData.value[0]
  }
}

const selectPortfolio = (item: SerializeObject) => {
  selectedPortfolioData.value = item
}

</script>
