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
          <el-text class="title">
            {{ locale === 'ko' ? resumeTitle.textTitle.textKo : resumeTitle.textTitle.textEn }}
          </el-text>
          <el-text class="educate">
            {{ locale === 'ko' ? educateText.textTitle.textKo : educateText.textTitle.textEn }}
          </el-text>
        </div>
        <div
          v-for="career in careerData"
          :key="career.index"
          class="career-container flex flex-column"
        >
          <el-text class="career-title">
            {{ locale === 'ko' ? career.textTitle.textKo : career.textTitle.textEn }}
          </el-text>
          <el-text class="career-desc">
            {{ locale === 'ko' ? career.textDescription.textKo : career.textDescription.textEn }}
          </el-text>
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
