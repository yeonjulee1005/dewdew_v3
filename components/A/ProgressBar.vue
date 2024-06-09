<template>
  <DDProgress
    :value="count"
    :max="maxSize"
    :class="customClass"
    :color="progressColor(count)"
    :size="size"
    indicator
  >
    <template #indicator>
      <div
        class="flex flex-justify-end"
        :style="{ width: `${useEmoji ? count : (count / 60) * 100}%`, minWidth: '60px' }"
      >
        <span> {{ useEmoji ? emoji.concat(' ', String(count), '%') : String(count).concat(' S') }} </span>
      </div>
    </template>
  </DDProgress>
</template>

<script setup lang="ts">
const { progressColor } = useUi()

withDefaults(
  defineProps<{
    customClass?: string
    size?: '2xl' | 'sm' | 'md' | 'xs' | '2xs' | 'lg' | 'xl' | undefined
    count: number
    emoji?: string
    useEmoji?: boolean
    maxSize?: number | string[]
  }>(),
  {
    size: '2xl',
    customClass: '',
    emoji: '',
    useEmoji: false,
    maxSize: 100,
  },
)
</script>
