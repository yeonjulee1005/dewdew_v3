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
            {{ titleLists.frontEndTitle }}
          </span>
          <div
            v-for="item in frontEndData"
            :key="item.title"
          >
            <MainSkillProgress :progress-data="item" />
          </div>
        </div>
        <div class="backend-list flex flex-column flex-justify-center mb-40">
          <span class="skill-title-text flex flex-column">
            {{ titleLists.backEndTitle }}
          </span>
          <div
            v-for="item in backEndData"
            :key="item.title"
          >
            <MainSkillProgress :progress-data="item" />
          </div>
        </div>
      </div>
      <div class="tools-list flex flex-column flex-justify-center mb-40">
        <span class="skill-title-text flex flex-column">
          {{ titleLists.toolsTitle }}
        </span>
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
const { stackLogoData } = storeToRefs(useStackStore())

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
  { title: 'Nuxt3', percent: 90, emoji: '🚀' },
  { title: 'Nuxt2', percent: 90, emoji: '🚀' },
  { title: 'Vue2/3', percent: 85, emoji: '🚀' },
  { title: 'Astro', percent: 25, emoji: '📖' },
  { title: 'React', percent: 25, emoji: '📖' },
  { title: 'Next.js', percent: 20, emoji: '📖' },
  { title: 'TypeScript', percent: 65, emoji: '💻' },
  { title: 'JavaScript', percent: 80, emoji: '🚀' },
  { title: 'SASS/SCSS', percent: 90, emoji: '🚀' },
  { title: 'element-plus', percent: 90, emoji: '🚀' },
  { title: 'Tailwind CSS', percent: 60, emoji: '🚀' },
  { title: 'HTML5', percent: 90, emoji: '🚀' },
  { title: 'CSS3', percent: 80, emoji: '🚀' },
  { title: 'bun', percent: 50, emoji: '💻' },
  { title: 'Swift', percent: 20, emoji: '📖' },
  { title: 'Flutter', percent: 25, emoji: '📖' }
]

const backEndData = [
  { title: 'Supabase', percent: 80, emoji: '🚀' },
  { title: 'Deno', percent: 10, emoji: '📖' },
  { title: 'Docker', percent: 10, emoji: '💻' },
  { title: 'Kubernetes', percent: 5, emoji: '📖' },
  { title: 'Express', percent: 60, emoji: '💻' },
  { title: 'Node.js', percent: 60, emoji: '💻' },
  { title: 'PostgreSQL', percent: 50, emoji: '💻' },
  { title: 'Python', percent: 15, emoji: '📖' }
]

const toolsData = [
  { title: 'Vercel', percent: 100, emoji: '🚀' },
  { title: 'Amplitude', percent: 50, emoji: '💻' },
  { title: 'Azure', percent: 85, emoji: '🚀' },
  { title: 'Firebase', percent: 80, emoji: '🚀' },
  { title: 'VS Code', percent: 100, emoji: '🚀' },
  { title: 'Cursor', percent: 87, emoji: '🚀' },
  { title: 'Vim', percent: 75, emoji: '💻' },
  { title: 'GitHub', percent: 90, emoji: '🚀' },
  { title: 'Figma', percent: 80, emoji: '💻' },
  { title: 'Jira', percent: 90, emoji: '🚀' },
  { title: 'Slack', percent: 100, emoji: '🚀' },
  { title: 'Teams', percent: 90, emoji: '🚀' },
  { title: 'Postman', percent: 90, emoji: '🚀' },
  { title: 'Illustration', percent: 70, emoji: '💻' },
  { title: 'XD', percent: 80, emoji: '💻' },
  { title: 'Zeplin', percent: 65, emoji: '💻' }
]

</script>
