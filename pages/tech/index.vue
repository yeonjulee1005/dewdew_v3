<template>
  <div class="tech-lists flex flex-column flex-justify-center flex-align-center">
    <div class="write-button-container flex flex-justify-end">
      <ClientOnly>
        <AButton
          v-if="adminAccess"
          custom-class="write-tech-blog"
          button-size="lg"
          button-label="write-article"
          :button-text="$t('texts.write')"
          @click:button="openCreateArticleDialog"
        />
      </ClientOnly>
    </div>
    <LazyTechCardComponent
      v-for="(item, index) in techData"
      v-show="count"
      :key="index"
      :card-item="item"
      @click="() => navigateTo(`/tech/${item.id}`)"
    />
    <DDPagination
      v-model="currentPage"
      class="flex flex-justify-center m-4 pb-8"
      :active-button="{ variant: 'outline', color: 'violet' }"
      :inactive-button="{ color: 'gray' }"
      :page-count="currentPageSize"
      :total="count ?? 0"
      show-first
      show-last
    />
    <DDSkeleton
      v-show="!count"
      class="articles"
      :ui="{ rounded: 'rounded-fill'}"
    />
    <DialogCreateArticle
      :create-article-trigger="createArticleTrigger"
      @create:article="writeArticle"
      @close:dialog="() => createArticleTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()

const { t } = useLocale()

const { countData, upsertData } = useFetchComposable()

const { currentPage, currentPageSize, adminAccess } = storeToRefs(useTechStore())
const toast = useToast()

useHead({
  title: t('pageTitle.tech'),
  meta: [
    { property: 'description', content: t('openGraph.techDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.archives') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/tech/' },
    { property: 'og:description', content: t('openGraph.techDesc') }
  ]
})

const createArticleTrigger = ref(false)

const { data: techData, refresh: techRefresh } = useAsyncData('techData', async () => {
  const { data }: SerializeObject = await useFetch('/api/tech', {
    headers: useRequestHeaders(['cookie']),
    query: {
      page: currentPage.value,
      pageCount: currentPageSize.value
    },
    immediate: true,
    watch: [currentPage, currentPageSize]
  })

  return data.value
}, {
  watch: [currentPage, currentPageSize]
})

const { data: count } = useAsyncData('techCount', async () => {
  const data = await countData('tech')

  return data.count
})

const openCreateArticleDialog = () => {
  adminAccess.value
    ? createArticleTrigger.value = true
    : toast.add({ title: t('messages.unAuthorizedWrite'), color: 'rose', timeout: 3000 })
}

const writeArticle = async (recordData:Article) => {
  const articleData:SerializeObject = {
    update_user_id: user.value?.id,
    ...recordData
  }

  const error = await upsertData(articleData, 'tech')

  if (!error) {
    createArticleTrigger.value = false
    toast.add({ title: t('messages.write'), color: 'emerald', timeout: 3000 })
    techRefresh()
  }
}

</script>
