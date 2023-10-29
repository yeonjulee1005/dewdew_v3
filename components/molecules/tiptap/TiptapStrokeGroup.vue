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
          <Icon name="ri:pen-nib-line" />
        </el-button>
      </template>
      <LazyEditNormalButtons
        :is-active="tiptapEditor.isActive('underline')"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleUnderline().run() : null"
        icon-type="ri:underline"
        :tooltip-text="$t('tiptap.underline')"
      />
      <LazyEditNormalButtons
        :is-active="tiptapEditor.isActive('strike')"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleStrike().run() : null"
        icon-type="ri:strikethrough-2"
        :tooltip-text="$t('tiptap.strikethrough')"
      />
      <LazyEditNormalButtons
        v-if="fullOption"
        :is-active="tiptapEditor.isActive('highlight')"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHighlight().run() : null"
        icon-type="ri:mark-pen-fill"
        :tooltip-text="$t('tiptap.marker1')"
      />
      <LazyEditNormalButtons
        :is-active="tiptapEditor.isActive('highlight', { color: '#ffc078' })"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHighlight({ color: '#ffc078' }).run() : null"
        icon-type="ri:mark-pen-line"
        :tooltip-text="$t('tiptap.marker2')"
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

</script>
