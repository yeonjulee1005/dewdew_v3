<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtLoadingIndicator
      :height="5"
    />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ID_INJECTION_KEY } from 'element-plus'

provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0
})

const { loadMenuData, loadMainData } = useLoadComposable()

const { loadStackData } = useStackStore()
const { loadPortfolioData } = usePortfolioStore()
const { loadLeaveColorData } = useLeaveColorStore()

loadMenuData('root')
loadMenuData('sub')
loadMenuData('sns')

loadMainData('intro')
loadMainData('resume')
loadMainData('skills')
loadMainData('reference')

loadStackData()
loadPortfolioData()
loadLeaveColorData()

</script>
