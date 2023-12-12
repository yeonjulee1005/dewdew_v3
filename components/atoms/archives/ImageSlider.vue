<template>
  <div
    class="main-slider-section"
    :class="{'activate': props.innerArchiveTrigger}"
  >
    <client-only>
      <Carousel
        warap-around
        :transition="1400"
        :autoplay="2400"
        :wrap-around="true"
        :breakpoints="breakPoints"
        :touch-drag="touchDrag"
        :mouse-drag="mouseDrag"
      >
        <Slide
          v-for="(image, index) in imageData"
          :key="index"
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
              @click="mainSliderTrigger ? navigateTo(`/archives/${image?.title ?? ''}`) : $emit('open-dialog', image)"
            />
            <div
              v-if="mainSliderTrigger"
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
        </Slide>
        <template #addons>
          <Navigation v-if="showNavigation">
            <template #next>
              <nuxt-img :src="url('right_arrow.svg', 'assets', 'icon')" />
            </template>
            <template #prev>
              <nuxt-img :src="url('left_arrow.svg', 'assets', 'icon')" />
            </template>
          </Navigation>
          <Pagination v-if="showPagination" />
        </template>
      </Carousel>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const { url } = useImageStorage()

const props = withDefaults(
  defineProps<{
    imageData: { title: string, url: string, route: string }[] | null | undefined,
    desktopShowItemCount?: number,
    tabletShowItemCount?: number,
    mobileShowItemCount?: number,
    touchDrag?: boolean,
    mouseDrag?: boolean,
    mainSliderTrigger?: boolean,
    innerArchiveTrigger?: boolean,
    showPagination?: boolean,
    showNavigation?: boolean
  }>(),
  {
    desktopShowItemCount: 4,
    tabletShowItemCount: 2,
    mobileShowItemCount: 1,
    touchDrag: true,
    mouseDrag: true,
    mainSliderTrigger: false,
    innerArchiveTrigger: false,
    showPagination: true,
    showNavigation: true
  }
)

defineEmits([
  'open-dialog'
])

const breakPoints = {
  1000: {
    itemsToShow: props.desktopShowItemCount,
    snapAlign: 'start'
  },
  500: {
    itemsToShow: props.tabletShowItemCount,
    snapAlign: 'start'
  },
  250: {
    itemsToShow: props.mobileShowItemCount,
    snapAlign: 'start'
  }
}

</script>
