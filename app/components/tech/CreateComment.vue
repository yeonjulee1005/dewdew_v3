<template>
  <div class="article-create-comment flex flex-column items-end mb-40">
    <DDForm
      :schema="schema"
      :state="formData"
      class="create-form space-y-4"
      @submit="onSubmit"
    >
      <DDFormGroup
        :label="$t('tech.name')"
        name="name"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.name"
          :placeholder="$t('placeholder.inputName')"
          color="orange"
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
        :label="$t('tech.content')"
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
        :label="$t('tech.password')"
        name="password"
        size="xl"
        required
      >
        <DDInput
          v-model="formData.password"
          :placeholder="$t('placeholder.inputPassword')"
          color="orange"
          size="lg"
          type="password"
          clearable
          aria-label="password"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <div class="flex justify-center space-x-1">
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
    <AButton
      custom-class="w-[fit-content] mt-4 mb-20"
      button-size="lg"
      use-leading
      icon-name="line-md:arrow-small-left"
      :button-text="$t('archives.back')"
      @click:button="router.back()"
    />
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const { t } = useLocale()
const router = useRouter()

const { passwordRegex, generateCommentName } = useUi()

const emits = defineEmits([
  'create-comment',
])

const schema = object({
  name: string()
    .required(t('messages.titleRequire'))
    .min(2, t('messages.nameFormat')),
  password: string()
    .required(t('messages.passwordRequire'))
    .matches(passwordRegex, t('messages.passwordFormat')),
  message: string()
    .required(t('messages.contentRequire')),
})

type Schema = InferType<typeof schema>

const formData = ref({
  name: generateCommentName(),
  message: '',
  password: '',
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (!event.isTrusted) {
    return
  }
  emits('create-comment', formData.value)
}
</script>
