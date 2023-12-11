import { defineStore } from 'pinia'

export const useStackStore = defineStore('stackData', () => {
  /**
   * ! Pinia State !
   *
   * @param stackLogoData 스택로고 데이터
   *
   */

  const stackLogoData = ref<SerializeObject>()

  return {
    stackLogoData
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
