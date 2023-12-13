import { defineStore } from 'pinia'

export const useStackStore = defineStore('stackData', () => {
  /**
   * ! Pinia State !
   *
   * @param stackLogoData 스택로고 데이터
   *
   */

  const stackLogoData = ref<{ orderIndex: { index: number }, title: string, url: string, deleted: boolean }[] | null>()

  return {
    stackLogoData
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
