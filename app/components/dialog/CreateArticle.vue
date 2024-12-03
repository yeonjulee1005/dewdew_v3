<template>
  <ADialog
    :dialog-trigger="createArticleTrigger"
    :title="$t('messages.writeArticle')"
    hide-double-button
    @close-dialog="emits('close:dialog')"
  >
    <DDForm
      :schema="schema"
      :state="formData"
      class="space-y-2"
      @submit="onSubmit"
    >
      <DDFormGroup
        :label="$t('tech.articleTitle')"
        name="title"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.title"
          color="violet"
          :placeholder="$t('placeholder.inputTitle')"
          aria-label="title"
        />
      </DDFormGroup>
      <DDFormGroup
        :label="$t('tech.article')"
        name="desc"
        size="xl"
        required
      >
        <TiptapEditor
          :text-limit="300000"
          :full-option="true"
          @update:model-value="updateArticle"
        />
      </DDFormGroup>
      <AButton
        custom-class="submit-button"
        button-variant="soft"
        button-size="lg"
        :button-text="$t('tech.write')"
        type="submit"
      />
    </DDForm>
  </ADialog>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { t } = useLocale()

const createArticleTrigger = defineModel('dialogTrigger', {
  type: Boolean,
  default: false,
})

const emits = defineEmits([
  'create:article',
  'close:dialog',
])

const schema = object({
  title: string()
    .required(t('messages.titleRequire')),
  desc: string()
    .required(t('messages.articleRequire')),
})

type Schema = InferType<typeof schema>

const formData = reactive({
  title: '',
  desc: '',
  raw_article: '',
  like: 0,
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) {
    return
  }
  emits('create:article', formData)
}

const updateArticle = (article: string, rawArticle: string) => {
  formData.desc = article
  formData.raw_article = rawArticle
}
</script>
