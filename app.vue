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
const { loadArchiveGroup } = useArchiveStore()

await loadMenuData('root')
await loadMenuData('sub')
await loadMenuData('sns')

await loadMainData('intro')
await loadMainData('resume')
await loadMainData('skills')
await loadMainData('reference')

loadStackData()
loadPortfolioData()
loadLeaveColorData()
loadArchiveGroup()

</script>
