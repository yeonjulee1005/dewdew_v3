<template>
  <DDContainer class="content-container flex gap-4">
    <ContentNavigation
      v-slot="{ navigation }"
      :query="blogQuery"
    >
      <div class="content-navigation flex flex-column gap-2 mt-20">
        <span class="navigation-title">
          {{ $t('blog.recentPost') }}
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
    <ContentDoc
      v-slot="{ doc }"
      head
    >
      <div class="flex flex-column flex-align-end w-full">
        <ANuxtDate
          v-if="doc.date"
          :date-time="doc.date"
        />
        <ContentRenderer
          class="w-full"
          :value="doc"
        />
      </div>
    </ContentDoc>
  </DDContainer>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { path } = useRoute()

const blogQuery = queryContent('blog')

useHead({
  title: t('pageTitle.blog'),
  meta: [
    { property: 'description', content: t('openGraph.blog') },
    { property: 'og:title', content: t('pageTitle.blog') },
    { property: 'og:description', content: t('openGraph.blog') },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` }
  ]
})

</script>
