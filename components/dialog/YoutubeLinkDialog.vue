<template>
  <ADialog
    :dialog-trigger="visibleSync"
    :hide-single-button="true"
    :custom-class="customClass"
    :title="title"
    :double-first-text="doubleFirstText"
    :double-second-text="doubleSecondText"
    width="360px"
    @click-first-button="submitLink(youtubeLinkFormRef)"
    @click-second-button="closeDialog(false)"
    @close-dialog="closeDialog(false)"
  >
    <el-form
      ref="youtubeLinkFormRef"
      :model="youtubeLinkForm"
      :rules="youtubeLinkRules"
      class="youtube-link-form mt-20"
      label-position="top"
      @submit.prevent
    >
      <el-form-item
        :label="$t('tiptap.youtube')"
        prop="link"
      >
        <el-input
          v-model="youtubeLinkForm.link"
          :placeholder="$t('placeholder.inputYoutube')"
          size="large"
          clearable
          @keyup.enter="submitLink(youtubeLinkFormRef)"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const youtubeLinkFormRef = ref<FormInstance>()

const { t } = useLocale()

const { checkYoutubeLink } = useUi()
const { notify } = useAlarm()

const validateLink = (_rule:any, value:any, callback:any) => {
  if (!value) {
    callback(new Error(t('messages.youtubeRequire')))
  } else if (!checkYoutubeLink(value)) {
    callback(new Error(t('messages.youtubeFormat')))
  } else {
    callback()
  }
}

const youtubeLinkRules = reactive<FormRules>({
  link: [{ required: true, validator: validateLink, trigger: 'blur' }]
})

const props = withDefaults(
  defineProps<{
    visible?: boolean,
    customClass?: string,
    title?: string,
    doubleFirstText?: string,
    doubleSecondText?: string
  }>(),
  {
    visible: false,
    customClass: '',
    title: '',
    doubleFirstText: '',
    doubleSecondText: ''
  }
)

const emits = defineEmits([
  'close:dialog',
  'submit:link'
])

const youtubeLinkForm = ref({
  link: ''
})

const visibleSync = computed({
  get: () => props.visible,
  set: (value) => {
    if (value) {
      visibleSync.value = value
    }
  }
})

const submitLink = async (formEl:FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      emits('submit:link', youtubeLinkForm.value.link)
      closeDialog(false)
      formEl.resetFields()
    } else {
      notify('', 'error', t('messages.failed'), true, 3000, 0)
    }
  })
}

const closeDialog = (trigger:boolean) => {
  emits('close:dialog', trigger)
  youtubeLinkForm.value.link = ''
}

</script>
