<template>
  <div class="main-skills flex flex-column">
    <LazyMainSkillsDescriptions :skills-text-trigger="skillsTextTrigger" />
    <MainSkillsImage
      :skills-image="stackLogoData"
      :skills-bg-trigger="skillsBgTrigger"
    />
    <div
      class="skill-list flex flex-align-start"
      :class="{'activate': skillsListTrigger}"
    >
      <div class="frontend-list flex flex-column flex-justify-center">
        <span class="skill-title-text flex flex-column">
          {{ skillTitleList.frontEndTitle }}
        </span>
        <MainSkillsProgress
          v-for="item in frontEnd"
          :key="item.title"
          :progress-data="item"
        />
      </div>
      <div class="backend-list flex flex-column flex-justify-center">
        <span class="skill-title-text flex flex-column">
          {{ skillTitleList.backEndTitle }}
        </span>
        <MainSkillsProgress
          v-for="item in backEnd"
          :key="item.title"
          :progress-data="item"
        />
      </div>
      <div class="tools-list flex flex-column flex-justify-center">
        <span class="skill-title-text flex flex-column">
          {{ skillTitleList.toolsTitle }}
        </span>
        <MainSkillsProgress
          v-for="item in devOps"
          :key="item.title"
          :progress-data="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { stackLogoData } = storeToRefs(useStackStore())

const { skillTitleList, frontEnd, backEnd, devOps } = useSkillData()

withDefaults(
  defineProps<{
    skillsTextTrigger?: boolean,
    skillsBgTrigger?: boolean,
    skillsListTrigger?: boolean
  }>(),
  {
    skillsTextTrigger: false,
    skillsBgTrigger: false,
    skillsListTrigger: false
  }
)

</script>
