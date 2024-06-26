<template>
  <div class="tech-lists flex flex-column justify-center items-center">
    <div class="write-button-container flex justify-end">
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
      :key="index"
      :pending-data="pendingTechData"
      :card-item="item"
      @click="() => navigateTo(`/tech/${item.id}`)"
    />
    <DDPagination
      v-model="currentPage"
      class="flex justify-center m-4 pb-8"
      :active-button="{ variant: 'ghost', color: 'indigo' }"
      :inactive-button="{ variant: 'ghost', color: 'orange' }"
      :prev-button="{ variant: 'ghost', color: 'orange' }"
      :next-button="{ variant: 'ghost', color: 'orange' }"
      :first-button="{ variant: 'ghost', color: 'orange' }"
      :last-button="{ variant: 'ghost', color: 'orange' }"
      :page-count="currentPageSize"
      :total="count ?? 0"
      show-first
      show-last
    />
    <DialogCreateArticle
      v-model:dialog-trigger="createArticleTrigger"
      @create:article="writeArticle"
      @close:dialog="() => createArticleTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

const { t } = useLocale()
const { path, query } = useRoute()
const router = useRouter()

const { countData, upsertData } = useFetchComposable()

const { adminAccess } = storeToRefs(useTechStore())
const toast = useToast()

useHead({
  title: t('pageTitle.tech'),
  meta: [
    { property: 'description', content: t('openGraph.tech') },
    { property: 'og:title', content: t('pageTitle.tech') },
    { property: 'og:description', content: t('openGraph.tech') },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` },
  ],
})

const currentPage = ref(1)
const currentPageSize = ref(4)

currentPage.value = parseInt(query.page as string)
currentPageSize.value = parseInt(query.count as string)

const createArticleTrigger = ref(false)

watch(() => currentPage.value, () => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      page: currentPage.value,
    },
  })
}, {
  immediate: true,
})

const { data: techData, refresh: techRefresh, pending: pendingTechData } = useAsyncData('techData', async () => {
  const { data }: SerializeObject = await useFetch('/api/tech', {
    headers: useRequestHeaders(['cookie']),
    query: {
      page: currentPage.value,
      pageCount: currentPageSize.value,
    },
  })

  return data.value
}, {
  immediate: true,
  watch: [currentPage, currentPageSize],
})

const { data: count } = useAsyncData('techCount', async () => {
  const data = await countData('tech')

  return data.count
}, {
  immediate: true,
})

const openCreateArticleDialog = () => {
  adminAccess.value
    ? createArticleTrigger.value = true
    : toast.add({ title: t('messages.unAuthorizedWrite'), color: 'orange', timeout: 3000 })
}

const writeArticle = async (recordData: Article) => {
  const articleData: SerializeObject = {
    update_user_id: user.value?.id,
    ...recordData,
  }

  const error = await upsertData(articleData, 'tech')

  if (!error) {
    createArticleTrigger.value = false
    toast.add({ title: t('messages.write'), color: 'emerald', timeout: 3000 })
    techRefresh()
  }
}
</script>
