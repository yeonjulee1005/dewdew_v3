<template>
  <div class="article-create-comment flex flex-column flex-align-end mb-40">
    <el-form
      ref="createCommentRef"
      class="create-form"
      :model="createCommentData"
      :rules="createArticleRules"
      :label-width="80"
      label-position="top"
      @submit.prevent
    >
      <el-form-item
        :label="nameLabel"
        prop="name"
      >
        <el-input
          v-model="createCommentData.name"
          :maxlength="16"
          show-word-limit
          clearable
        >
          <template #append>
            <el-button @click="() => createCommentData.name = generateCommentName()">
              <Icon name="charm:refresh" />
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="contentLabel">
        <LazyTextEditor
          :comment-option="true"
          @update:model-value="(article:string, _rawArticle:string) => createCommentData.message = article"
        />
      </el-form-item>
      <el-form-item
        :label="passwordLabel"
        prop="password"
      >
        <el-input
          v-model="createCommentData.password"
          type="password"
          show-password
          clearable
        >
          <template #append>
            <el-button
              class="submit-button mt-20"
              @click="submitArticle(createCommentRef)"
            >
              {{ $t('tech.writeComment') }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useLocale()

const { notify } = useAlarm()
const { generateCommentName } = useUi()

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

const createCommentRef = ref<FormInstance>()

const createCommentData = ref<CreateComment>({
  name: generateCommentName(),
  message: '',
  password: ''
})

const validateName = (_rule:any, value:any, callback:any) => {
  if (value === '') {
    callback(new Error(t('messages.nameRequire')))
  } else {
    if (value < 2) {
      return callback(new Error(t('messages.nameFormat')))
    }
    callback()
  }
}

const validatePassword = (_rule:any, value:any, callback:any) => {
  const number = value.search(/[0-9]/g)
  const english = value.search(/[a-z]/g)
  const special = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
  if (value === '') {
    callback(new Error(t('messages.passwordRequire')))
  } else if (number < 0 || english < 0 || special < 0) {
    return callback(new Error(t('messages.passwordFormat')))
  } else {
    callback()
  }
}

const createArticleRules = reactive<FormRules>({
  name: [{ required: true, validator: validateName, trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})

const submitArticle = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid, _fields) => {
    if (valid && createCommentData.value.message) {
      emits('create-comment', createCommentData.value)
      setTimeout(() => {
        formEl.resetFields()
      }, 1000)
    } else {
      notify('', 'warning', t('messages.contentRequire'), true, 3000, 0)
    }
  })
}

</script>
