<template>
  <div class="main-skills flex flex-column">
    <MainSkillsDescriptions
      :skills-title="mainSkillTitle"
      :skills-first-text="mainSkillFirstText"
      :skills-second-text="mainSkillSecondText"
      :skills-third-text="mainSkillThirdText"
      :skills-text-trigger="skillsTextTrigger"
    />
    <MainSkillsImage :skills-bg-trigger="skillsBgTrigger" />
    <div
      class="skill-list flex flex-row flex-space-evenly flex-align-center"
      :class="{'activate': skillsListTrigger}"
    >
      <div class="main-skill-list flex flex-column">
        <div class="frontend-list flex flex-column flex-justify-center mb-40">
          <div class="skill-title-text flex flex-column">
            {{ titleLists.frontEndTitle }}
          </div>
          <div
            v-for="item in frontEndData"
            :key="item.title"
          >
            <MainSkillProgress :progress-data="item" />
          </div>
        </div>
        <div class="backend-list flex flex-column flex-justify-center mb-40">
          <div class="skill-title-text flex flex-column">
            {{ titleLists.backEndTitle }}
          </div>
          <div
            v-for="item in backEndData"
            :key="item.title"
          >
            <MainSkillProgress :progress-data="item" />
          </div>
        </div>
      </div>
      <div class="tools-list flex flex-column flex-justify-center mb-40">
        <div class="skill-title-text flex flex-column">
          {{ titleLists.toolsTitle }}
        </div>
        <div
          v-for="item in toolsData"
          :key="item.title"
        >
          <MainSkillProgress :progress-data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { mainSkillTitle, mainSkillFirstText, mainSkillSecondText, mainSkillThirdText } = storeToRefs(useMainStore())

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

const titleLists = {
  frontEndTitle: 'FE Skills',
  backEndTitle: 'BE Skills',
  toolsTitle: 'Tools'
}

const frontEndData = [
  { title: 'Nuxt3', duration: 8, percent: 90, percentText: '⚙️ 90%', color: 'hsla(0, 93.1%, 71.8%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Nuxt2', duration: 8, percent: 90, percentText: '⚙️ 90%', color: 'hsla(10.1, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Vue2/3', duration: 11, percent: 85, percentText: '⚙️ 85%', color: 'hsla(30, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'TypeScript', duration: 5, percent: 65, percentText: '⚙️ 65%', color: 'hsla(44.8, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'JavaScript', duration: 8, percent: 80, percentText: '⚙️ 80%', color: 'hsla(60, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'SASS/SCSS', duration: 7, percent: 90, percentText: '⚙️ 90%', color: 'hsla(79.9, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'HTML5', duration: 6, percent: 100, percentText: '⚙️ 100%', color: 'hsla(109.9, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'CSS3', duration: 10, percent: 100, percentText: '⚙️ 100%', color: 'hsla(140.2, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Swift', duration: 4, percent: 30, percentText: '⚙️ 30%', color: 'hsla(30, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Flutter', duration: 6, percent: 40, percentText: '⚙️ 40%', color: 'hsla(160.1, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' }
]

const backEndData = [
  { title: 'Supabase', duration: 6, percent: 80, percentText: '⚙️ 80%', color: 'hsla(240, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Node.js', duration: 7, percent: 60, percentText: '⚙️ 60%', color: 'hsla(180, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'PostgreSQL', duration: 8, percent: 70, percentText: '⚙️ 70%', color: 'hsla(199.9, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Python', duration: 10, percent: 60, percentText: '⚙️ 60%', color: 'hsla(219.8, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' }
]

const toolsData = [
  { title: 'Vercel', duration: 10, percent: 100, percentText: '⚙️ 100%', color: 'hsla(140.2, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Amplitude', duration: 4, percent: 50, percentText: '⚙️ 50%', color: 'hsla(30, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Azure', duration: 6, percent: 85, percentText: '⚙️ 85%', color: 'hsla(240, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Firebase', duration: 11, percent: 80, percentText: '⚙️ 80%', color: 'hsla(260.2, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'VS Code', duration: 7, percent: 100, percentText: '⚙️ 100%', color: 'hsla(280.1, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Vim', duration: 10, percent: 95, percentText: '⚙️ 95%', color: 'hsla(300, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'GitHub', duration: 5, percent: 100, percentText: '⚙️ 100%', color: 'hsla(319.9, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Figma', duration: 6, percent: 60, percentText: '⚙️ 60%', color: 'hsla(109.9, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Jira', duration: 11, percent: 90, percentText: '⚙️ 100%', color: 'hsla(339.8, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Slack', duration: 6, percent: 100, percentText: '⚙️ 100%', color: 'hsla(109.9, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Teams', duration: 8, percent: 90, percentText: '⚙️ 90%', color: 'hsla(0, 93.1%, 71.8%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Postman', duration: 5, percent: 90, percentText: '⚙️ 90%', color: 'hsla(0, 91.2%, 64.3%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Illustration', duration: 7, percent: 100, percentText: '⚙️ 100%', color: 'hsla(338, 16%, 23%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'XD', duration: 10, percent: 100, percentText: '⚙️ 100%', color: 'hsla(154, 13%, 24%)', style: 'font-size: 20px; margin-right: 120px;' },
  { title: 'Zeplin', duration: 6, percent: 100, percentText: '⚙️ 100%', color: 'hsla(358, 11%, 55%)', style: 'font-size: 20px; margin-right: 120px;' }
]

</script>
