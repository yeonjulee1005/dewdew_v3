<template>
  <LazyADialog
    :dialog-trigger="props.createArticleTrigger"
    :hide-double-button="true"
    :hide-single-button="true"
    :title="props.title"
    custom-class="create-article-dialog"
    top="15vh"
    width="80vw"
    @close-dialog="emits('close-dialog')"
  >
    <el-form
      ref="createArticleRef"
      :model="createArticleData"
      :rules="createArticleRules"
      :label-width="80"
      @submit.prevent
    >
      <el-form-item
        :label="$t('tech.articleTitle')"
        prop="title"
      >
        <el-input
          v-model="createArticleData.title"
          label="title"
        />
      </el-form-item>
      <el-form-item :label="$t('tech.article')">
        <TextEditor
          :text-limit="300000"
          :full-option="true"
          @update:model-value="updateArticle"
        />
      </el-form-item>
      <el-form-item class="submit-form-item">
        <AButton
          custom-class="submit-button"
          button-variant="soft"
          button-size="lg"
          :button-text="$t('tech.write')"
          @click:button="submitArticle(createArticleRef)"
        />
      </el-form-item>
    </el-form>
  </LazyADialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useLocale()

const { notify } = useAlarm()

const createArticleRef = ref<FormInstance>()

const props = withDefaults(
  defineProps<{
    createArticleTrigger?: boolean,
    title?: string
  }>(),
  {
    createArticleTrigger: false,
    title: ''
  }
)

const emits = defineEmits([
  'create-article',
  'close-dialog'
])

const createArticleRules = reactive<FormRules>({
  title: [{ required: true, message: t('messages.articleRequire'), trigger: 'blur' }]
})

const createArticleData = reactive({
  title: '',
  desc: '',
  raw_article: '',
  like: 0
})

const updateArticle = (article:string, rawArticle:string) => {
  createArticleData.desc = article
  createArticleData.raw_article = rawArticle
}

const submitArticle = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid, _fields) => {
    if (valid) {
      emits('create-article', createArticleData)
    } else {
      notify('', 'warning', t('messages.titleRequire'), true, 3000, 0)
    }
  })
}

</script>
