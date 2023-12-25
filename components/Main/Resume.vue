<template>
  <div
    class="main-resume flex flex-justify-center flex-align-center"
    :class="{'activate': mainResumeTrigger}"
  >
    <div class="resume-container flex flex-row">
      <nuxt-picture
        class="resume-image flex flex-justify-center flex-align-center"
        :src="url('resume_img.webp', 'assets', 'banner')"
        height="360"
        width="360"
        legacy-format="webp"
        loading="lazy"
        fit="cover"
        :img-attrs="{class: 'dewdew'}"
        alt="dewdew"
      />
      <div class="resume-texts flex flex-column flex-justify-center gap-10">
        <div class="title-container flex flex-column gap-10">
          <span class="title">
            {{ locale === 'ko' ? resumeTitle?.textTitle.ko : resumeTitle?.textTitle.en }}
          </span>
          <span class="educate">
            {{ locale === 'ko' ? educateText?.textTitle.ko : educateText?.textTitle.en }}
          </span>
        </div>
        <div
          v-for="career in careerData"
          :key="career.index"
          class="career-container flex flex-column"
        >
          <span class="career-title">
            {{ locale === 'ko' ? career?.textTitle.ko : career?.textTitle.en }}
          </span>
          <span class="career-desc">
            {{ locale === 'ko' ? career.textDescription.ko : career.textDescription.en }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

const { url } = useImageStorage()

withDefaults(
  defineProps<{
    resumeTitle: SerializeObject,
    educateText: SerializeObject,
    careerData: SerializeObject[],
    mainResumeTrigger?: boolean
  }>(),
  {
    mainResumeTrigger: false
  }
)

</script>
