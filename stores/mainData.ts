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

  const loadMainData = async () => {
    mainIntroData.value = []
    mainResumeData.value = []
    mainSkillData.value = []
    mainReferenceData.value = []
    const { data: mainData }:SerializeObject = await useAsyncData('mainData', async () => {
      const { data } = await useFetch('/api/main', {
        headers: useRequestHeaders(['cookie']),
        method: 'GET'
      })
      return data
    })
    mainData.value?.forEach((main:SerializeObject) => {
      separateData(main)
    })
  }

  const separateData = (data: SerializeObject) => {
    switch (data.category) {
      case 'intro' :
        mainIntroData.value.push(data)
        break
      case 'resume' :
        mainResumeData.value.push(data)
        break
      case 'skills' :
        mainSkillData.value.push(data)
        break
      case 'reference' :
        mainReferenceData.value.push(data)
        break
    }
  }

  return {
    mainIntroData,
    mainResumeData,
    mainSkillData,
    mainReferenceData,
    loadMainData
  }
}, {
  persist: true
})
