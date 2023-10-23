<template>
  <div class="projects flex flex-column flex-justify-center flex-align-center">
    <nuxt-link
      v-for="(project, index) in subMenuData"
      :key="index"
      :to="project.url"
      :target="project.url.includes('https') ? '_blank' : '_self'"
      class="project-list mb-20"
    >
      {{ project.title }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()

const { subMenuData } = useMenuStore()

useHead({
  title: t('pageTitle.project'),
  meta: [
    { property: 'description', content: t('openGraph.projectDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.project') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/projects/' },
    { property: 'og:description', content: t('openGraph.projectDesc') }
  ]
})

</script>
