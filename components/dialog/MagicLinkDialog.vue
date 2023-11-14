<template>
  <ADialog
    :dialog-trigger="visibleSync"
    :custom-class="customClass"
    :draggable="false"
    :title="title"
    :width="mobileDevice ? '90dvw' : '400px'"
    hide-single-button
    :double-first-text="doubleFirstText"
    :double-second-text="doubleSecondText"
    @click-first-button="submitEmail(magicLinkFormRef)"
    @click-second-button="closeDialog"
    @close-dialog="closeDialog"
  >
    <el-form
      ref="magicLinkFormRef"
      :model="magicLinkForm"
      :rules="magicLinkRules"
      class="email-form mt-20"
      label-position="top"
      @submit.prevent
    >
      <el-form-item
        :label="$t('texts.magicLink')"
        prop="email"
      >
        <el-input
          v-model="magicLinkForm.email"
          :placeholder="$t('placeholder.inputEmail')"
          type="email"
          size="large"
          clearable
          @keyup.enter="submitEmail(magicLinkFormRef)"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const magicLinkFormRef = ref<FormInstance>()

const { width } = useWindowSize()
const { t } = useLocale()

const { checkEmail } = useUi()
const { notification } = useDeviceSeparator()

const mobileDevice = computed(() => width.value < 420)
const magicLinkForm = reactive({
  email: ''
})
const visibleSync = ref(false)

const validateEmail = (_rule:any, value:any, callback:any) => {
  if (value === '') {
    callback(new Error(t('messages.emailRequire')))
  } else if (!checkEmail(value)) {
    return callback(new Error(t('messages.emailFormat')))
  } else {
    callback()
  }
}

const magicLinkRules = reactive<FormRules>({
  email: [{ required: true, validator: validateEmail, trigger: 'blur' }]
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
  'close-dialog',
  'submit-email'
])

watchEffect(() => {
  visibleSync.value = props.visible
})

const submitEmail = async (formEl:FormInstance | undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      emits('submit-email', magicLinkForm.email)
      closeDialog()
    } else {
      notification(width.value, t('placeholder.inputEmail'), '', 'error', false, true, 1500, 80)
    }
  })
}

const closeDialog = () => {
  magicLinkForm.email = ''
  emits('close-dialog')
}

</script>
