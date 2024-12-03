<template>
  <div class="projects flex flex-column justify-center items-center">
    <nuxt-link
      v-for="(project, index) in subMenuData"
      :key="index"
      :to="project.url"
      :target="project.url.includes('https') ? '_blank' : '_self'"
      class="project-list mb-20 border-2 border-orange-700 dark:border-orange-500 hover:border-orange-500 dark:hover:border-orange-700 focus:border-orange-500 dark:focus:border-orange-700 transition-border duration-300"
    >
      {{ project.title }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()
const { path } = useRoute()

const { subMenuData } = storeToRefs(useMenuStore())

useHead({
  title: t('pageTitle.project'),
  meta: [
    { property: 'description', content: t('openGraph.project') },
    { property: 'og:title', content: t('pageTitle.project') },
    { property: 'og:description', content: t('openGraph.project') },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` },
  ],
})
</script>
