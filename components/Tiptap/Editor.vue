<template>
  <div
    v-if="editor"
    class="tiptap-editor bg-orange-100 dark:bg-orange-50/0 border-2 border-orange-300 dark:border-orange-400 rounded-lg"
  >
    <div class="tiptap-editor__header gap-2 border-b-2 border-orange-300 dark:border-orange-400">
      <TiptapGroupHeading
        v-if="!commentOption"
        :tiptap-editor="editor"
        :full-option="fullOption"
      />
      <TiptapGroupTextStyle
        :tiptap-editor="editor"
        :full-option="fullOption"
      />
      <TiptapGroupStroke
        v-if="!commentOption"
        :tiptap-editor="editor"
        :full-option="fullOption"
      />
      <TiptapGroupTextAlign
        v-if="!commentOption"
        :tiptap-editor="editor"
        :full-option="fullOption"
      />
      <TiptapGroupTextList
        v-if="!commentOption"
        :tiptap-editor="editor"
        :full-option="fullOption"
      />
      <TiptapEditNormalButtons
        v-if="!commentOption"
        :is-active="false"
        :action="() => editor ? imageUploadDialogTrigger = true : null"
        icon-type="ri:image-2-line"
        :tooltip-text="$t('tiptap.image')"
      />
      <TiptapGroupLink
        v-if="!commentOption"
        :tiptap-editor="editor"
        :full-option="fullOption"
        @open-hyper-link="() => hyperLinkDialogTrigger = true"
        @open-youtube-link="() => youtubeLinkDialogTrigger = true"
      />
      <TiptapGroupTable
        v-if="!commentOption"
        :tiptap-editor="editor"
        :full-option="fullOption"
      />
      <TiptapGroupExtra
        v-if="!commentOption"
        :tiptap-editor="editor"
        :full-option="fullOption"
      />
    </div>
    <bubble-menu
      class="bubble-menu flex gap-2"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
    >
      <TiptapEditNormalButtons
        :is-active="editor.isActive('bold')"
        :action="() => editor ? editor.chain().focus().toggleBold().run() : null"
        icon-type="ri:bold"
        :tooltip-text="$t('tiptap.bold')"
        :tooltip-trigger="false"
      />
      <TiptapEditNormalButtons
        :is-active="editor.isActive('underline')"
        :action="() => editor ? editor.chain().focus().toggleUnderline().run() : null"
        icon-type="ri:underline"
        :tooltip-text="$t('tiptap.underline')"
        :tooltip-trigger="false"
      />
      <TiptapEditNormalButtons
        :is-active="editor.isActive('highlight')"
        :action="() => editor ? editor.chain().focus().toggleHighlight().run() : null"
        icon-type="ri:mark-pen-fill"
        :tooltip-text="$t('tiptap.marker1')"
        :tooltip-trigger="false"
      />
      <TiptapEditNormalButtons
        :is-active="editor.isActive('link')"
        :action="() => editor ? hyperLinkDialogTrigger = true : null"
        icon-type="ri:link"
        :tooltip-text="$t('tiptap.link')"
        :tooltip-trigger="false"
      />
      <TiptapEditNormalButtons
        :is-active="editor.isActive('link')"
        :action="() => editor ? editor.chain().focus().unsetLink().run() : null"
        icon-type="ri:link-unlink"
        :tooltip-text="$t('tiptap.unlink')"
        :tooltip-trigger="false"
      />
      <TiptapEditNormalButtons
        v-if="fullOption"
        :is-active="editor.isActive({ textAlign: 'center' })"
        :action="() => editor ? editor.chain().focus().setTextAlign('center').run() : null"
        icon-type="ri:align-center"
        :tooltip-text="$t('tiptap.alignCenter')"
        :tooltip-trigger="false"
      />
    </bubble-menu>
    <editor-content
      class="tiptap-editor__content"
      :editor="editor"
    />
    <div class="character-count flex flex-column">
      <span>
        {{ editor.storage.characterCount.characters() + ' / '.concat(String(textLimit), $t('tiptap.characters')) }}
      </span>
      <span>
        {{ editor.storage.characterCount.words() + ' '.concat($t('tiptap.words')) }}
      </span>
    </div>
    <DialogHyperLink
      v-model:dialog-trigger="hyperLinkDialogTrigger"
      @submit:link="submitHyperLink"
      @close:dialog="(trigger:boolean) => hyperLinkDialogTrigger = trigger"
    />
    <DialogYoutubeLink
      v-model:dialog-trigger="youtubeLinkDialogTrigger"
      @submit:link="submitYoutubeLink"
      @close:dialog="(trigger:boolean) => youtubeLinkDialogTrigger = trigger"
    />
    <DialogImageUpload
      v-model:dialog-trigger="imageUploadDialogTrigger"
      @submit:image="submitImage"
      @close:dialog="(trigger:boolean) => imageUploadDialogTrigger = trigger"
    />
  </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import { CodeBlock } from '@tiptap/extension-code-block'
import starterKit from '@tiptap/starter-kit'
import textStyle from '@tiptap/extension-text-style'
import { Youtube } from '@tiptap/extension-youtube'
import { Color } from '@tiptap/extension-color'
import placeholder from '@tiptap/extension-placeholder'
import characterCount from '@tiptap/extension-character-count'
import underline from '@tiptap/extension-underline'
import textAlign from '@tiptap/extension-text-align'
import highlight from '@tiptap/extension-highlight'
import focus from '@tiptap/extension-focus'
import taskItem from '@tiptap/extension-task-item'
import taskList from '@tiptap/extension-task-list'
import link from '@tiptap/extension-link'
import table from '@tiptap/extension-table'
import tableCell from '@tiptap/extension-table-cell'
import tableHeader from '@tiptap/extension-table-header'
import tableRow from '@tiptap/extension-table-row'

const { t } = useLocale()
const { width: windowWidth } = useWindowSize()
const { BaseCustomMediaNode } = useTiptapImage()

const props = withDefaults(
  defineProps<{
    textData?: string
    textLimit?: number
    fullOption?: boolean
    commentOption?: boolean
  }>(),
  {
    textData: '',
    textLimit: 300,
    fullOption: false,
    commentOption: false,
  },
)

const emits = defineEmits([
  'update:model-value',
])

const editor = ref()

const hyperLinkDialogTrigger = ref(false)
const youtubeLinkDialogTrigger = ref(false)
const imageUploadDialogTrigger = ref(false)

watch(() => props.textData, (value) => {
  const isSame = editor.value.getHTML() === value
  if (!isSame) {
    editor.value.commands.setContent(value, false)
  }
})

onMounted(() => {
  editor.value = new Editor({
    content: props.textData,
    extensions: [
      starterKit.configure({
        codeBlock: false,
      }),
      placeholder.configure({
        placeholder: t('tiptap.placeholder'),
      }),
      characterCount.configure({
        limit: props.textLimit,
      }),
      CodeBlock,
      underline,
      textAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      highlight.configure({ multicolor: true }),
      focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      taskItem.configure({
        nested: true,
      }),
      taskList,
      link.configure({
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
        protocols: [
          'ftp',
          'mailto',
          {
            scheme: 'tel',
            optionalSlashes: true,
          },
        ],
      }),
      table.configure({
        resizable: true,
      }),
      tableRow,
      tableHeader,
      tableCell,
      textStyle,
      Youtube.configure({
        progressBarColor: 'white',
        interfaceLanguage: 'ko',
        modestBranding: true,
        width: 400,
        height: 280,
      }),
      BaseCustomMediaNode,
      Color,
    ],
    onUpdate: () => {
      emits('update:model-value', editor.value.getHTML(), editor.value.state.doc.textContent)
    },
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
  editor.value = null
})

const submitHyperLink = (link: string) => {
  link
    ? editor.value?.chain().focus().setLink({ href: link, target: '_blank' }).run()
    : editor.value?.chain().focus().unsetLink().run()
}

const submitYoutubeLink = (link: string) => {
  editor.value?.commands.setYoutubeVideo({
    src: link,
    width: windowWidth.value > 600 ? 400 : windowWidth.value - 100,
    height: windowWidth.value > 600 ? 280 : 200,
  })
}

const submitImage = (imageUrl: string, hyperLink: string) => {
  editor.value?.chain().focus().setImage({ src: imageUrl, href: hyperLink === '' ? undefined : hyperLink }).run()
}
</script>
