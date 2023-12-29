<template>
  <DDContainer class="content-container flex gap-4">
    <ContentNavigation
      v-slot="{ navigation }"
      :query="blogQuery"
    >
      <div class="content-navigation flex flex-column gap-2 mt-20">
        <span class="navigation-title">
          {{ '최근 포스트' }}
        </span>
        <NuxtLink
          v-for="(link, index) of navigation[0].children"
          v-show="index < 5"
          :key="link._path"
          class="navigation-link"
          :to="link._path"
        >
          {{ link.navTitle || link.title }}
        </NuxtLink>
      </div>
    </ContentNavigation>
    <ContentDoc class="w-full" />
  </DDContainer>
</template>

<script setup lang="ts">

const { t } = useLocale()

const blogQuery = queryContent('blog')

useHead({
  title: t('pageTitle.blog'),
  meta: [
    { property: 'description', content: t('openGraph.blogDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.blog') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/tech/' },
    { property: 'og:description', content: t('openGraph.blogDesc') }
  ]
})

</script>
