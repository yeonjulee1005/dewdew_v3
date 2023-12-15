<template>
  <ADialog
    :dialog-trigger="dialogTrigger"
    :title="$t('placeholder.inputEmail')"
    :double-second-text="$t('texts.close')"
    hide-first-button
    @click-second-button="closeDialog"
    @close-dialog="closeDialog"
  >
    <DDForm
      :schema="schema"
      :state="formData"
      class="email-form mt-20 space-y-2"
      @submit="onSubmit"
    >
      <DDFormGroup
        :label="$t('texts.magicLink')"
        name="email"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.email"
          color="violet"
          :placeholder="$t('placeholder.inputEmail')"
          aria-label="email"
        />
      </DDFormGroup>
      <AButton
        custom-class="submit-button"
        button-size="lg"
        :button-text="$t('texts.send')"
        type="submit"
      />
    </DDForm>
  </ADialog>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { t } = useLocale()
const { width } = useWindowSize()

const { notification } = useDeviceSeparator()

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
  'submit:email'
])


const schema = object({
  email: string()
    .email(t('messages.emailFormat'))
    .required(t('messages.emailRequire'))
})

type Schema = InferType<typeof schema>

const formData = reactive({
  email: ''
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  notification(width.value, t('messages.successEmailSend'), '', 'success', false, true, 1500, 80)
  emits('submit:email', formData.email)
  closeDialog()
}

const closeDialog = () => {
  emits('close:dialog')
}

</script>
