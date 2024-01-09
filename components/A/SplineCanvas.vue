<template>
  <div :class="canvasClass">
    <spline-viewer :url="splineUrl" />
  </div>
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
