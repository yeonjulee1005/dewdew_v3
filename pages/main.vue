<template>
  <div class="main">
    <LazyMainIntroBanner
      :main-title-trigger="mainTitleTrigger"
      :main-text-trigger="mainTextTrigger"
    />
    <LazyMainScrollDown :scroll-down-trigger="scrollDownTrigger" />
    <LazyMainResume :main-resume-trigger="mainResumeTrigger" />
    <LazyMainSkillsContents
      :skills-text-trigger="mainSkillsTextTrigger"
      :skills-bg-trigger="mainSkillsBgTrigger"
      :skills-list-trigger="mainSkillsListTrigger"
    />
    <LazyMainPortfolio
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

const { portfolioData } = storeToRefs(usePortfolioStore())

const { loadStackData, loadPortfolioData } = useFetchComposable()

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
  mainSkillsListTrigger.value = scrollY > 2400 && scrollY < 5500
  referenceListTrigger.value = scrollY > 5100 && scrollY < 10800
  contactTrigger.value = scrollY > 10700
}

const tablet = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 300
  mainTextTrigger.value = scrollY < 500
  scrollDownTrigger.value = scrollY < 200
  mainResumeTrigger.value = scrollY > 300 && scrollY < 1600
  mainSkillsTextTrigger.value = scrollY > 1500 && scrollY < 2500
  mainSkillsBgTrigger.value = scrollY > 1200 && scrollY < 3500
  mainSkillsListTrigger.value = scrollY > 2700 && scrollY < 5600
  referenceListTrigger.value = scrollY > 5700 && scrollY < 8200
  contactTrigger.value = scrollY > 8000
}

const desktop = (scrollY:number) => {
  mainTitleTrigger.value = scrollY < 500
  mainTextTrigger.value = scrollY < 450
  scrollDownTrigger.value = scrollY < 650
  mainResumeTrigger.value = scrollY > 150 && scrollY < 1250
  mainSkillsTextTrigger.value = scrollY > 1300 && scrollY < 2200
  mainSkillsBgTrigger.value = scrollY > 900 && scrollY < 3000
  mainSkillsListTrigger.value = scrollY > 2300 && scrollY < 3800
  referenceListTrigger.value = scrollY > 3600 && scrollY < 5800
  contactTrigger.value = scrollY > 5600
}

loadStackData()
loadPortfolioData()

</script>
