import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainData', () => {
  /**
   * ! Pinia State !
   *
   * @param mainIntroData 메인 인트로 데이터
   * @param mainResumeData 메인 이력 데이터
   * @param mainSkillData 메인 스킬 데이터
   * @param mainReferenceData 메인 레퍼런스 데이터
   *
   */

  const mainIntroData = ref<SerializeObject[]>([])
  const mainResumeData = ref<SerializeObject[]>([])
  const mainSkillData = ref<SerializeObject[]>([])
  const mainReferenceData = ref<SerializeObject[]>([])

  /**
   * ! Pinia Actions !
   */

  const updateMainData = (data: SerializeObject[], category:string) => {
    switch (category) {
      case 'intro' :
        mainIntroData.value = data
        break
      case 'resume' :
        mainResumeData.value = data
        break
      case 'skills' :
        mainSkillData.value = data
        break
      case 'reference' :
        mainReferenceData.value = data
        break
    }
  }

  return {
    mainIntroData,
    mainResumeData,
    mainSkillData,
    mainReferenceData,
    updateMainData
  }
}, {
  persist: true
})
