<template>
  <div class="layout-container">
    <AHeader />
    <slot />
    <AFooter />
    <InstallPwa />
    <LazyLeaveCounter
      :idle-trigger="idleTrigger"
      @dialog-close="(trigger:boolean) => idleTrigger = trigger"
    />
  </div>
</template>

<script setup lang="ts">

const { idle } = useIdle(10 * 60 * 1000)

const idleTrigger = computed(() => { return idle.value })

</script>
