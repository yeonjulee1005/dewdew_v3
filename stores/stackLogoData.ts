import { defineStore } from 'pinia'

export const useStackStore = defineStore('stackData', () => {
  /**
   * ! Pinia State !
   *
   * @param stackLogoData 스택로고 데이터
   *
   */

  const stackLogoData = ref<Tables<'stackLogo'>[] | { orderIndex: {index: number | null} | null; title: string | null; url: string | null; deleted: boolean | null; }[] | null>()

  return {
    stackLogoData
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
