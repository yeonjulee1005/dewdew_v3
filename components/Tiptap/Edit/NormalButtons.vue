<template>
  <DDTooltip :text="tooltipText">
    <AButton
      :custom-class="`menu-item ${isActive ? 'is-active' : ''}}`"
      use-leading
      button-size="xs"
      :icon-name="iconType"
      @click:button="clickAction"
    />
  </DDTooltip>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    iconType: string,
    isActive?: boolean,
    action: Function,
    tooltipTrigger?: boolean,
    tooltipText?: string
  }>(),
  {
    isActive: false,
    tooltipTrigger: true,
    tooltipText: ''
  }
)

const emits = defineEmits([
  'select-button'
])

const clickAction = () => {
  props.action()
  emits('select-button')
}

</script>
