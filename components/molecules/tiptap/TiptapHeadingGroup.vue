<template>
  <DDPopover :mode="isDesktop ? 'click' : 'hover'">
    <AButton
      use-icon
      button-size="xs"
      icon-name="ri:heading"
    />
    <template #panel>
      <div class="flex gap-2">
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('heading', { level: 1 })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHeading({ level: 1 }).run() : null"
          icon-type="ri:h-1"
          :tooltip-text="$t('tiptap.h1')"
        />
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('heading', { level: 2 })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHeading({ level: 2 }).run() : null"
          icon-type="ri:h-2"
          :tooltip-text="$t('tiptap.h2')"
        />
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('heading', { level: 3 })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHeading({ level: 3 }).run() : null"
          icon-type="ri:h-3"
          :tooltip-text="$t('tiptap.h3')"
        />
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('heading', { level: 4 })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHeading({ level: 4 }).run() : null"
          icon-type="ri:h-4"
          :tooltip-text="$t('tiptap.h4')"
        />
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('heading', { level: 5 })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHeading({ level: 5 }).run() : null"
          icon-type="ri:h-5"
          :tooltip-text="$t('tiptap.h5')"
        />
        <LazyEditNormalButtons
          v-if="fullOption"
          :editor="tiptapEditor"
          :is-active="tiptapEditor.isActive('heading', { level: 6 })"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleHeading({ level: 6 }).run() : null"
          icon-type="ri:h-6"
          :tooltip-text="$t('tiptap.h6')"
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
