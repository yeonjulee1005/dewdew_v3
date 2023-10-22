import { defineStore } from 'pinia'

export const useLeaveColorStore = defineStore('leaveColorData', () => {
  /**
   * ! Pinia State !
   *
   * @param leaveColorData 페이지이탈 컬러 데이터
   *
   */

  const leaveColorData = ref<SerializeObject>()

  /**
   * ! Pinia Actions !
   */

  const loadLeaveColorData = async () => {
    const { data: color }:SerializeObject = await useAsyncData('leaveColorData', async () => {
      const { data } = await useFetch('/api/leaveColor', {
        headers: useRequestHeaders(['cookie']),
        method: 'GET'
      })
      return data
    })
    leaveColorData.value = color
  }

  return {
    leaveColorData,
    loadLeaveColorData
  }
}, {
  persist: true
})
