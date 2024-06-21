<template>
  <div class="flex items-end gap-4 mb-8">
    <p class="skills-text">
      {{ progressData.title }}
    </p>
    <AProgressBar
      custom-class="progress"
      :count="progressData.percent"
      :emoji="progressData.emoji"
      use-emoji
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  progressData: ProgressData
}>()
</script>
