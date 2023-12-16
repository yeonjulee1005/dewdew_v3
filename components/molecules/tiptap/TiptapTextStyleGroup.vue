<template>
  <DDPopover :mode="isDesktop ? 'click' : 'hover'">
    <AButton
      use-icon
      button-size="xs"
      icon-name="ri:palette-line"
    />
    <template #panel>
      <div class="flex gap-2">
        <EditColorInput
          :color-value="tiptapEditor ? selectColor(tiptapEditor) : null"
          :tiptap-editor="tiptapEditor"
          :tooltip-text="$t('tiptap.colors')"
        />
        <EditNormalButtons
          :is-active="tiptapEditor.isActive('bold')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleBold().run() : null"
          icon-type="ri:bold"
          :tooltip-text="$t('tiptap.bold')"
        />
        <EditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('italic')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleItalic().run() : null"
          icon-type="ri:italic"
          :tooltip-text="$t('tiptap.italic')"
        />
      </div>
    </template>
  </DDPopover>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'

const { isDesktop } = useDevice()

withDefaults(
  defineProps<{
    tiptapEditor: Editor,
    fullOption?: boolean
  }>(),
  {
    fullOption: false
  }
)

const selectColor = (editor:any) => {
  const selectionColor = editor.getAttributes('textStyle').color
  if (selectionColor) {
    return selectionColor
  }
}

</script>
