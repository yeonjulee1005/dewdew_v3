<template>
  <DDPopover :mode="isDesktop ? 'click' : 'hover'">
    <AButton
      use-icon
      button-size="xs"
      icon-name="ri:pen-nib-line"
    />
    <template #panel>
      <div class="flex gap-2">
        <EditNormalButtons
          :is-active="tiptapEditor.isActive('underline')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleUnderline().run() : null"
          icon-type="ri:underline"
          :tooltip-text="$t('tiptap.underline')"
        />
        <EditNormalButtons
          :is-active="tiptapEditor.isActive('strike')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleStrike().run() : null"
          icon-type="ri:strikethrough-2"
          :tooltip-text="$t('tiptap.strikethrough')"
        />
        <EditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('highlight')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHighlight().run() : null"
          icon-type="ri:mark-pen-fill"
          :tooltip-text="$t('tiptap.marker1')"
        />
        <EditNormalButtons
          :is-active="tiptapEditor.isActive('highlight', { color: '#ffc078' })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHighlight({ color: '#ffc078' }).run() : null"
          icon-type="ri:mark-pen-line"
          :tooltip-text="$t('tiptap.marker2')"
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
