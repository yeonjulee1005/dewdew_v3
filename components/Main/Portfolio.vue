<template>
  <div
    class="main-portfolio flex flex-column flex-justify-center gap-10"
    :class="{'activate': portfolioTrigger}"
  >
    <span class="section-title">
      {{ $t('main.reference.title') }}
    </span>
    <span class="section-text">
      {{ $t('main.reference.description') }}
    </span>
    <span class="section-bg-text">
      {{ $t('main.reference.background') }}
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
            :draggable="false"
            @contextmenu.prevent
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

withDefaults(
  defineProps<{
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
