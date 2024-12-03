<template>
  <DDBadge
    :class="customClass"
    :color="badgeColor"
    :size="badgeSize"
    :variant="badgeVariant"
  >
    <Icon
      v-if="useIcon"
      :name="iconName"
      :width="iconSize"
      :height="iconSize"
    />
    <span style="width: fit-content; white-space: nowrap;">
      {{ badgeText }}
    </span>
  </DDBadge>
</template>

<script setup lang="ts">
import type { BadgeSize, BadgeVariant } from '@nuxt/ui/dist/runtime/types'

withDefaults(
  defineProps<{
    customClass?: string
    badgeColor?: string
    badgeSize?: BadgeSize | undefined
    badgeVariant?: BadgeVariant | undefined
    useIcon?: boolean
    iconName?: string
    iconSize?: number
    badgeText?: string | number
  }>(),
  {
    customClass: '',
    badgeColor: 'orange',
    badgeSize: 'lg',
    badgeVariant: 'soft',
    useIcon: true,
    iconName: '',
    iconSize: 22,
    badgeText: '',
  },
)
</script>
