<template>
  <client-only>
    <el-tooltip
      :disabled="tooltipTrigger"
      effect="dark"
      placement="bottom"
      :content="tooltipText"
    >
      <input
        class="edit-color-input"
        type="color"
        :value="colorValue"
        @input="tiptapEditor.chain().focus().setColor(imageColor($event)).run()"
      >
    </el-tooltip>
  </client-only>
</template>

<script setup lang="ts">

import { Editor } from '@tiptap/vue-3'

withDefaults(
  defineProps<{
    colorValue?: string,
    tiptapEditor: Editor,
    tooltipText?: string,
    tooltipTrigger?: boolean
  }>(),
  {
    colorValue: '#ffffff',
    tooltipText: '',
    tooltipTrigger: false
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
