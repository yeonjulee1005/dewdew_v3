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
      @delete:admin-comment="deleteAdminComment"
      @delete:comment="deleteComment"
    />
    <LazyArticleCreateComment @create-comment="createComment" />
    <ArticleLikeButton
      :trigger="displayFloatButtonTrigger"
      :activate-like="techBlogLikeTrigger"
      @click-affix="updateLikeCount"
    />
  </div>
</template>

<script setup lang="ts">

const user = useSupabaseUser()
const { y } = useWindowScroll()

const { t } = useLocale()

const { insertData, upsertData, deleteData } = useFetchComposable()

const { clickedTechArticle, adminAccess } = storeToRefs(useTechStore())

const { path, params } = useRoute()
const { notify } = useAlarm()

const techId = computed(() => {
  return params.id as string
})

const techBlogLikeTrigger = ref(false)
const displayFloatButtonTrigger = ref(false)
const editTrigger = ref(false)

const { data: techDetailData, refresh: techRefresh }: SerializeObject = await useFetch('/api/tech/detail', {
  headers: useRequestHeaders(['cookie']),
  query: {
    techBlogId: techId.value
  },
  immediate: true
})

const { data: techCommentData, refresh: techCommentRefresh }: SerializeObject = await useFetch('/api/tech/comment', {
  headers: useRequestHeaders(['cookie']),
  query: {
    techBlogId: techId.value
  },
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

const updateViewCount = async () => {
  const countData:SerializeObject = {
    id: techId.value,
    view_count: (techDetailData.value?.view_count ?? 0) + 1
  }

  const error = await upsertData(countData, 'tech')

  if (!error) {
    techRefresh()
  }
}

const updateArticle = async () => {
  const error = await upsertData(updateData.value, 'tech')

  if (!error) {
    notify('', 'success', t('messages.edit'), true, 3000, 0)
    editTrigger.value = false
    techRefresh()
  }
}

const updateLikeCount = () => {
  const alreadyLike = clickedTechArticle.value.includes(techDetailData.value?.id ?? '')
  !alreadyLike
    ? updateTechBlogLikeCount()
    : notify('', 'warning', t('messages.alreadyPressLike'), true, 1000, 0)
}

const updateTechBlogLikeCount = async () => {
  const countData:SerializeObject = {
    id: techId.value,
    like: parseInt(techDetailData.value?.like ?? '') + 1
  }

  const error = await upsertData(countData, 'tech')

  if (!error) {
    notify('', 'success', t('messages.successPressLike'), true, 1000, 0)
    clickedTechArticle.value.push(techDetailData.value?.id ?? '')
    techRefresh()
  }
}

const createComment = async (commentData:CreateComment) => {
  const createCommentData:SerializeObject = {
    ...commentData,
    tech_id: techId.value
  }

  const error = await insertData(createCommentData, 'techComment')

  if (!error) {
    notify('', 'error', t('messages.successCreateComment'), true, 1000, 0)
    techCommentRefresh()
  }
}

const deleteAdminComment = async (comment:SerializeObject) => {
  const error = await deleteData(comment.id, 'techComment', true, 'tech_id', techId.value, '', '')

  if (!error) {
    notify('', 'error', t('messages.deleteComment'), true, 1000, 0)
    techCommentRefresh()
  }
}

const deleteComment = async (comment:SerializeObject, password:string) => {
  const error = await deleteData(comment.id, 'techComment', false, 'tech_id', techId.value, 'password', password)

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

updateViewCount()

</script>
