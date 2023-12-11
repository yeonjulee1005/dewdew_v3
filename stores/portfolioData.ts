import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolioData', () => {
  /**
   * ! Pinia State !
   *
   * @param portfolioData 포트폴리오 데이터
   *
   */

  const portfolioData = ref<{ orderIndex: {index: number }, title: string, desc: string, url: string, image: string, thumbnail: string, alt: string, deleted: boolean }[] | null>()

  return {
    portfolioData
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
