import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolioData', () => {
  /**
   * ! Pinia State !
   *
   * @param portfolioData 포트폴리오 데이터
   *
   */

  const portfolioData = ref<Tables<'portfolio'>[] | { orderIndex: {index: number | null} | null; title: string | null; desc: string | null; url: string | null; image: string | null; thumbnail: string | null; alt: string | null; deleted: boolean | null; }[] | null>()

  return {
    portfolioData
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
