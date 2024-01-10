<template>
  <div
    v-if="tags"
    class="flex flex-wrap gap-2"
  >
    <ABadge
      v-for="(tag, index) in tags.split(',')"
      v-show="tags.includes(',')"
      :key="index"
      custom-class="flex gap-2 w-[fit-content]"
      :badge-size="badgeSize"
      icon-name="ant-design:tags-twotone"
      :badge-text="tag"
    />
    <ABadge
      v-show="!tags.includes(',')"
      custom-class="w-[fit-content]"
      :badge-size="badgeSize"
      icon-name="ant-design:tags-twotone"
      :badge-text="tags"
    />
  </div>
</template>

<script setup lang="ts">
import type { BadgeSize } from '@nuxt/ui/dist/runtime/types'

withDefaults(
  defineProps<{
    tags: string,
    badgeSize?: BadgeSize | undefined
  }>(),
  {
    badgeSize: 'lg'
  }
)

</script>
