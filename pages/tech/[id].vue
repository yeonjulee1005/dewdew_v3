<template>
  <div class="tech-article flex flex-column items-center">
    <TechHeader
      :title="techDetailData?.title"
      :tags="techDetailData?.tags"
      :created-at="techDetailData?.created_at"
      :edit-trigger="editTrigger"
      @update:title="(title:string) => updateData.title = title"
      @update:tags="(tags:string) => updateData.tags = tags"
    />
    <TechAddOn
      :article-id="String(params.id)"
      :data="techDetailData"
      :estimate-read-time="estimateReadingTime(techDetailData.desc)"
      badge-size="sm"
      :activate-like="techBlogLikeTrigger"
      @update-count="updateLikeCount"
    />
    <TechControlButton
      v-if="adminAccess"
      :edit-trigger="editTrigger"
      @check:admin="clickEditArticle"
      @update:article="updateArticle"
      @edit:cancel="() => editTrigger = false"
    />
    <TechContent
      :tech-blog-detail-data="techDetailData"
      :edit-trigger="editTrigger"
      @update:article-content="editArticle"
    />
    <TechComments
      :comment-title="$t('tech.commentTitle')"
      :comment-data="techCommentData"
      @delete:admin-comment="deleteAdminComment"
      @delete:comment="deleteComment"
    />
    <LazyTechCreateComment @create-comment="createComment" />
    <TechLikeButton
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
const { path, params } = useRoute()

const { insertData, upsertData, deleteData } = useFetchComposable()

const { clickedTechArticle, adminAccess } = storeToRefs(useTechStore())

const { estimateReadingTime } = useUi()
const toast = useToast()

const techBlogLikeTrigger = ref(false)
const displayFloatButtonTrigger = ref(false)
const editTrigger = ref(false)

const { data: techDetailData, refresh: techRefresh }: SerializeObject = await useFetch('/api/tech/detail', {
  headers: useRequestHeaders(['cookie']),
  query: {
    techBlogId: params.id,
  },
  immediate: true,
  watch: [params],
})

const { data: techCommentData, refresh: techCommentRefresh }: SerializeObject = await useFetch('/api/tech/comment', {
  headers: useRequestHeaders(['cookie']),
  query: {
    techBlogId: params.id,
  },
  immediate: true,
  watch: [params],
})

const updateData = ref<SerializeObject>({
  ...techDetailData.value,
})

useHead({
  title: t('pageTitle.tech'),
  meta: [
    { property: 'keyword', content: techDetailData.value?.tags },
    { property: 'description', content: t('openGraph.tech') },
    { property: 'og:title', content: techDetailData.value?.title },
    { property: 'og:url', content: `https://www.dewdew.kr${path}` },
    { property: 'og:description', content: t('openGraph.tech') },
  ],
})

watch(() => y.value, () => {
  y.value
    ? displayFloatButtonTrigger.value = true
    : displayFloatButtonTrigger.value = false
})

const editArticle = (text: string, rawText: string) => {
  updateData.value.desc = text
  updateData.value.raw_article = rawText
  updateData.value.update_user_id = user.value?.id ?? ''
}

const updateViewCount = async () => {
  const countData: SerializeObject = {
    id: params.id,
    view_count: (techDetailData.value?.view_count ?? 0) + 1,
  }

  const error = await upsertData(countData, 'tech')

  if (!error) {
    techRefresh()
  }
}

const updateArticle = async () => {
  const error = await upsertData(updateData.value, 'tech')

  if (!error) {
    toast.add({ title: t('messages.edit'), color: 'emerald', timeout: 3000 })
    editTrigger.value = false
    techRefresh()
  }
}

const updateLikeCount = () => {
  const alreadyLike = clickedTechArticle.value.includes(techDetailData.value?.id ?? '')
  !alreadyLike
    ? updateTechBlogLikeCount()
    : toast.add({ title: t('messages.alreadyPressLike'), color: 'orange', timeout: 3000 })
}

const updateTechBlogLikeCount = async () => {
  const countData: SerializeObject = {
    id: params.id,
    like: parseInt(techDetailData.value?.like ?? '') + 1,
  }

  const error = await upsertData(countData, 'tech')

  if (!error) {
    toast.add({ title: t('messages.successPressLike'), color: 'emerald', timeout: 3000 })
    clickedTechArticle.value.push(techDetailData.value?.id ?? '')
    techRefresh()
  }
}

const createComment = async (commentData: CreateComment) => {
  const createCommentData: SerializeObject = {
    ...commentData,
    tech_id: params.id,
  }

  const error = await insertData(createCommentData, 'techComment')

  if (!error) {
    toast.add({ title: t('messages.successCreateComment'), color: 'emerald', timeout: 3000 })
    techCommentRefresh()
  }
}

const deleteAdminComment = async (comment: SerializeObject) => {
  const error = await deleteData(comment.id, 'techComment', true, 'tech_id', String(params.id), '', '')

  if (!error) {
    toast.add({ title: t('messages.deleteComment'), color: 'orange', timeout: 3000 })
    techCommentRefresh()
  }
}

const deleteComment = async (comment: SerializeObject, password: string) => {
  const error = await deleteData(comment.id, 'techComment', false, 'tech_id', String(params.id), 'password', password)

  if (!error) {
    toast.add({ title: t('messages.deleteComment'), color: 'orange', timeout: 3000 })
    techCommentRefresh()
  }
}

const clickEditArticle = () => {
  adminAccess.value
    ? editTrigger.value = true
    : toast.add({ title: t('messages.unAuthorizedWrite'), color: 'orange', timeout: 3000 })
}

updateViewCount()
</script>
