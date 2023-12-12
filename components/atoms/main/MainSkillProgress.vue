<template>
  <div class="flex-align-center">
    <span class="skills-text">
      {{ progressData.title }}
    </span>
    <AProgressBar
      custom-class="progress"
      :count="progressData.percent"
      :emoji="progressData.emoji"
      use-emoji
    />
  </div>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    progressData: ProgressData,
    maxSize?: number | string[]
  }>(),
  {
    maxSize: 100
  }
)

</script>
