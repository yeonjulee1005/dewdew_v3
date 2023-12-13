<template>
  <DDPopover mode="hover">
    <AButton
      use-icon
      button-size="xs"
      icon-name="ri:list-settings-line"
    />
    <template #panel>
      <div class="flex gap-2">
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('bulletList')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleBulletList().run() : null"
          icon-type="ri:list-unordered"
          :tooltip-text="$t('tiptap.dotList')"
        />
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('orderedList')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleOrderedList().run() : null"
          icon-type="ri:list-ordered"
          :tooltip-text="$t('tiptap.list')"
        />
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('taskList')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleTaskList().run() : null"
          icon-type="ri:task-line"
          :tooltip-text="$t('tiptap.tasks')"
        />
        <LazyEditNormalButtons
          v-if="fullOption"
          :is-active="tiptapEditor.isActive('blockquote')"
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().toggleBlockquote().run() : null"
          icon-type="ri:double-quotes-l"
          :tooltip-text="$t('tiptap.quotes')"
        />
      </div>
    </template>
  </DDPopover>
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
