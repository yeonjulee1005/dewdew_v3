import { defineStore } from 'pinia'

export const useLeaveColorStore = defineStore('leaveColorData', () => {
  /**
   * ! Pinia State !
   *
   * @param leaveColorData 페이지이탈 컬러 데이터
   *
   */

  const leaveColorData = ref<SerializeObject>()

  return {
    leaveColorData
  }
}, {
  persist: true
})
