<template>
  <DDPopover :mode="isDesktop ? 'click' : 'hover'">
    <AButton
      use-icon
      button-size="xs"
      icon-name="ri:table-2"
    />
    <template #panel>
      <div class="flex gap-2">
        <EditNormalButtons
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() : null"
          icon-type="ri:table-2"
          :tooltip-text="$t('tiptap.createTable')"
        />
        <EditNormalButtons
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().addColumnBefore().run() : null"
          icon-type="ri:layout-left-fill"
          :tooltip-text="$t('tiptap.addColumnBefore')"
        />
        <EditNormalButtons
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().addColumnAfter().run() : null"
          icon-type="ri:layout-right-fill"
          :tooltip-text="$t('tiptap.addColumnAfter')"
        />
        <EditNormalButtons
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().deleteColumn().run() : null"
          icon-type="ri:delete-column"
          :tooltip-text="$t('tiptap.deleteColumn')"
        />
        <EditNormalButtons
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().addRowBefore().run() : null"
          icon-type="ri:layout-top-fill"
          :tooltip-text="$t('tiptap.addRowBefore')"
        />
        <EditNormalButtons
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().addRowAfter().run() : null"
          icon-type="ri:layout-bottom-fill"
          :tooltip-text="$t('tiptap.addRowAfter')"
        />
        <EditNormalButtons
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().deleteRow().run() : null"
          icon-type="ri:delete-row"
          :tooltip-text="$t('tiptap.deleteRow')"
        />
        <EditNormalButtons
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().mergeOrSplit().run() : null"
          icon-type="ri:merge-cells-horizontal"
          :tooltip-text="$t('tiptap.mergeOrSplit')"
        />
        <EditNormalButtons
          :action="() => tiptapEditor ? tiptapEditor.chain().focus().deleteTable().run() : null"
          icon-type="ci:table-delete"
          :tooltip-text="$t('tiptap.deleteTable')"
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
