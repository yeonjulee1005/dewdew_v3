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

const { loadMenuData } = useMenuStore()
const { loadMainData } = useMainStore()
const { loadStackData } = useStackStore()
const { loadPortfolioData } = usePortfolioStore()
const { loadLeaveColorData } = useLeaveColorStore()

loadMenuData()
loadMainData()
loadStackData()
loadPortfolioData()
loadLeaveColorData()

</script>
