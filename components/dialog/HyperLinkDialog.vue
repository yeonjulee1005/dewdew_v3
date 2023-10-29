<template>
  <ADialog
    :dialog-trigger="visibleSync"
    :hide-single-button="true"
    :custom-class="customClass"
    :title="title"
    :double-first-text="doubleFirstText"
    :double-second-text="doubleSecondText"
    width="360px"
    @click-first-button="submitLink(hyperLinkFormRef)"
    @click-second-button="closeDialog"
    @close-dialog="closeDialog"
  >
    <el-form
      ref="hyperLinkFormRef"
      :model="hyperLinkForm"
      :rules="hyperLinkRules"
      class="hyper-link-form mt-20"
      label-position="top"
      @submit.prevent
    >
      <el-form-item
        :label="$t('tiptap.link')"
        prop="link"
      >
        <el-input
          v-model="hyperLinkForm.link"
          :placeholder="$t('placeholder.inputLink')"
          size="large"
          clearable
          @keyup.enter="submitLink(hyperLinkFormRef)"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const hyperLinkFormRef = ref<FormInstance>()

const { t } = useLocale()

const { checkHyperLink } = useUi()
const { notify } = useAlarm()

const hyperLinkForm = reactive({
  link: ''
})
const visibleSync = ref(false)

const validateLink = (_rule:any, value:any, callback:any) => {
  if (!value) {
    callback(new Error(t('messages.linkRequire')))
  } else if (!checkHyperLink(value)) {
    callback(new Error(t('messages.linkFormat')))
  } else {
    callback()
  }
}

const hyperLinkRules = reactive<FormRules>({
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
  'close',
  'submit-link'
])

watchEffect(() => {
  visibleSync.value = props.visible
})

const submitLink = async (formEl:FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      emits('submit-link', hyperLinkForm.link)
      closeDialog(false)
      formEl.resetFields()
    } else {
      notify('', 'error', t('messages.failed'), true, 3000, 0)
    }
  })
}

const closeDialog = (trigger:boolean) => {
  emits('close', trigger)
  hyperLinkForm.link = ''
}

</script>
