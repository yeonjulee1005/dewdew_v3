<template>
  <div :class="canvasClass">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">

const { loadSpline } = useSpline()

const canvasRef = ref()

const props = withDefaults(
  defineProps<{
    canvasClass?: string,
    splineUrl: string
  }>(),
  {
    canvasClass: ''
  }
)

onMounted(() => {
  loadSpline(canvasRef, props.splineUrl)
})

</script>
