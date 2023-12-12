<template>
  <div class="tech-article flex flex-column flex-align-center">
    <ArticleHeader
      :title="techDetailData?.title"
      :created-at="techDetailData?.created_at"
      :edit-trigger="editTrigger"
      @update:title="(title:string) => updateData.title = title"
    />
    <ArticleAddOn
      :article-id="techId"
      :data="techDetailData"
      :activate-like="techBlogLikeTrigger"
      @update-count="updateLikeCount"
    />
    <ArticleControlButton
      v-if="adminAccess"
      :edit-trigger="editTrigger"
      @check:admin="clickEditArticle"
      @update:article="updateArticle"
      @edit:cancel="() => editTrigger = false"
    />
    <ArticleContent
      :tech-blog-detail-data="techDetailData"
      :edit-trigger="editTrigger"
      @update:article-content="editArticle"
    />
    <ArticleComments
      :comment-title="$t('tech.commentTitle')"
      :comment-data="techCommentData"
      :empty-text="$t('messages.emptyComment')"
      @delete:admin-comment="deleteAdminComment"
      @delete:comment="deleteComment"
    />
    <LazyArticleCreateComment @create-comment="createComment" />
    <ArticleLikeButton
      :trigger="displayFloatButtonTrigger"
      :activate-like="techBlogLikeTrigger"
      @click-affix="updateLikeCount"
    />
    <el-backtop
      :bottom="90"
      :right="36"
    />
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()
const client = useSupabaseClient()
const { y } = useWindowScroll()

const { t } = useLocale()

const { loadTechBlogCommentData } = useLoadComposable()

const { clickedTechArticle, adminAccess } = storeToRefs(useTechStore())

const { path, params } = useRoute()
const { notify } = useAlarm()

const techId = computed(() => {
  return params.id as string
})

const { data: techCommentData, refresh: techCommentRefresh }:SerializeObject = loadTechBlogCommentData(techId.value)

const techBlogLikeTrigger = ref(false)
const displayFloatButtonTrigger = ref(false)
const editTrigger = ref(false)

const { data: techDetailData, refresh: techRefresh } = useAsyncData('blogDetailData', async () => {
  const { data, error } = await client
    .from('tech')
    .select('id, title, desc, raw_article, like, update_user_id, created_at, updated_at, deleted')
    .eq('id', techId.value)
    .eq('deleted', false)
    .single()

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
}, {
  immediate: true
})

const updateData = ref<SerializeObject>({
  ...techDetailData.value
})

useHead({
  title: t('pageTitle.tech'),
  meta: [
    { property: 'description', content: techDetailData.value?.desc },
    { property: 'og:title', content: techDetailData.value?.title },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` },
    { property: 'og:description', content: techDetailData.value?.desc }
  ]
})

definePageMeta({
  pageTransition: false
})

watch(() => y.value, () => {
  y.value
    ? displayFloatButtonTrigger.value = true
    : displayFloatButtonTrigger.value = false
})

const editArticle = (text:string, rawText:string) => {
  updateData.value.desc = text
  updateData.value.raw_article = rawText
  updateData.value.update_user_id = user.value?.id ?? ''
}

const updateArticle = async () => {
  await client
    .from('tech')
    .upsert(updateData.value)

  editTrigger.value = false
  notify('', 'success', t('messages.edit'), true, 3000, 0)
  techRefresh()
}

const updateLikeCount = () => {
  console.log(clickedTechArticle.value)
  const alreadyLike = clickedTechArticle.value.includes(techDetailData.value?.id ?? '')
  if (!alreadyLike) {
    updateTechBlogLikeCount()
    clickedTechArticle.value.push(techDetailData.value?.id ?? '')
    notify('', 'success', t('messages.successPressLike'), true, 1000, 0)
  } else {
    notify('', 'warning', t('messages.alreadyPressLike'), true, 1000, 0)
  }
}

const updateTechBlogLikeCount = async () => {
  const countData:SerializeObject = {
    id: techId.value,
    like: parseInt(techDetailData.value?.like ?? '') + 1
  }
  const { error } = await client
    .from('tech')
    .upsert(countData)

  if (!error) {
    techRefresh()
  }
}

const createComment = async (commentData:CreateComment) => {
  const createCommentData:SerializeObject = {
    ...commentData,
    tech_id: techId.value
  }
  const { error } = await client
    .from('techComment')
    .insert(createCommentData)

  if (!error) {
    notify('', 'error', t('messages.successCreateComment'), true, 1000, 0)
    techCommentRefresh()
  }
}

const deleteAdminComment = async (comment:SerializeObject) => {
  const { error } = await client
    .from('techComment')
    .delete()
    .eq('id', comment.id)
    .eq('tech_id', techId.value)

  if (!error) {
    notify('', 'error', t('messages.deleteComment'), true, 1000, 0)
    techCommentRefresh()
  }
}

const deleteComment = async (comment:SerializeObject, password:string) => {
  const { error } = await client
    .from('techComment')
    .delete()
    .eq('id', comment.id)
    .eq('tech_id', techId.value)
    .eq('password', password)

  if (!error) {
    notify('', 'error', t('messages.deleteComment'), true, 1000, 0)
    techCommentRefresh()
  }
}

const clickEditArticle = () => {
  adminAccess.value
    ? editTrigger.value = true
    : notify('', 'error', t('messages.unAuthorizedWrite'), true, 3000, 0)
}

</script>
