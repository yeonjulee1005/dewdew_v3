<template>
  <DDPopover :mode="isDesktop ? 'click' : 'hover'">
    <AButton
      use-leading
      button-size="xs"
      icon-name="ri:menu-add-line"
    />
    <template #panel>
      <div class="flex gap-2">
        <TiptapEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive({ textAlign: 'left' })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().setTextAlign('left').run() : null"
          icon-type="ri:align-left"
          :tooltip-text="$t('tiptap.alignLeft')"
        />
        <TiptapEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive({ textAlign: 'center' })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().setTextAlign('center').run() : null"
          icon-type="ri:align-center"
          :tooltip-text="$t('tiptap.alignCenter')"
        />
        <TiptapEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive({ textAlign: 'right' })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().setTextAlign('right').run() : null"
          icon-type="ri:align-right"
          :tooltip-text="$t('tiptap.alignRight')"
        />
        <TiptapEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive({ textAlign: 'justify' })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().setTextAlign('justify').run() : null"
          icon-type="ri:align-justify"
          :tooltip-text="$t('tiptap.alignJustify')"
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
