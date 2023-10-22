import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolioData', () => {
  /**
   * ! Pinia State !
   *
   * @param portfolioData 포트폴리오 데이터
   *
   */

  const portfolioData = ref<SerializeObject[]>([])

  /**
   * ! Pinia Actions !
   */

  const loadPortfolioData = async () => {
    portfolioData.value = []
    const { data: portfolio }:SerializeObject = await useAsyncData('portfolioData', async () => {
      const { data } = await useFetch('/api/portfolio', {
        headers: useRequestHeaders(['cookie']),
        method: 'GET'
      })
      return data
    })
    portfolioData.value = portfolio
  }

  return {
    portfolioData,
    loadPortfolioData
  }
}, {
  persist: true
})
