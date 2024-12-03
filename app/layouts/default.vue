<template>
  <div class="layout-container">
    <AHeader />
    <slot />
    <AFooter />
    <InstallPwa />
    <DialogLeaveCounter />
    <SpeedInsights />
  </div>
</template>

<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>
