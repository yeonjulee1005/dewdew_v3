<template>
  <DDPopover :mode="isDesktop ? 'click' : 'hover'">
    <AButton
      use-icon
      button-size="xs"
      icon-name="ri:attachment-2"
    />
    <template #panel>
      <div class="flex gap-2">
        <LazyEditNormalButtons
          :is-active="tiptapEditor.isActive('link')"
          :action="() => tiptapEditor ? tiptapLinkGroupEmits('open-hyper-link') : null"
          icon-type="ri:link"
          :tooltip-text="$t('tiptap.link')"
        />
        <LazyEditNormalButtons
          :is-active="tiptapEditor.isActive('link')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().unsetLink().run() : null"
          icon-type="ri:link-unlink"
          :tooltip-text="$t('tiptap.unlink')"
        />
        <LazyEditNormalButtons
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

const tiptapLinkGroupEmits = defineEmits([
  'open-hyper-link',
  'open-youtube-link'
])

</script>
