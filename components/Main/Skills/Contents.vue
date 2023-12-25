<template>
  <div class="main-skills flex flex-column">
    <MainSkillsDescriptions
      :skills-title="mainSkillTitle"
      :skills-first-text="mainSkillFirstText"
      :skills-second-text="mainSkillSecondText"
      :skills-third-text="mainSkillThirdText"
      :skills-text-trigger="skillsTextTrigger"
    />
    <MainSkillsImage
      :skills-image="stackLogoData"
      :skills-bg-trigger="skillsBgTrigger"
    />
    <div
      class="skill-list flex flex-row flex-space-evenly flex-align-center"
      :class="{'activate': skillsListTrigger}"
    >
      <div class="main-skill-list flex flex-column">
        <div class="frontend-list flex flex-column flex-justify-center mb-40">
          <span class="skill-title-text flex flex-column">
            {{ skillTitleList.frontEndTitle }}
          </span>
          <div
            v-for="item in frontEnd"
            :key="item.title"
          >
            <MainSkillsProgress :progress-data="item" />
          </div>
        </div>
        <div class="backend-list flex flex-column flex-justify-center mb-40">
          <span class="skill-title-text flex flex-column">
            {{ skillTitleList.backEndTitle }}
          </span>
          <div
            v-for="item in backEnd"
            :key="item.title"
          >
            <MainSkillsProgress :progress-data="item" />
          </div>
        </div>
      </div>
      <div class="tools-list flex flex-column flex-justify-center mb-40">
        <span class="skill-title-text flex flex-column">
          {{ skillTitleList.toolsTitle }}
        </span>
        <div
          v-for="item in devOps"
          :key="item.title"
        >
          <MainSkillsProgress :progress-data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { mainSkillTitle, mainSkillFirstText, mainSkillSecondText, mainSkillThirdText } = storeToRefs(useMainStore())
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
