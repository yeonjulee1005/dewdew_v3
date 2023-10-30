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

  const updateMainData = (data: SerializeObject) => {
    mainIntroData.value = []
    mainResumeData.value = []
    mainSkillData.value = []
    mainReferenceData.value = []

    if (!data.value) { return }
    data.value.forEach((item:SerializeObject) => {
      switch (item.category) {
        case 'intro' :
          mainIntroData.value.push(item)
          break
        case 'resume' :
          mainResumeData.value.push(item)
          break
        case 'skills' :
          mainSkillData.value.push(item)
          break
        case 'reference' :
          mainReferenceData.value.push(item)
          break
      }
    })
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
