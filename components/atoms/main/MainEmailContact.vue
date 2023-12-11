<template>
  <div class="email flex flex-column flex-align-center">
    <div class="email-title">
      {{ props.formTitle }}
    </div>
    <el-form
      ref="contactRuleFormRef"
      :model="contactRuleForm"
      :rules="rules"
      label-width="120px"
      class="email-form mt-20"
      label-position="top"
    >
      <el-form-item
        label="Name"
        prop="name"
      >
        <el-input
          v-model="contactRuleForm.name"
          :placeholder="$t('placeholder.inputName')"
        />
      </el-form-item>
      <el-form-item
        label="E-mail"
        prop="email"
      >
        <el-input
          v-model="contactRuleForm.email"
          :placeholder="$t('placeholder.inputEmail')"
          type="email"
        />
      </el-form-item>
      <el-form-item
        label="Message"
        prop="message"
      >
        <el-input
          v-model="contactRuleForm.message"
          :placeholder="$t('placeholder.inputContent')"
          :rows="5"
          :maxlength="2000"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          @click="submitForm(contactRuleFormRef)"
        >
          {{ $t('texts.send') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { send } from '@emailjs/browser'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useLocale()
const { checkEmail } = useUi()
const { notify } = useAlarm()

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

const contactRuleFormRef = ref<FormInstance>()

const contactRuleForm = reactive({
  name: '',
  email: '',
  message: ''
})

const validateEmail = (_rule:any, value:any, callback:any) => {
  if (value === '') {
    callback(new Error(t('messages.emailRequire')))
  } else if (!checkEmail(value)) {
    return callback(new Error(t('messages.emailFormat')))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [
    { required: true, message: t('messages.nameRequire'), trigger: 'blur' },
    { min: 2, max: 20, message: t('messages.nameFormat'), trigger: 'blur' }
  ],
  email: [
    { required: true, validator: validateEmail, trigger: 'blur' }
  ],
  message: [
    { required: true, message: t('messages.contentRequire'), trigger: 'blur' },
    { min: 20, message: t('messages.contentFormat'), trigger: 'blur' }
  ]
})

const submitForm = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid) => {
    if (valid) {
      send('dewdew', props.emailTemplate, contactRuleForm, props.emailKey).then(() => {
        notify('', 'success', t('messages.successEmailSend'), true, 3000, 0)
      }).catch(() => {
        notify('', 'error', t('messages.failEmailSend'), true, 3000, 0)
      })
    } else {
      notify('', 'error', t('messages.failEmailSend'), true, 3000, 0)
    }
  })
}

</script>
