<template>
  <DDTooltip :text="tooltipText">
    <AButton
      custom-class="menu-item"
      :button-disabled="disabled"
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
    action: Function,
    disabled?: boolean,
    tooltipTrigger?: boolean,
    tooltipText?: string
  }>(),
  {
    disabled: false,
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
