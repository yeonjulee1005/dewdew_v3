<template>
  <DDTooltip :text="tooltipText">
    <input
      class="edit-color-input"
      type="color"
      :value="colorValue"
      label="color"
      @input="tiptapEditor.chain().focus().setColor(imageColor($event)).run()"
    >
  </DDTooltip>
</template>

<script setup lang="ts">

import { Editor } from '@tiptap/vue-3'

withDefaults(
  defineProps<{
    colorValue?: string,
    tiptapEditor: Editor,
    tooltipText?: string
  }>(),
  {
    colorValue: '#ffffff',
    tooltipText: ''
  }
)

const imageColor = (event:Event) => {
  const target = event.target as HTMLButtonElement
  let color = ''
  target
    ? color = target.value
    : color = ''
  return color
}

</script>
