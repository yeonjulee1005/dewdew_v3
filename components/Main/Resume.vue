<template>
  <div
    class="main-resume flex flex-justify-center flex-align-center"
    :class="{'activate': mainResumeTrigger}"
  >
    <div class="resume-container flex p-10 gap-8">
      <div class="flex flex-column flex-align-center gap-8">
        <nuxt-img
          class="resume-image"
          :class="{'reverse': toggleTrigger}"
          :src="resumeImage"
          :height="360"
          :width="360"
          legacy-format="webp"
          loading="lazy"
          fit="cover"
          alt="dewdew"
          :draggable="false"
          @contextmenu.prevent
          @click="() => toggleTrigger = !toggleTrigger"
        />
        <div>
          <p
            v-for="(text, index) in $tm('main.resume.name')"
            :key="index"
            class="resume-title"
          >
            {{ $rt(text) }}
          </p>
        </div>
      </div>
      <AAccordion :accordion-items="locale === 'ko' ? resumeKoList : resumeEnList" />
    </div>
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

const { url } = useImageStorage()

const { resumeKoList, resumeEnList } = useResumeData()

const mainResumeTrigger = defineModel('mainResumeTrigger', {
  type: Boolean,
  default: false
})

const resumeImage = computed(() => {
  return toggleTrigger.value ? url('resume_img.webp', 'assets', 'banner') : url('resume_img_reverse.webp', 'assets', 'banner')
})

const toggleTrigger = ref(false)

</script>
