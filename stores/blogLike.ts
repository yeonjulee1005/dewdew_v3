import { defineStore } from 'pinia'

export const useBlogLikeStore = defineStore('BlogLikeData', () => {
  // const client = useSupabaseClient()
  /**
   * ! Pinia State !
   *
   * @param clickedBlogArticle 좋아요 누른 블로그 글
   *
   */

  const clickedBlogArticle = ref<string[]>([])

  /**
   * ! Pinia Actions !
   */

  const updateLikeHistory = (blogId:string|undefined) => {
    blogId
      ? clickedBlogArticle.value.push(blogId)
      : clickedBlogArticle.value = []
  }

  return {
    clickedBlogArticle,
    updateLikeHistory
  }
}, {
  persist: true
})
