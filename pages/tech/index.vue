<template>
  <div class="tech-lists flex flex-column flex-justify-center flex-align-center">
    <div class="write-button-container flex flex-justify-end">
      <AButton
        v-if="adminAccess"
        custom-class="write-tech-blog"
        button-size="lg"
        button-label="write-article"
        :button-text="$t('texts.write')"
        @click:button="openCreateArticleDialog"
      />
    </div>
    <el-timeline
      v-if="techData?.count"
      class="tech-timeline"
    >
      <el-timeline-item
        v-for="item in techData.article"
        :key="item.id"
        center
        :color="item.like > 10 ? '#C74436' : '#D3E3D2'"
        placement="top"
        @click="() => navigateTo(`/tech/${item.id}`)"
      >
        <ANuxtTime
          :date-time="item.created_at"
          :full-date-time="false"
        />
        <LazyCardComponent :card-item="item" />
      </el-timeline-item>
      <DDPagination
        v-model="currentPage"
        class="flex flex-justify-center m-4 pb-8"
        :active-button="{ variant: 'outline', color: 'violet' }"
        :inactive-button="{ color: 'gray' }"
        :page-count="currentPageSize"
        :total="techData.count"
        show-first
        show-last
      />
    </el-timeline>
    <DDSkeleton
      v-else
      class="tech-timeline"
      :ui="{ rounded: 'rounded-fill'}"
    />
    <CreateArticleDialog
      :create-article-trigger="createArticleTrigger"
      @create:article="writeArticle"
      @close:dialog="() => createArticleTrigger = false"
    />
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()
const client = useSupabaseClient()

const { t } = useLocale()

const { adminAccess } = storeToRefs(useTechStore())
const { notify } = useAlarm()

useHead({
  title: t('pageTitle.tech'),
  meta: [
    { property: 'description', content: t('openGraph.techDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.archives') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/tech/' },
    { property: 'og:description', content: t('openGraph.techDesc') }
  ]
})

const currentPage = ref(1)
const currentPageSize = ref(2)

const createArticleTrigger = ref(false)

const supabasePageCalc = (page:number, pageCount:number, firstRange:boolean): number => {
  return firstRange
    ? (page - 1) * pageCount
    : (page * pageCount) - 1
}

const { data: techData, refresh: techRefresh } = useAsyncData('techData', async () => {
  const { data, error } = await client
    .from('tech')
    .select('id, title, desc, raw_article, like, update_user_id, created_at, updated_at, deleted')
    .eq('deleted', false)
    .order('created_at', { ascending: false })
    .range(supabasePageCalc(currentPage.value, currentPageSize.value, true), supabasePageCalc(currentPage.value, currentPageSize.value, false))

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  const { count, error: countError } = await client
    .from('tech')
    .select('*', { count: 'exact' })

  if (countError) {
    throw createError({ statusMessage: countError.message })
  }

  return { article: data, count }
}, {
  watch: [currentPage, currentPageSize]
})

const openCreateArticleDialog = () => {
  adminAccess.value
    ? createArticleTrigger.value = true
    : notify('', 'error', t('messages.unAuthorizedWrite'), true, 3000, 0)
}

const writeArticle = async (recordData:Article) => {
  const articleData:SerializeObject = {
    update_user_id: user.value?.id,
    ...recordData
  }
  await client
    .from('tech')
    .upsert(articleData)

  createArticleTrigger.value = false
  notify('', 'success', t('messages.write'), true, 3000, 0)
  techRefresh()
}

</script>
