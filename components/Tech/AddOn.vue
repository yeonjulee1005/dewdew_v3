<template>
  <div :class="addOnClass">
    <ANuxtTime
      v-if="useNuxtTime"
      custom-class="time flex"
      :date-time="data.created_at"
      :full-date-time="false"
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
    <DDBadge
      class="flex gap-2"
      :color="badgeColor(data.view_count ?? 0)"
      :size="badgeSize"
      variant="soft"
    >
      <Icon
        name="line-md:watch-loop"
        :width="22"
        :height="22"
      />
      <span>
        {{ (data.view_count ?? 0) }}
      </span>
    </DDBadge>
    <DDBadge
      class="flex gap-1"
      :color="badgeColor(estimateReadTime ?? 0)"
      :size="badgeSize"
      variant="outline"
    >
      <Icon
        name="line-md:text-box-multiple-twotone-to-text-box-twotone-transition"
        :width="22"
        :height="22"
      />
      <span>
        {{ $t('tech.estimateReadTime', { time: estimateReadTime }) }}
      </span>
    </DDBadge>
  </div>
</template>

<script setup lang="ts">
import type { BadgeSize } from '@nuxt/ui/dist/runtime/types'

const { badgeColor } = useUi()

withDefaults(
  defineProps<{
    articleId: string,
    addOnClass?: string,
    data: SerializeObject,
    estimateReadTime?: number,
    useNuxtTime?: boolean,
    activateLike?: boolean,
    badgeSize?: BadgeSize | undefined
  }>(),
  {
    addOnClass: 'article-add-on flex flex-justify-end mb-20 space-x-4',
    estimateReadTime: 0,
    useNuxtTime: false,
    activateLike: false,
    badgeSize: 'sm'
  }
)

defineEmits([
  'update-count'
])

</script>
