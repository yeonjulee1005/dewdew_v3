<template>
  <DDButton
    :class="customClass"
    :ui="roundButton ? { rounded: 'rounded-full' } : {}"
    :disabled="buttonDisabled"
    :padding="buttonPadding"
    :color="buttonColor"
    :size="buttonSize"
    :variant="buttonVariant"
    :aria-label="buttonLabel"
    @click="$emit('click:button')"
    @mouseenter="$emit('mouseenter:button')"
    @mouseleave="$emit('mouseleave:button')"
  >
    <template
      v-if="useIcon"
      #leading
    >
      <Icon
        :name="iconName"
        :width="iconSize"
        :height="iconSize"
      />
    </template>
    <span
      v-if="buttonText"
      :style="buttonTextStyle"
    >
      {{ buttonText }}
    </span>
  </DDButton>
</template>

<script setup lang="ts">
import type { ButtonSize, ButtonVariant } from '@nuxt/ui/dist/runtime/types/button'


withDefaults(
  defineProps<{
    customClass?: string,
    roundButton?: boolean,
    buttonDisabled?: boolean,
    buttonPadding?: boolean,
    buttonColor?: string,
    buttonSize?: ButtonSize | undefined,
    buttonVariant?: ButtonVariant | undefined,
    buttonLabel?: string,
    useIcon?: boolean,
    iconName?: string,
    iconSize?: number,
    buttonTextStyle?: string,
    buttonText?: string
  }>(),
  {
    customClass: '',
    roundButton: false,
    buttonDisabled: false,
    buttonPadding: true,
    buttonColor: 'violet',
    buttonSize: 'sm',
    buttonVariant: 'outline',
    buttonLabel: 'button',
    useIcon: false,
    iconName: '',
    iconSize: 24,
    buttonTextStyle: '',
    buttonText: ''
  }
)

defineEmits([
  'click:button',
  'mouseenter:button',
  'mouseleave:button'
])

</script>
