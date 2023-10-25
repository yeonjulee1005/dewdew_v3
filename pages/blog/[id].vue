<template>
  <div class="blog-article flex flex-column flex-align-center">
    <LazyArticleHeader
      :data="articleData"
    />
    <LazyArticleAddOn
      :article-id="String(articleId)"
      :data="articleData"
      :activate-like="articleLikeTrigger"
      @update-count="updateLikeCount"
    />
    <div
      v-dompurify-html="articleData.desc"
      class="article-body mt-default"
    />
    <LazyArticleComments
      :comment-title="$t('blog.commentTitle')"
      :comment-data="commentList"
      @delete-comment="deleteComment"
    />
    <LazyArticleCreateComment
      @create-comment="createComment"
    />
    <LazyArticleLikeButton
      :trigger="displayFloatButtonTrigger"
      :activate-like="articleLikeTrigger"
      @click-affix="updateLikeCount"
    />
    <el-backtop
      :bottom="120"
      :right="30"
    />
  </div>
</template>

<script setup lang="ts">

// const { t } = useLocale()

// const { y } = useWindowScroll()
// const route = useRoute()
const articleId = useRoute().params.id

const articleData = ref<SerializeObject>()
const commentList = ref<SerializeObject[]>([])

const articleLikeTrigger = ref(false)

const updateLikeCount = () => {
  console.log('updateLikeCount')
}

const deleteComment = (comment:SerializeObject) => {
  console.log(comment)
  console.log('코멘트 지우기')
}

const createComment = (commentData:CreateComment) => {
  console.log(commentData)
}

// useHead({
//   title: 'Article',
//   meta: [
//     { property: 'description', content: articleData.value.desc },
//     { property: 'og:title', content: articleData.value.title },
//     { property: 'og:url', content: `https://dewdew.kr${route.path}` },
//     { property: 'og:description', content: articleData.value.desc }
//   ]
// })

// definePageMeta({
//   pageTransition: false,
//   layout: 'default'
// })

// const commentList = ref<CommentList[]>([])
// const deleteCommentData = ref<CommentList>()
const displayFloatButtonTrigger = ref(false)
// const deleteConfirmTrigger = ref(false)
// const beforeParsingLike = ref('')
// const articleLike = ref()
// const writeIndex = ref(0)

// watch(y, () => {
//   y.value
//     ? displayFloatButtonTrigger.value = true
//     : displayFloatButtonTrigger.value = false
// })

// const initArticleConfig = async () => {
//   if (process.client) {
//     await getStorage(articleId)
//       ? updateLikeData()
//       : createLikeData()
//     loadArticleData()
//   }
// }

// const updateLikeCount = async () => {
//   const updateData = {
//     method: 'increment',
//     root: 'like',
//     id: articleId,
//     data: 0
//   }
//   articleLike.value.trigger
//     ? updateData.data = -1
//     : updateData.data = 1
//   await useApi().postUpdateData('blog', updateData).then(() => {
//     useAlarm().notify('', !articleLike.value.trigger ? 'success' : 'error', '❤️', true, 1000, 0)
//     articleLike.value.trigger
//       ? setStorage(articleId, false)
//       : setStorage(articleId, true)
//     initArticleConfig()
//     loadArticleData()
//   })
// }

// const createComment = (comment:CreateComment) => {
//   const commentData = {
//     ...comment,
//     index: writeIndex.value
//   }
//   const updateData = {
//     method: 'addArray',
//     root: 'comment',
//     id: articleId,
//     data: commentData
//   }
//   useApi().postUpdateData('blog', updateData).then(() => {
//     useAlarm().notify('', 'success', t('messages.commentWriteSuccess'), true, 1000, 0)
//     initArticleConfig()
//     loadArticleData()
//   })
// }

// const openDeleteConfirmDialog = (comment:CommentList) => {
//   deleteCommentData.value = comment
//   deleteConfirmTrigger.value = true
// }

// const deleteComment = (password:string) => {
//   deleteCommentData.value?.password === password
//     ? deleteSequence(deleteCommentData.value.index)
//     : rejectDeleteSequence()
// }

// const deleteSequence = (commentIndex:number) => {
//   const copyComment = Object.assign([], commentList.value)
//   const removeComment = copyComment.filter((comment:any) => { return comment.index !== commentIndex })
//   const updateData = {
//     method: 'addObject',
//     root: 'comment',
//     id: articleId,
//     data: removeComment
//   }
//   useApi().postUpdateData('blog', updateData).then(() => {
//     useAlarm().notify('', 'success', t('messages.commentDelete'), true, 1000, 0)
//     initArticleConfig()
//     loadArticleData()
//   })
// }

// const rejectDeleteSequence = () => {
//   closeAuthCheckDialog()
//   useAlarm().notify('', 'error', t('messages.unAuthorizedComment'), true, 1000, 0)
// }

// const closeAuthCheckDialog = () => {
//   deleteConfirmTrigger.value = false
// }

// const loadArticleData = () => {
//   useApi().getSingleData('blog', 'client').then((res:any) => {
//     commentList.value = []
//     res.forEach((blog:BlogData) => {
//       if (blog.id === articleId) {
//         articleData.value.title = blog.title
//         articleData.value.desc = blog.desc
//         articleData.value.like = blog.like
//         articleData.value.createdAt = new Date(blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000).toLocaleString('ko-KR', { timeZone: 'UTC' })
//         blog.comment.forEach((comment:CommentList) => {
//           const commentData:CommentList = {
//             ...comment,
//             timeAgo: useTimeAgo(new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)),
//             createdDate: new Date(comment.createdAt.seconds * 1000 + comment.createdAt.nanoseconds / 1000000)
//           }
//           commentList.value.push(commentData)
//         })
//       }
//     })
//     writeIndex.value = commentList.value.length
//   })
// }

// const getStorage = (articleId:string|string[]) => {
//   return sessionStorage.getItem(String(articleId))
// }

// const setStorage = (articleId:string|string[], value:boolean) => {
//   sessionStorage.setItem(String(articleId), JSON.stringify({ id: articleId, trigger: value }))
// }

// const updateLikeData = () => {
//   beforeParsingLike.value = getStorage(articleId) ?? ''
//   articleLike.value = JSON.parse(beforeParsingLike.value)
// }

// const createLikeData = () => {
//   setStorage(articleId, false)
//   updateLikeData()
// }

// initArticleConfig()

</script>
