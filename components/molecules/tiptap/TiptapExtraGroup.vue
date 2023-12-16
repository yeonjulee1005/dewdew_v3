<template>
  <DDPopover :mode="isDesktop ? 'click' : 'hover'">
    <AButton
      use-icon
      button-size="xs"
      icon-name="ri:more-line"
    />
    <template #panel>
      <div class="flex gap-2">
        <EditSpecialButtons
          v-if="fullOption"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().setHorizontalRule().run() : null"
          icon-type="ri:separator"
          :tooltip-text="$t('tiptap.separator')"
        />
        <EditNormalButtons
          :is-active="false"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().setHardBreak().run() : null"
          icon-type="ri:corner-down-left-line"
          :tooltip-text="$t('tiptap.moreLine')"
        />
        <EditNormalButtons
          :is-active="tiptapEditor.isActive('code')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleCode().run() : null"
          icon-type="ri:code-fill"
          :tooltip-text="$t('tiptap.code')"
        />
        <EditNormalButtons
          :is-active="tiptapEditor.isActive('codeBlock')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleCodeBlock().run() : null"
          icon-type="ri:code-box-line"
          :tooltip-text="$t('tiptap.codeBlock')"
        />
        <EditSpecialButtons
          v-if="fullOption"
          :disabled="!tiptapEditor.can().chain().focus().undo().run()"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().undo().run() : null"
          icon-type="ri:arrow-go-back-line"
          :tooltip-text="$t('tiptap.goBack')"
        />
        <EditSpecialButtons
          v-if="fullOption"
          :disabled="!tiptapEditor.can().chain().focus().redo().run()"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().redo().run() : null"
          icon-type="ri:arrow-go-forward-line"
          :tooltip-text="$t('tiptap.goForward')"
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

</script>
