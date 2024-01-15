<template>
  <div class="main">
    <LazyMainIntroBanner
      v-model:main-title-trigger="mainTitleTrigger"
      v-model:main-text-trigger="mainTextTrigger"
    />
    <LazyMainScrollDown v-model:scroll-down-trigger="scrollDownTrigger" />
    <LazyMainPrevTech v-model:prev-tech-trigger="prevTechTrigger" />
    <LazyMainResume v-model:main-resume-trigger="mainResumeTrigger" />
    <LazyMainSkillsContents
      v-model:skills-text-trigger="mainSkillsTextTrigger"
      v-model:skills-bg-trigger="mainSkillsBgTrigger"
      v-model:skills-list-trigger="mainSkillsListTrigger"
    />
    <LazyMainPortfolio
      v-model:portfolio-trigger="referenceListTrigger"
      v-model:portfolio-image-data="portfolioData"
    />
    <LazyMainContact v-model:contact-trigger="contactTrigger" />
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { width } = useWindowSize()
const { y } = useWindowScroll()

const { portfolioData } = storeToRefs(usePortfolioStore())

const { loadStackData, loadPortfolioData } = useFetchComposable()

useHead({
  title: t('pageTitle.main')
})

const mainTitleTrigger = ref(true)
const mainTextTrigger = ref(true)
const scrollDownTrigger = ref(true)
const prevTechTrigger = ref(false)
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
  scrollDownTrigger.value = scrollY < 150
  prevTechTrigger.value = scrollY > 180
  mainResumeTrigger.value = scrollY > 200 && scrollY < 1500
  mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2700
  mainSkillsBgTrigger.value = scrollY > 1300 && scrollY < 2900
  mainSkillsListTrigger.value = scrollY > 2800 && scrollY < 5850
  referenceListTrigger.value = scrollY > 5800 && scrollY < 11000
  contactTrigger.value = scrollY > 11200
}

const tablet = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 300
  mainTextTrigger.value = scrollY < 500
  scrollDownTrigger.value = scrollY < 200
  prevTechTrigger.value = scrollY > 280
  mainResumeTrigger.value = scrollY > 400
  mainSkillsTextTrigger.value = scrollY > 1900
  mainSkillsBgTrigger.value = scrollY > 1400
  mainSkillsListTrigger.value = scrollY > 2700
  referenceListTrigger.value = scrollY > 5700
  contactTrigger.value = scrollY > 8000
}

const desktop = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 400
  mainTextTrigger.value = scrollY < 450
  scrollDownTrigger.value = scrollY < 250
  prevTechTrigger.value = scrollY > 350 && scrollY < 1150
  mainResumeTrigger.value = scrollY > 500 && scrollY < 1600
  mainSkillsTextTrigger.value = scrollY > 1650 && scrollY < 2400
  mainSkillsBgTrigger.value = scrollY > 1100 && scrollY < 3200
  mainSkillsListTrigger.value = scrollY > 2500 && scrollY < 4000
  referenceListTrigger.value = scrollY > 3800 && scrollY < 6200
  contactTrigger.value = scrollY > 6000
}

loadStackData()
loadPortfolioData()

</script>
