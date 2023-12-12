<template>
  <div class="flex-align-center">
    <span class="skills-text">
      {{ progressData.title }}
    </span>
    <DDProgress
      :value="progressData.percent"
      class="progress"
      :color="progressColor(progressData.percent)"
      size="2xl"
      indicator
    >
      <template #indicator="{ percent }">
        <div
          class="flex flex-justify-end"
          :style="{ width: `${percent}%` }"
        >
          <span> {{ progressData.emoji.concat(' ', percent, '%') }} </span>
        </div>
      </template>
    </DDProgress>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  progressData: ProgressData
}>()

const progressColor = (percentage: number) => {
  if (percentage < 10) {
    return 'red'
  } else if (percentage < 20) {
    return 'orange'
  } else if (percentage < 30) {
    return 'lime'
  } else if (percentage < 40) {
    return 'green'
  } else if (percentage < 50) {
    return 'teal'
  } else if (percentage < 60) {
    return 'sky'
  } else if (percentage < 80) {
    return 'indigo'
  } else if (percentage < 85) {
    return 'violet'
  } else if (percentage < 90) {
    return 'purple'
  } else if (percentage < 95) {
    return 'fuchsia'
  } else {
    return 'rose'
  }
}

</script>
