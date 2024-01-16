<template>
  <ClientOnly>
    <div :class="canvasClass">
      <spline-viewer :url="splineUrl" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    canvasClass?: string,
    splineUrl: string
  }>(),
  {
    canvasClass: ''
  }
)

</script>
