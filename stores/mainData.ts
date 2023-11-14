import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainData', () => {
  /**
   * ! Pinia State !
   *
   * @property {SerializeObject} mainIntroTitle 메인 인트로 타이틀
   * @property {SerializeObject[]} mainIntroText 메인 인트로 텍스트
   * @property {SerializeObject} mainIntroScrollText 메인 인트로 스크롤 텍스트
   *
   * @property {SerializeObject} mainResumeTitle 메인 이력 타이틀
   * @property {SerializeObject} mainEducatedText 메인 학력 텍스트
   * @property {SerializeObject[]} mainCareerText 메인 경력 텍스트
   *
   * @property {SerializeObject[]} mainSkillTitle 메인 스킬 타이틀
   * @property {SerializeObject[]} mainSkillFirstText 메인 스킬 첫번째 설명
   * @property {SerializeObject[]} mainSkillSecondText 메인 스킬 두번째 설명
   * @property {SerializeObject[]} mainSkillThirdText 메인 스킬 세번째 설명
   *
   * @property {SerializeObject} mainPortfolioTitle 메인 포트폴리오 타이틀
   * @property {SerializeObject} mainPortfolioText 메인 포트폴리오 텍스트
   * @property {SerializeObject} mainPortfolioBackground 메인 포트폴리오 배경텍스트
   *
   */

  const mainIntroTitle = ref<SerializeObject>()
  const mainIntroText = ref<SerializeObject[]>([])
  const mainIntroScrollText = ref<SerializeObject>()

  const mainResumeTitle = ref<SerializeObject>()
  const mainEducatedText = ref<SerializeObject>()
  const mainCareerText = ref<SerializeObject[]>([])

  const mainSkillTitle = ref<SerializeObject[]>([])
  const mainSkillFirstText = ref<SerializeObject[]>([])
  const mainSkillSecondText = ref<SerializeObject[]>([])
  const mainSkillThirdText = ref<SerializeObject[]>([])

  const mainPortfolioTitle = ref<SerializeObject>()
  const mainPortfolioText = ref<SerializeObject>()
  const mainPortfolioBackground = ref<SerializeObject>()

  /**
   * ! Pinia Actions !
   */

  const updateMainData = (data: SerializeObject) => {
    mainIntroTitle.value = []
    mainIntroText.value = []
    mainIntroScrollText.value = []

    mainResumeTitle.value = []
    mainEducatedText.value = []
    mainCareerText.value = []

    mainSkillTitle.value = []
    mainSkillFirstText.value = []
    mainSkillSecondText.value = []
    mainSkillThirdText.value = []

    mainPortfolioTitle.value = []
    mainPortfolioText.value = []
    mainPortfolioBackground.value = []

    if (!data.value) { return }
    data.value.forEach((item:SerializeObject) => {
      switch (item.category) {
        case 'intro' :
          computedIntroText(item)
          break
        case 'resume' :
          computedResumeText(item)
          break
        case 'skills' :
          computedSkillText(item)
          break
        case 'reference' :
          computedPortfolioText(item)
          break
      }
    })
  }

  const computedIntroText = (data: SerializeObject) => {
    switch (data.text_type) {
      case 'title' :
        mainIntroTitle.value = data
        break
      case 'main' :
        mainIntroText.value.push(data)
        break
      case 'scroll' :
        mainIntroScrollText.value = data
        break
    }
  }

  const computedResumeText = (data: SerializeObject) => {
    switch (data.text_type) {
      case 'title' :
        mainResumeTitle.value = data
        break
      case 'educate' :
        mainEducatedText.value = data
        break
      case 'career' :
        mainCareerText.value.push(data)
        break
    }
  }

  const computedSkillText = (data: SerializeObject) => {
    switch (data.text_type) {
      case 'title' :
        mainSkillTitle.value.push(data)
        break
      case 'first' :
        mainSkillFirstText.value.push(data)
        break
      case 'second' :
        mainSkillSecondText.value.push(data)
        break
      case 'third' :
        mainSkillThirdText.value.push(data)
        break
    }
  }

  const computedPortfolioText = (data: SerializeObject) => {
    switch (data.text_type) {
      case 'title' :
        mainPortfolioTitle.value = data
        break
      case 'desc' :
        mainPortfolioText.value = data
        break
      case 'background' :
        mainPortfolioBackground.value = data
        break
    }
  }

  return {
    mainIntroTitle,
    mainIntroText,
    mainIntroScrollText,
    mainResumeTitle,
    mainEducatedText,
    mainCareerText,
    mainSkillTitle,
    mainSkillFirstText,
    mainSkillSecondText,
    mainSkillThirdText,
    mainPortfolioTitle,
    mainPortfolioText,
    mainPortfolioBackground,
    updateMainData
  }
}, {
  persist: true
})
