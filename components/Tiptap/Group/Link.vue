<template>
  <DDPopover :mode="isDesktop ? 'click' : 'hover'">
    <AButton
      use-leading
      button-size="xs"
      icon-name="ri:attachment-2"
    />
    <template #panel>
      <div class="flex gap-2">
        <TiptapEditNormalButtons
          :is-active="tiptapEditor.isActive('link')"
          :action="() => tiptapEditor ? tiptapLinkGroupEmits('open-hyper-link') : null"
          icon-type="ri:link"
          :tooltip-text="$t('tiptap.link')"
        />
        <TiptapEditNormalButtons
          :is-active="tiptapEditor.isActive('link')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().unsetLink().run() : null"
          icon-type="ri:link-unlink"
          :tooltip-text="$t('tiptap.unlink')"
        />
        <TiptapEditNormalButtons
          :is-active="false"
          :action="() => tiptapEditor ? tiptapLinkGroupEmits('open-youtube-link') : null"
          icon-type="ri:youtube-line"
          :tooltip-text="$t('tiptap.youtube')"
        />
      </div>
    </template>
  </DDPopover>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'

const { isDesktop } = useDevice()

withDefaults(
  defineProps<{
    tiptapEditor: Editor
    fullOption?: boolean
  }>(),
  {
    fullOption: false,
  },
)

const tiptapLinkGroupEmits = defineEmits([
  'open-hyper-link',
  'open-youtube-link',
])
</script>
