<template>
  <div class="blog-lists flex flex-column flex-justify-center flex-align-center">
    <div class="write-button-container flex flex-justify-end">
      <el-button
        class="write-blog"
        @click="openCreateArticleDialog"
      >
        {{ $t('texts.write') }}
      </el-button>
    </div>
    <el-timeline
      v-if="blogData.length"
      class="blog-timeline"
    >
      <el-timeline-item
        v-for="item in blogData"
        :key="item.index"
        center
        :timestamp="item.timeAgo"
        :color="item.like > 10 ? '#C74436' : '#D3E3D2'"
        placement="top"
        @click="() => navigateTo(`/blog/${item.id}`)"
      >
        <LazyCardComponent
          :card-item="item"
        />
      </el-timeline-item>
    </el-timeline>
    <el-empty
      v-else
      class="blog-timeline"
      :description="$t('messages.emptyArticle')"
    />
    <el-backtop
      target=".blog-lists"
      :bottom="120"
      :right="30"
    />
    <CreateArticleDialog
      :create-article-trigger="createArticleTrigger"
      :title="$t('messages.writeArticle')"
      @create-article="writeArticle"
      @close-dialog="closeCreateArticleDialog"
    />
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()
const client = useSupabaseClient()

const { t } = useLocale()

const { loadBlogData } = useLoadComposable()
const { notify } = useAlarm()

useHead({
  title: t('pageTitle.blog'),
  meta: [
    { property: 'description', content: t('openGraph.blogDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.archives') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/blog/' },
    { property: 'og:description', content: t('openGraph.blogDesc') }
  ]
})

definePageMeta({
  pageTransition: false,
  layout: 'default'
})

const createArticleTrigger = ref(false)

const { data: adminData }:SerializeObject = await useAsyncData('adminData', async () => {
  const { data, error } = await client.from('profiles')
    .select('*')
    .eq('id', String(user.value?.id))
    .single()

  if (error) {
    throw createError({ statusMessage: error.message })
  }
  return data
})

const openCreateArticleDialog = () => {
  adminData.value.admin
    ? createArticleTrigger.value = true
    : notify('', 'error', t('messages.unAuthorizedWrite'), true, 3000, 0)
}

const writeArticle = async (recordData:Artice) => {
  const articleData:SerializeObject = {
    update_user_id: user.value?.id,
    ...recordData
  }
  await client.from('blog')
    .upsert(articleData)
  await useFetch('/api/blog', {
    method: 'POST',
    body: articleData
  })
  createArticleTrigger.value = false
  notify('', 'success', t('messages.write'), true, 3000, 0)
  blogRefresh()
}

const closeCreateArticleDialog = () => {
  createArticleTrigger.value = false
}

const { data: blogData, refresh: blogRefresh } = await loadBlogData('')

console.log(blogData)

</script>
