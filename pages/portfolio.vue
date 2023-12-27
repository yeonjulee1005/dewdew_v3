<template>
  <div class="portfolio">
    <Flicking
      :options="{ bound: true, bounce: 30, moveType: 'freeScroll' }"
      :plugins="plugin"
    >
      <div
        v-for="item in portfolioData"
        :key="item.url"
        class="flicking-panel thumb has-background-primary"
        @click="selectPortfolio(item)"
      >
        <nuxt-picture
          v-if="item?.image"
          class="detail-image"
          :src="item?.image ?? ''"
          width="200"
          height="200"
          format="webp"
          fit="cover"
          :alt="item?.alt"
          :img-attrs="{ class: 'image' }"
          :draggable="false"
          @contextmenu.prevent
        />
      </div>
    </Flicking>
    <DDCard>
      <template #header>
        <div class="flex flex-column gap-10">
          <span class="title mb-default">
            {{ selectedPortfolioData?.title }}
          </span>
          <span class="description mb-default">
            {{ selectedPortfolioData?.desc }}
          </span>
        </div>
      </template>
      <nuxt-picture
        v-if="selectedPortfolioData?.image"
        class="detail-image"
        :src="selectedPortfolioData?.image ?? ''"
        width="2000"
        height="2400"
        format="webp"
        fit="cover"
        :alt="selectedPortfolioData?.alt"
        :img-attrs="{ class: 'image' }"
        :draggable="false"
        @contextmenu.prevent
      />
    </DDCard>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import { AutoPlay } from '@egjs/flicking-plugins'
import '@egjs/vue3-flicking/dist/flicking.css'

const { portfolioData, selectedPortfolioData } = storeToRefs(usePortfolioStore())

const plugin = [
  new AutoPlay({
    animationDuration: 1000,
    stopOnHover: true
  })
]

const selectPortfolio = (item: SerializeObject) => {
  selectedPortfolioData.value = item
}

</script>
