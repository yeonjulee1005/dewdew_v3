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
          <Icon name="ri:more-line" />
        </el-button>
      </template>
      <LazyEditSpecialButtons
        v-if="fullOption"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setHorizontalRule().run() : null"
        icon-type="ri:separator"
        :tooltip-text="$t('tiptap.separator')"
      />
      <LazyEditNormalButtons
        :is-active="false"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().setHardBreak().run() : null"
        icon-type="ri:corner-down-left-line"
        :tooltip-text="$t('tiptap.moreLine')"
      />
      <LazyEditNormalButtons
        :is-active="tiptapEditor.isActive('code')"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleCode().run() : null"
        icon-type="ri:code-fill"
        :tooltip-text="$t('tiptap.code')"
      />
      <LazyEditNormalButtons
        :is-active="tiptapEditor.isActive('codeBlock')"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleCodeBlock().run() : null"
        icon-type="ri:code-box-line"
        :tooltip-text="$t('tiptap.codeBlock')"
      />
      <LazyEditSpecialButtons
        v-if="fullOption"
        :disabled="!tiptapEditor.can().chain().focus().undo().run()"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().undo().run() : null"
        icon-type="ri:arrow-go-back-line"
        :tooltip-text="$t('tiptap.goBack')"
      />
      <LazyEditSpecialButtons
        v-if="fullOption"
        :disabled="!tiptapEditor.can().chain().focus().redo().run()"
        :action="() => tiptapEditor ? tiptapEditor.chain().focus().redo().run() : null"
        icon-type="ri:arrow-go-forward-line"
        :tooltip-text="$t('tiptap.goForward')"
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
