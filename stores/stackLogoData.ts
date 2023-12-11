import { defineStore } from 'pinia'

export const useStackStore = defineStore('stackData', () => {
  /**
   * ! Pinia State !
   *
   * @param stackLogoData 스택로고 데이터
   *
   */

  const stackLogoData = ref<SerializeObject>()

  /**
   * ! Pinia Actions !
   */

  const loadStackData = async () => {
    const { data: stack }:SerializeObject = await useAsyncData('stackLogoData', async () => {
      const { data } = await useFetch('/api/stack', {
        headers: useRequestHeaders(['cookie']),
        method: 'GET'
      })
      return data
    })
    stackLogoData.value = stack
  }

  return {
    stackLogoData,
    loadStackData
  }
}, {
  persist: true
})
