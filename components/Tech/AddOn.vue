<template>
  <div :class="addOnClass">
    <ANuxtTime
      v-if="useNuxtTime"
      custom-class="time flex"
      :date-time="data.created_at"
      :full-date-time="false"
      :capital-date-time="false"
    />
    <AButton
      :button-color="badgeColor(data.like)"
      button-variant="outline"
      :button-size="badgeSize"
      use-leading
      icon-name="line-md:heart"
      :icon-size="16"
      :button-text="String(data.like)"
      @click="$emit('update-count')"
    />
    <ABadge
      custom-class="flex gap-2"
      :badge-color="badgeColor(data.view_count ?? 0)"
      :badge-size="badgeSize"
      icon-name="line-md:watch-loop"
      :badge-text="String(data.view_count ?? 0)"
    />
    <ABadge
      custom-class="flex gap-1"
      :badge-color="badgeColor(estimateReadTime ?? 0)"
      :badge-size="badgeSize"
      badge-variant="outline"
      icon-name="line-md:text-box-multiple-twotone-to-text-box-twotone-transition"
      :badge-text="$t('tech.estimateReadTime', { time: estimateReadTime })"
    />
  </div>
</template>

<script setup lang="ts">
import type { BadgeSize } from '@nuxt/ui/dist/runtime/types'

const { badgeColor } = useUi()

withDefaults(
  defineProps<{
    articleId: string
    addOnClass?: string
    data: SerializeObject
    estimateReadTime?: number
    useNuxtTime?: boolean
    activateLike?: boolean
    badgeSize?: BadgeSize | undefined
  }>(),
  {
    addOnClass: 'article-add-on flex flex-wrap flex-justify-end mb-20 gap-4',
    estimateReadTime: 0,
    useNuxtTime: false,
    activateLike: false,
    badgeSize: 'sm',
  },
)

defineEmits([
  'update-count',
])
</script>
