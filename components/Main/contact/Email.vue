<template>
  <div class="email flex flex-column flex-align-center">
    <div class="email-title">
      {{ props.formTitle }}
    </div>
    <DDForm
      :schema="schema"
      :state="formData"
      class="email-form mt-20 space-y-2"
      @submit="onSubmit"
    >
      <DDFormGroup
        label="Name"
        name="name"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.name"
          color="violet"
          :placeholder="$t('placeholder.inputName')"
          aria-label="name"
        />
      </DDFormGroup>
      <DDFormGroup
        label="E-mail"
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
      <DDFormGroup
        label="Message"
        name="message"
        size="xl"
        required
      >
        <DDTextarea
          v-model="formData.message"
          color="violet"
          :rows="5"
          variant="outline"
          resize
          padded
          aria-label="message"
          :placeholder="$t('placeholder.inputContent')"
        />
      </DDFormGroup>
      <AButton
        custom-class="submit-button"
        button-size="lg"
        :button-text="$t('texts.send')"
        type="submit"
      />
    </DDForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import { send } from '@emailjs/browser'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { t } = useLocale()

const toast = useToast()

const props = withDefaults(
  defineProps<{
    formTitle?: string,
    emailTemplate?: string,
    emailKey?: string
  }>(),
  {
    formTitle: '',
    emailTemplate: '',
    emailKey: ''
  }
)

const schema = object({
  name: string()
    .min(2, t('messages.nameFormat'))
    .max(20, t('messages.nameFormat'))
    .required(t('messages.nameRequire')),
  email: string()
    .email(t('messages.emailFormat'))
    .required(t('messages.emailRequire')),
  message: string()
    .min(20, t('messages.contentFormat'))
    .required(t('messages.contentRequire'))
})

type Schema = InferType<typeof schema>

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }

  await send('dewdew', props.emailTemplate, event.data, props.emailKey).then(() => {
    toast.add({ title: t('messages.successEmailSend'), color: 'emerald', timeout: 3000 })
  }).catch(() => {
    toast.add({ title: t('messages.failEmailSend'), color: 'rose', timeout: 3000 })
  })
}

</script>
