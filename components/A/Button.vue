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
      v-if="useLeading"
      #leading
    >
      <Icon
        v-if="iconName"
        :name="iconName"
        :width="iconSize"
        :height="iconSize"
      />
      <nuxt-img
        v-if="imageSrc"
        :src="imageSrc"
        format="webp"
        loading="lazy"
        :width="imageSize"
        :height="imageSize"
        alt="image"
        :draggable="false"
        @contextmenu.prevent
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
    useLeading?: boolean,
    iconName?: string,
    imageSrc?: string,
    iconSize?: number,
    imageSize?: number,
    buttonTextStyle?: string,
    buttonText?: string
  }>(),
  {
    customClass: '',
    roundButton: false,
    buttonDisabled: false,
    buttonPadding: true,
    buttonColor: 'orange',
    buttonSize: 'sm',
    buttonVariant: 'outline',
    buttonLabel: 'button',
    useLeading: false,
    iconName: '',
    imageSrc: '',
    iconSize: 24,
    imageSize: 36,
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
