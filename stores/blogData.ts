import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blogData', () => {
  /**
   * ! Pinia State !
   *
   * @param blogList 블로그 글 리스트 데이터
   * @param blogCommentList 블로그 댓글 리스트 데이터
   * @param clickedBlogArticle 좋아요 누른 블로그 글
   * @param accessWrite 권한
   *
   */

  const blogList = ref<SerializeObject[]>([])
  const blogCommentList = ref<SerializeObject[]>([])
  const clickedBlogArticle = ref<string[]>([])
  const accessWrite = ref<boolean>(false)

  /**
   * ! Pinia Actions !
   */

  const updateBlogList = (data: SerializeObject[]) => {
    blogList.value = data
  }

  const updateBlogCommentList = (data: SerializeObject[]) => {
    blogCommentList.value = data
  }

  const updateLikeHistory = (blogId:string|undefined) => {
    blogId
      ? clickedBlogArticle.value.push(blogId)
      : clickedBlogArticle.value = []
  }

  const updateAccessWrite = (access:boolean) => {
    accessWrite.value = access
  }

  return {
    blogList,
    blogCommentList,
    clickedBlogArticle,
    accessWrite,
    updateBlogList,
    updateBlogCommentList,
    updateLikeHistory,
    updateAccessWrite
  }
}, {
  persist: true
})
