import { defineStore } from 'pinia'

export const useTechStore = defineStore('techStoreData', () => {
  /**
   * ! Pinia State !
   *
   * @param clickedTechArticle 좋아요 누른 태크 블로그 글
   * @param adminAccess 권한
   *
   */

  const clickedTechArticle = ref<string[]>([])
  const adminAccess = ref<boolean>(false)

  return {
    clickedTechArticle,
    adminAccess,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})
