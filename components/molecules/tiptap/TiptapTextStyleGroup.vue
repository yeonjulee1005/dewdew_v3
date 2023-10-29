<template>
  <client-only>
    <el-popover
      trigger="hover"
      width="auto"
      :show-arrow="false"
      popper-class="tiptap-editor-group-menu"
    >
      <template #reference>
        <el-button>
          <Icon name="ri:palette-line" />
        </el-button>
      </template>
      <LazyEditColorInput
        :color-value="tiptapEditor ? selectColor(tiptapEditor) : null"
        :tiptap-editor="tiptapEditor"
        :tooltip-text="$t('tiptap.colors')"
      />
      <LazyEditNormalButtons
        :is-active="tiptapEditor.isActive('bold')"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleBold().run() : null"
        icon-type="ri:bold"
        :tooltip-text="$t('tiptap.bold')"
      />
      <LazyEditNormalButtons
        v-if="fullOption"
        :is-active="tiptapEditor.isActive('italic')"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleItalic().run() : null"
        icon-type="ri:italic"
        :tooltip-text="$t('tiptap.italic')"
      />
    </el-popover>
  </client-only>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'

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
