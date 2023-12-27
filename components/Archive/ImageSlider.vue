<template>
  <div class="main-slider-section">
    <Flicking
      :plugins="plugin"
      :options="option"
      nested-wide
    >
      <div
        v-for="(image, index) in imageData"
        :key="index"
        class="flicking-panel p-20"
      >
        <div class="image-component">
          <nuxt-picture
            v-if="image?.url"
            :src="image.url"
            width="360"
            height="300"
            format="webp"
            loading="lazy"
            :img-attrs="{class: 'thumbnail'}"
            :alt="image?.title ?? 'image'"
            :draggable="false"
            @contextmenu.prevent
            @click="mainSliderTrigger ? navigateTo(`/archives/${image?.title ?? ''}`) : $emit('open-dialog', image)"
          />
          <div
            v-if="mainSliderTrigger && image?.url"
            class="text-group flex flex-column"
          >
            <span class="title">
              {{ $t('archives.historyTitle') }}
            </span>
            <span class="subtitle">
              {{ image?.title }}
            </span>
          </div>
        </div>
      </div>
      <template #viewport>
        <span
          v-if="showNavigation"
          class="flicking-arrow-prev"
        />
        <span
          v-if="showNavigation"
          class="flicking-arrow-next"
        />
        <div
          v-if="showNavigation"
          class="flicking-pagination"
        />
      </template>
    </Flicking>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import { AutoPlay, Arrow, Pagination } from '@egjs/flicking-plugins'
import '@egjs/vue3-flicking/dist/flicking.css'
import '@egjs/flicking-plugins/dist/arrow.css'
import '@egjs/flicking-plugins/dist/pagination.css'

const { width } = useWindowSize()

withDefaults(
  defineProps<{
    imageData: { title: string, url: string, route: string }[] | null | undefined,
    mainSliderTrigger?: boolean,
    showPagination?: boolean,
    showNavigation?: boolean
  }>(),
  {
    mainSliderTrigger: false,
    showPagination: true,
    showNavigation: true
  }
)

defineEmits([
  'open-dialog'
])

const plugin = [
  new AutoPlay({
    animationDuration: 1000,
    stopOnHover: true
  }),
  new Arrow(),
  // new Fade(),
  new Pagination({ type: 'scroll' })
]

const option = {
  panelsPerView: 3.5,
  noPanelStyleOverride: true,
  align: 'prev',
  inputType: ['touch', 'mouse'],
  circular: true,
  circularFallback: 'bound',
  deceleration: 0.01
}

watch(() => width.value, () => {
  if (width.value < 500) {
    option.panelsPerView = 1.5
  } else if (width.value < 1000) {
    option.panelsPerView = 2
  } else {
    option.panelsPerView = 4
  }
})

</script>
