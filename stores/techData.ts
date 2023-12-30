import { defineStore } from 'pinia'

export const useTechStore = defineStore('techStoreData', () => {
  /**
   * ! Pinia State !
   *
   * @param currentPage 현재 페이지
   * @param currentPageSize 현재 페이지 사이즈
   * @param clickedTechArticle 좋아요 누른 태크 블로그 글
   * @param adminAccess 권한
   *
   */

  const currentPage = ref<number>(1)
  const currentPageSize = ref<number>(4)
  const clickedTechArticle = ref<string[]>([])
  const adminAccess = ref<boolean>(false)

  return {
    currentPage,
    currentPageSize,
    clickedTechArticle,
    adminAccess
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
