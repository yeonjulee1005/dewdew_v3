<template>
  <div
    class="skills-descriptions flex flex-column"
    :class="{'activate': skillsTextTrigger}"
  >
    <el-text
      v-for="(item, index) in skillsTitle"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item?.textTitle.textKo : item?.textTitle.textEn }}
    </el-text>
    <el-text
      v-for="(item, index) in skillsFirstText"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item?.textTitle.textKo : item?.textTitle.textEn }}
    </el-text>
    <el-text
      v-for="(item, index) in skillsSecondText"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item?.textTitle.textKo : item?.textTitle.textEn }}
    </el-text>
    <el-text
      v-for="(item, index) in skillsThirdText"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item?.textTitle.textKo : item?.textTitle.textEn }}
    </el-text>
    <div class="skills-title-box" />
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

withDefaults(
  defineProps<{
    skillsTitle: SerializeObject[],
    skillsFirstText: SerializeObject[],
    skillsSecondText: SerializeObject[],
    skillsThirdText: SerializeObject[],
    skillsTextTrigger?: boolean
  }>(),
  {
    skillsTextTrigger: false
  }
)

</script>
