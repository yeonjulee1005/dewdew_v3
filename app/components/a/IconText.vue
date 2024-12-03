<template>
  <div :class="`${defaultClass} ${customClass}`">
    <Icon
      v-if="useIcon"
      :name="iconName"
      :width="iconSize"
      :height="iconSize"
    />
    <span :class="textClass">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    useIcon?: boolean
    defaultClass?: string
    customClass?: string
    textClass?: string
    iconName?: string
    iconSize?: number
    text?: string
  }>(),
  {
    useIcon: true,
    defaultClass: 'flex items-center gap-1',
    customClass: '',
    textClass: '',
    iconName: '',
    iconSize: 34,
    text: '',
  },
)
</script>
