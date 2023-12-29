<template>
  <div class="article-create-comment flex flex-column flex-align-end mb-40">
    <DDForm
      :schema="schema"
      :state="formData"
      class="create-form space-y-2"
      @submit="onSubmit"
    >
      <DDFormGroup
        :label="nameLabel"
        name="name"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.name"
          :placeholder="$t('placeholder.inputName')"
          color="violet"
          size="lg"
          aria-label="name"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <AButton
              button-variant="ghost"
              use-leading
              icon-name="charm:refresh"
              :icon-size="18"
              @click:button="formData.name = generateCommentName()"
            />
          </template>
        </DDInput>
      </DDFormGroup>
      <DDFormGroup
        :label="contentLabel"
        name="message"
        size="xl"
        required
      >
        <TiptapEditor
          :comment-option="true"
          @update:model-value="(article:string, _rawArticle:string) => formData.message = article"
        />
      </DDFormGroup>
      <DDFormGroup
        :label="passwordLabel"
        name="password"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.password"
          :placeholder="passwordLabel"
          color="violet"
          size="lg"
          type="password"
          clearable
          aria-label="password"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <div class="flex flex-justify-center space-x-1">
              <AButton
                v-show="formData.password !== ''"
                button-variant="ghost"
                use-leading
                icon-name="line-md:remove"
                :icon-size="18"
                @click:button="() => formData.password = ''"
              />
              <AButton
                :button-text="$t('tech.writeComment')"
                button-variant="ghost"
                type="submit"
              />
            </div>
          </template>
        </DDInput>
      </DDFormGroup>
      <AButton
        custom-class="submit-button"
        button-variant="soft"
        button-size="lg"
        :button-text="$t('tech.write')"
        type="submit"
      />
    </DDForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { t } = useLocale()

const { passwordRegex, generateCommentName } = useUi()

withDefaults(
  defineProps<{
    nameLabel?: string,
    contentLabel?: string,
    passwordLabel?: string
  }>(),
  {
    nameLabel: '이름',
    contentLabel: '내용',
    passwordLabel: '비밀번호'
  }
)

const emits = defineEmits([
  'create-comment'
])

const schema = object({
  name: string()
    .required(t('messages.titleRequire'))
    .min(2, t('messages.nameFormat')),
  password: string()
    .required(t('messages.passwordRequire'))
    .matches(passwordRegex, t('messages.passwordFormat')),
  message: string()
    .required(t('messages.contentRequire'))
})

type Schema = InferType<typeof schema>

const formData = reactive({
  name: generateCommentName(),
  message: '',
  password: ''
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) { return }
  emits('create-comment', formData)
}

</script>
