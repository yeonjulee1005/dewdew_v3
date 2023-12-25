<template>
  <ADialog
    :dialog-trigger="dialogTrigger"
    :title="$t('tiptap.dialog.hyperLinkTitle')"
    :double-second-text="$t('texts.close')"
    hide-first-button
    @click-second-button="closeDialog"
    @close-dialog="closeDialog"
  >
    <DDForm
      :schema="schema"
      :state="formData"
      class="hyper-link-form mt-20 space-y-2"
      @submit="onSubmit"
    >
      <DDFormGroup
        :label="$t('tiptap.link')"
        name="hyperLink"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.hyperLink"
          color="violet"
          :placeholder="$t('placeholder.inputLink')"
          aria-label="hyperLink"
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

const { hyperLinkRegex } = useUi()

withDefaults(
  defineProps<{
    dialogTrigger?: boolean
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
  hyperLink: string()
    .required(t('messages.linkRequire'))
    .matches(hyperLinkRegex, t('messages.linkFormat'))
})

type Schema = InferType<typeof schema>

const formData = reactive({
  hyperLink: ''
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  emits('submit:link', formData.hyperLink)
  closeDialog(false)
}

const closeDialog = (trigger:boolean) => {
  emits('close:dialog', trigger)
  formData.hyperLink = ''
}

</script>
