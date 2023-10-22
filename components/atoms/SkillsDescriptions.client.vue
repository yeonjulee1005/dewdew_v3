<template>
  <div
    class="skills-descriptions flex flex-column"
    :class="{'skills-descriptions-on': skillsTextTrigger}"
  >
    <span
      v-for="(item, index) in skillsTitle"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item.textTitle.textKo : item.textTitle.textEn }}
    </span>
    <span
      v-for="(item, index) in skillsFirstText"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item.textTitle.textKo : item.textTitle.textEn }}
    </span>
    <span
      v-for="(item, index) in skillsSecondText"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item.textTitle.textKo : item.textTitle.textEn }}
    </span>
    <span
      v-for="(item, index) in skillsThirdText"
      :key="index"
      class="skills-text"
    >
      {{ locale === 'ko' ? item.textTitle.textKo : item.textTitle.textEn }}
    </span>
    <div class="skills-title-box" />
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

const data = withDefaults(
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

console.log(data.skillsTitle)
console.log(data.skillsFirstText)
console.log(data.skillsSecondText)
console.log(data.skillsThirdText)

</script>
