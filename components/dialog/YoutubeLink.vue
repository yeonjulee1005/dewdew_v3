<template>
  <ADialog
    :dialog-trigger="dialogTrigger"
    :title="$t('tiptap.dialog.youtubeLinkTitle')"
    :double-second-text="$t('texts.close')"
    hide-first-button
    @click-second-button="closeDialog(false)"
    @close-dialog="closeDialog(false)"
  >
    <DDForm
      :schema="schema"
      :state="formData"
      class="youtube-link-form mt-20 space-y-2"
      @submit="onSubmit"
    >
      <DDFormGroup
        :label="$t('tiptap.youtube')"
        name="youtube"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.youtube"
          color="violet"
          :placeholder="$t('placeholder.inputYoutube')"
          aria-label="youtube"
        />
      </DDFormGroup>
      <AButton
        custom-class="submit-button"
        button-size="lg"
        :button-text="$t('texts.save')"
        type="submit"
      />
    </DDForm>
  </ADialog>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { t } = useLocale()

const { youtubeRegex } = useUi()

withDefaults(
  defineProps<{
    dialogTrigger?: boolean,
  }>(),
  {
    dialogTrigger: false
  }
)

const emits = defineEmits([
  'close:dialog',
  'submit:link'
])

const schema = object({
  youtube: string()
    .required(t('messages.youtubeRequire'))
    .matches(youtubeRegex, t('messages.youtubeFormat'))
})

type Schema = InferType<typeof schema>

const formData = reactive({
  youtube: ''
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  emits('submit:link', formData.youtube)
  closeDialog(false)
}

const closeDialog = (trigger:boolean) => {
  emits('close:dialog', trigger)
  formData.youtube = ''
}

</script>
