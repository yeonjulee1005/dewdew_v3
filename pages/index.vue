<template>
  <div class="main">
    <LazyMainIntroBanner
      :main-title="mainTitle"
      :main-text="mainText"
      :main-scroll-text="mainScrollText"
      :main-title-trigger="mainTextTrigger"
      :main-text-trigger="mainTextTrigger"
      :scroll-down-trigger="scrollDownTrigger"
    />
    <MainResumeDesc
      :resume-title="mainResumeTitle"
      :educate-text="mainEducateText"
      :career-data="mainCareerData"
      :main-resume-trigger="mainResumeTrigger"
    />
    <MainSkillContents
      :skills-text-trigger="mainSkillsTextTrigger"
      :skills-bg-trigger="mainSkillsBgTrigger"
      :skills-list-trigger="mainSkillsListTrigger"
    />
    <MainPortfolio
      :portfolio-title="mainPortfolioTitle"
      :portfolio-description="mainPortfolioText"
      :portfolio-background="mainPortfolioBackground"
      :portfolio-image-data="portfolioData"
      :portfolio-trigger="true"
    />
    <MainContact
      :contact-trigger="contactTrigger"
    />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { width } = useWindowSize()
const { y } = useWindowScroll()

const { mainIntroData, mainResumeData, mainReferenceData } = useMainStore()
const { portfolioData } = usePortfolioStore()

useHead({
  meta: [
    { property: 'og:title', content: t('openGraph.dewdew', { text: 'dewdew' }) }
  ]
})

const mainTitle = computed(() => {
  return mainIntroData.filter(
    (item: SerializeObject) => item.text_type === 'title'
  )[0]
})
const mainText = computed(() => {
  return mainIntroData.filter(
    (item: SerializeObject) => item.text_type === 'main'
  )
})
const mainScrollText = computed(() => {
  return mainIntroData.filter(
    (item: SerializeObject) => item.text_type === 'scroll'
  )[0]
})

const mainResumeTitle = computed(() => {
  return mainResumeData.filter(
    (item: SerializeObject) => item.text_type === 'title'
  )[0]
})
const mainEducateText = computed(() => {
  return mainResumeData.filter(
    (item: SerializeObject) => item.text_type === 'educate'
  )[0]
})
const mainCareerData = computed(() => {
  return mainResumeData.filter(
    (item: SerializeObject) => item.text_type === 'career'
  )
})
const mainPortfolioTitle = computed(() => {
  return mainReferenceData.filter(
    (item: SerializeObject) => item.text_type === 'title'
  )[0]
})
const mainPortfolioText = computed(() => {
  return mainReferenceData.filter(
    (item: SerializeObject) => item.text_type === 'desc'
  )[0]
})
const mainPortfolioBackground = computed(() => {
  return mainReferenceData.filter(
    (item: SerializeObject) => item.text_type === 'background'
  )[0]
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

watchEffect(() => {
  if (!y.value) { return }
  scrollDetect()
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
  scrollDownTrigger.value = scrollY < 440
  mainResumeTrigger.value = scrollY > 200 && scrollY < 1400
  mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2600
  mainSkillsBgTrigger.value = scrollY > 1300 && scrollY < 2900
  mainSkillsListTrigger.value = scrollY > 2600 && scrollY < 5000
  referenceListTrigger.value = scrollY > 5000 && scrollY < 8900
  contactTrigger.value = scrollY > 8800
}

const tablet = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 300
  mainTextTrigger.value = scrollY < 500
  scrollDownTrigger.value = scrollY < 500
  mainResumeTrigger.value = scrollY > 300 && scrollY < 1600
  mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2600
  mainSkillsBgTrigger.value = scrollY > 1200 && scrollY < 4000
  mainSkillsListTrigger.value = scrollY > 2700 && scrollY < 5100
  referenceListTrigger.value = scrollY > 5000 && scrollY < 7300
  contactTrigger.value = scrollY > 7200
}

const desktop = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 500
  mainTextTrigger.value = scrollY < 450
  scrollDownTrigger.value = scrollY < 650
  mainResumeTrigger.value = scrollY > 150 && scrollY < 1250
  mainSkillsTextTrigger.value = scrollY > 1300 && scrollY < 2200
  mainSkillsBgTrigger.value = scrollY > 900 && scrollY < 3000
  mainSkillsListTrigger.value = scrollY > 2300 && scrollY < 3800
  referenceListTrigger.value = scrollY > 4000 && scrollY < 5800
  contactTrigger.value = scrollY > 5500
}

</script>
