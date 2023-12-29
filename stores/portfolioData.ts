import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolioData', () => {
  /**
   * ! Pinia State !
   *
   * @param portfolioData 포트폴리오 데이터
   * @param selectedPortfolioData 선택된 포트폴리오 데이터
   *
   */

  const portfolioData = ref<{ orderIndex: {index: number }, title: { ko: string, en: string}, description: { ko: string, en: string}, url: string, image: string, thumbnail: string, alt: string, deleted: boolean }[] | null>()
  const selectedPortfolioData = ref<{ orderIndex: {index: number }, title: { ko: string, en: string}, description: { ko: string, en: string}, url: string, image: string, thumbnail: string, alt: string, deleted: boolean } | null>()

  return {
    portfolioData,
    selectedPortfolioData
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
