<template>
  <div class="blog-article flex flex-column flex-align-center">
    <ArticleHeader
      :data="blogDetailData"
    />
    <ArticleAddOn
      :article-id="String(blogId)"
      :data="blogDetailData"
      :activate-like="blogLikeTrigger"
      @update-count="updateLikeCount"
    />
    <div
      v-dompurify-html="blogDetailData.desc"
      class="article-body gap-10"
    />
    <ArticleComments
      :comment-title="$t('blog.commentTitle')"
      :comment-data="blogCommentData"
      :empty-text="$t('messages.emptyComment')"
      @delete:admin-comment="deleteAdminComment"
      @delete:comment="deleteComment"
    />
    <ArticleCreateComment
      @create-comment="createComment"
    />
    <ArticleLikeButton
      :trigger="displayFloatButtonTrigger"
      :activate-like="blogLikeTrigger"
      @click-affix="updateLikeCount"
    />
    <el-backtop
      :bottom="90"
      :right="36"
    />
  </div>
</template>

<script setup lang="ts">

const client = useSupabaseClient()
const { y } = useWindowScroll()

const { t } = useLocale()

const { loadBlogData, loadBlogCommentData } = useLoadComposable()
const { clickedBlogArticle, updateLikeHistory } = useBlogLikeStore()

const { path, params } = useRoute()
const { notify } = useAlarm()

const blogId = params.id as string

const { data: blogDetailData, refresh: blogRefresh }:SerializeObject = await loadBlogData(blogId)
const { data: blogCommentData, refresh: blogCommentRefresh }:SerializeObject = await loadBlogCommentData(blogId)

useHead({
  title: t('pageTitle.blog'),
  meta: [
    { property: 'description', content: blogDetailData.value.desc },
    { property: 'og:title', content: blogDetailData.value.title },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` },
    { property: 'og:description', content: blogDetailData.value.desc }
  ]
})

definePageMeta({
  pageTransition: false
})

const blogLikeTrigger = ref(false)
const displayFloatButtonTrigger = ref(false)

watch(y, () => {
  y.value
    ? displayFloatButtonTrigger.value = true
    : displayFloatButtonTrigger.value = false
})

const updateLikeCount = () => {
  const alreadyLike = clickedBlogArticle.includes(blogDetailData.value.id)
  if (!alreadyLike) {
    updateBlogLikeCount()
    updateLikeHistory(blogDetailData.value.id)
    notify('', 'error', t('messages.successPressLike'), true, 1000, 0)
  } else {
    notify('', 'error', t('messages.alreadyPressLike'), true, 1000, 0)
  }
}

const updateBlogLikeCount = async () => {
  const countData:SerializeObject = {
    id: blogId,
    like: parseInt(blogDetailData.value.like) + 1
  }
  const { error } = await client
    .from('blog')
    .upsert(countData)

  if (!error) {
    blogRefresh()
  }
}

const createComment = async (commentData:CreateComment) => {
  const createCommentData:SerializeObject = {
    ...commentData,
    blog_id: blogId
  }
  const { error } = await client
    .from('blogComment')
    .insert(createCommentData)

  if (!error) {
    notify('', 'error', t('messages.successCreateComment'), true, 1000, 0)
    blogCommentRefresh()
  }
}

const deleteAdminComment = async (comment:SerializeObject) => {
  const { error } = await client
    .from('blogComment')
    .delete()
    .eq('id', comment.id)
    .eq('blog_id', blogId)

  if (!error) {
    notify('', 'error', t('messages.deleteComment'), true, 1000, 0)
    blogCommentRefresh()
  }
}

const deleteComment = async (comment:SerializeObject, password:string) => {
  const { error } = await client
    .from('blogComment')
    .delete()
    .eq('id', comment.id)
    .eq('blog_id', blogId)
    .eq('password', password)

  if (!error) {
    notify('', 'error', t('messages.deleteComment'), true, 1000, 0)
    blogCommentRefresh()
  }
}

</script>
