<template>
  <ADialog
    :dialog-trigger="dialogTrigger"
    :title="$t('tech.password')"
    hide-double-button
    @close-dialog="closeDialog"
  >
    <DDForm
      :schema="schema"
      :state="formData"
      class="space-y-2"
      @submit="onSubmit"
    >
      <DDFormGroup
        :label="$t('tech.password')"
        name="password"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.password"
          color="violet"
          :placeholder="$t('placeholder.inputPassword')"
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

const { passwordRegex } = useUi()

withDefaults(
  defineProps<{
    dialogTrigger?: boolean
  }>(),
  {
    dialogTrigger: false
  }
)

const emits = defineEmits([
  'confirm-password',
  'close-dialog'
])

const schema = object({
  password: string()
    .required(t('messages.passwordRequire'))
    .matches(passwordRegex, t('messages.passwordFormat'))
})

type Schema = InferType<typeof schema>

const formData = reactive({
  password: ''
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  emits('confirm-password', formData.password)
  closeDialog()
}

const closeDialog = () => {
  formData.password = ''
  emits('close-dialog')
}

</script>
