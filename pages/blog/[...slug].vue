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
          v-for="(link, index) of reverseNavigation(navigation[0]?.children)"
          v-show="index < 5 && link._path !== '/blog'"
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
          class="w-full mb-20 break-keep"
          :value="doc"
        />
        <Giscus
          v-if="doc._path !== '/blog'"
          id="comments"
          repo="yeonjulee1005/dewdew_v3"
          repo-id="R_kgDOKjJUyA"
          category="Blog"
          category-id="DIC_kwDOKjJUyM4Cc6rs"
          mapping="pathname"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="top"
          theme="transparent_dark"
          lang="ko"
          loading="lazy"
          crossorigin="anonymous"
          async
        />
      </div>
    </ContentDoc>
  </DDContainer>
</template>

<script setup lang="ts">
import Giscus from '@giscus/vue'
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const { t } = useLocale()
const { path } = useRoute()

const blogQuery = queryContent('blog')

const reverseNavigation = (children: NavItem[] | undefined) => {
  if (!children) {
    return []
  }
  return [...children].reverse()
}

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
