<template>
  <div class="main">
    <LazyMainIntroBanner
      :main-title="mainIntroTitle"
      :main-text="mainIntroText"
      :main-title-trigger="mainTitleTrigger"
      :main-text-trigger="mainTextTrigger"
    />
    <LazyMainScrollDown
      :main-scroll-text="mainIntroScrollText"
      :scroll-down-trigger="scrollDownTrigger"
    />
    <LazyMainResume
      :resume-title="mainResumeTitle"
      :educate-text="mainEducatedText"
      :career-data="mainCareerText"
      :main-resume-trigger="mainResumeTrigger"
    />
    <LazyMainSkillsContents
      :skills-text-trigger="mainSkillsTextTrigger"
      :skills-bg-trigger="mainSkillsBgTrigger"
      :skills-list-trigger="mainSkillsListTrigger"
    />
    <LazyMainPortfolio
      :portfolio-title="mainPortfolioTitle"
      :portfolio-description="mainPortfolioText"
      :portfolio-background="mainPortfolioBackground"
      :portfolio-image-data="portfolioData"
      :portfolio-trigger="referenceListTrigger"
    />
    <LazyMainContact :contact-trigger="contactTrigger" />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { width } = useWindowSize()
const { y } = useWindowScroll()

const { mainIntroTitle, mainIntroText, mainIntroScrollText, mainResumeTitle, mainEducatedText, mainCareerText, mainPortfolioTitle, mainPortfolioText, mainPortfolioBackground } = storeToRefs(useMainStore())
const { portfolioData } = storeToRefs(usePortfolioStore())

const { loadMainData, loadStackData, loadPortfolioData } = useFetchComposable()

useHead({
  meta: [
    { property: 'og:title', content: t('openGraph.dewdew', { text: 'dewdew' }) }
  ]
})

const mainTitleTrigger = ref(true)
const mainTextTrigger = ref(true)
const scrollDownTrigger = ref(true)
const mainResumeTrigger = ref(false)
const mainSkillsTextTrigger = ref(false)
const mainSkillsBgTrigger = ref(false)
const mainSkillsListTrigger = ref(false)
const referenceListTrigger = ref(false)
const contactTrigger = ref(false)

watch(() => y.value, () => {
  if (y.value) {
    scrollDetect()
  }
})

const scrollDetect = () => {
  switch (Math.min(Math.ceil(width.value / 500), 3) - 1) {
    case 0 :
      mobile(y.value)
      break
    case 1 :
      tablet(y.value)
      break
    case 2 :
      desktop(y.value)
      break
  }
}

const mobile = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 200
  mainTextTrigger.value = scrollY < 350
  scrollDownTrigger.value = scrollY < 160
  mainResumeTrigger.value = scrollY > 200 && scrollY < 1400
  mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2600
  mainSkillsBgTrigger.value = scrollY > 1300 && scrollY < 2900
  mainSkillsListTrigger.value = scrollY > 3000 && scrollY < 7700
  referenceListTrigger.value = scrollY > 7700 && scrollY < 12800
  contactTrigger.value = scrollY > 12900
}

const tablet = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 300
  mainTextTrigger.value = scrollY < 500
  scrollDownTrigger.value = scrollY < 200
  mainResumeTrigger.value = scrollY > 300 && scrollY < 1600
  mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2600
  mainSkillsBgTrigger.value = scrollY > 1200 && scrollY < 4000
  mainSkillsListTrigger.value = scrollY > 2700 && scrollY < 7700
  referenceListTrigger.value = scrollY > 7700 && scrollY < 10000
  contactTrigger.value = scrollY > 10100
}

const desktop = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 500
  mainTextTrigger.value = scrollY < 450
  scrollDownTrigger.value = scrollY < 650
  mainResumeTrigger.value = scrollY > 150 && scrollY < 1250
  mainSkillsTextTrigger.value = scrollY > 1300 && scrollY < 2200
  mainSkillsBgTrigger.value = scrollY > 900 && scrollY < 3000
  mainSkillsListTrigger.value = scrollY > 2300 && scrollY < 5500
  referenceListTrigger.value = scrollY > 5800 && scrollY < 7300
  contactTrigger.value = scrollY > 7400
}

loadMainData()
loadStackData()
loadPortfolioData()

</script>
