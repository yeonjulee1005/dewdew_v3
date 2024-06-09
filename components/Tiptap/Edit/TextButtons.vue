<template>
  <DDTooltip :text="tooltipText">
    <AButton
      :custom-class="`tiptap-text-menu-item ${isActive ? 'is-active' : ''}`"
      :button-text-style="`{ fontFamily: ${fontFamilyName} }`"
      button-size="xs"
      :button-text="tooltipText"
      @click:button="clickAction"
    />
  </DDTooltip>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isActive: boolean
    action: () => void
    fontFamilyName?: string
    tooltipText?: string
  }>(),
  {
    fontFamilyName: '',
    tooltipText: '',
  },
)

const emits = defineEmits([
  'select-button',
])

const clickAction = () => {
  props.action()
  emits('select-button')
}
</script>
