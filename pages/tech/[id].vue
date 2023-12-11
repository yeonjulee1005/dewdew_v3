<template>
  <div class="tech-article flex flex-column flex-align-center">
    <ArticleHeader
      :title="techDetailData.title"
      :created-at="techDetailData.created_at"
      :edit-trigger="editTrigger"
      @update:title="(title:string) => techDetailData.title = title"
    />
    <ArticleAddOn
      :article-id="String(techId)"
      :data="techDetailData"
      :activate-like="techBlogLikeTrigger"
      @update-count="updateLikeCount"
    />
    <ArticleControlButton
      :admin-access="adminAccess"
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
    <ArticleCreateComment @create-comment="createComment" />
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

const { adminAccess } = storeToRefs(useTechStore())
const { loadTechBlogDetailData, loadTechBlogCommentData } = useLoadComposable()

const { clickedTechArticle } = storeToRefs(useTechStore())

const { path, params } = useRoute()
const { notify } = useAlarm()

const techId = params.id as string

const { data: techDetailData, refresh: techRefresh }:SerializeObject = loadTechBlogDetailData(techId)
const { data: techCommentData, refresh: techCommentRefresh }:SerializeObject = loadTechBlogCommentData(techId)

const techBlogLikeTrigger = ref(false)
const displayFloatButtonTrigger = ref(false)
const editTrigger = ref(false)

useHead({
  title: t('pageTitle.tech'),
  meta: [
    { property: 'description', content: techDetailData.value.desc },
    { property: 'og:title', content: techDetailData.value.title },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` },
    { property: 'og:description', content: techDetailData.value.desc }
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
  techDetailData.value.desc = text
  techDetailData.value.raw_article = rawText
  techDetailData.value.update_user_id = user.value?.id ?? ''
}

const updateArticle = async () => {
  await client
    .from('tech')
    .upsert(techDetailData.value)

  editTrigger.value = false
  notify('', 'success', t('messages.edit'), true, 3000, 0)
  techRefresh()
}

const updateLikeCount = () => {
  const alreadyLike = clickedTechArticle.value.includes(techDetailData.value.id)
  if (!alreadyLike) {
    updateTechBlogLikeCount()
    clickedTechArticle.value.push(techDetailData.value.id)
    notify('', 'error', t('messages.successPressLike'), true, 1000, 0)
  } else {
    notify('', 'error', t('messages.alreadyPressLike'), true, 1000, 0)
  }
}

const updateTechBlogLikeCount = async () => {
  const countData:SerializeObject = {
    id: techId,
    like: parseInt(techDetailData.value.like) + 1
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
    tech_id: techId
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
    .eq('tech_id', techId)

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
    .eq('tech_id', techId)
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
