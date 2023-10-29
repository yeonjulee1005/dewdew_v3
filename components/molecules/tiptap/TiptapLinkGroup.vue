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
          <Icon name="ri:attachment-2" />
        </el-button>
      </template>
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

const tiptapLinkGroupEmits = defineEmits([
  'open-hyper-link',
  'open-youtube-link'
])

</script>
