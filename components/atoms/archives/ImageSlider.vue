<template>
  <div
    class="main-slider-section"
    :class="{'activate': props.innerArchiveTrigger}"
  >
    <client-only>
      <Carousel
        :items-to-show="sliderShowCount"
        :transition="1600"
        :autoplay="1800"
        :wrap-around="true"
        :touch-drag="touchDrag"
        :mouse-drag="mouseDrag"
      >
        <Slide
          v-for="item in props.imageData"
          :key="item.year"
        >
          <nuxt-link
            v-if="props.mainSliderTrigger"
            class="image-component"
            :to="item.route"
          >
            <nuxt-picture
              :src="item.url"
              width="360"
              height="300"
              format="webp"
              :img-attrs="{class: 'thumbnail'}"
              :alt="item.title"
            />
            <div class="text-group">
              <p class="title">
                {{ $t('archives.historyTitle') }}
              </p>
              <p class="subtitle">
                {{ item.year }}
              </p>
            </div>
          </nuxt-link>
          <div v-else class="image-component">
            <nuxt-picture
              :src="item.url"
              width="360"
              height="300"
              format="webp"
              :img-attrs="{class: 'thumbnail'}"
              :alt="item.title"
              @click="$emit('open-dialog', item)"
            />
          </div>
        </Slide>
        <template #addons="{ currentSlide, slidesCount }">
          <Navigation v-if="showNavigation">
            <template #next>
              <nuxt-img
                v-if="!currentSlide"
                :src="url('right_arrow.svg', 'assets', 'icon')"
                :width="10"
                :height="18"
              />
            </template>
            <template #prev>
              <nuxt-img
                v-if="currentSlide >= slidesCount"
                :src="url('left_arrow.svg', 'assets', 'icon')"
                :width="10"
                :height="18"
              />
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

const { width } = useWindowSize()
const { url } = useImageStorage()

const sliderShowCount = ref(0)

const props = withDefaults(
  defineProps<{
    imageData: SerializeObject[],
    touchDrag?: boolean,
    mouseDrag?: boolean,
    mainSliderTrigger?: boolean,
    innerArchiveTrigger?: boolean,
    showPagination?: boolean,
    showNavigation?: boolean
  }>(),
  {
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

watch(width, () => { handleResize(width.value) })

onMounted(() => {
  handleResize(width.value)
})

const handleResize = (width:number) => {
  const showCount = [1.5, 1.75, 2.5]
  const caseWidth = Math.min(Math.floor(width / 500), 2)
  sliderShowCount.value = showCount[caseWidth]
}

</script>
