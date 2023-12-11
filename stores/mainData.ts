import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainData', () => {
  /**
   * ! Pinia State !
   *
   * @param mainIntroTitle 메인 인트로 타이틀
   * @param mainIntroText 메인 인트로 텍스트
   * @param mainIntroScrollText 메인 인트로 스크롤 텍스트
   *
   * @param mainResumeTitle 메인 이력 타이틀
   * @param mainEducatedText 메인 학력 텍스트
   * @param mainCareerText 메인 경력 텍스트
   *
   * @param mainSkillTitle 메인 스킬 타이틀
   * @param mainSkillFirstText 메인 스킬 첫번째 설명
   * @param mainSkillSecondText 메인 스킬 두번째 설명
   * @param mainSkillThirdText 메인 스킬 세번째 설명
   *
   * @param mainPortfolioTitle 메인 포트폴리오 타이틀
   * @param mainPortfolioText 메인 포트폴리오 텍스트
   * @param mainPortfolioBackground 메인 포트폴리오 배경텍스트
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
    mainPortfolioBackground
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
