<template>
  <ADialog
    :dialog-trigger="passwordDialogTrigger"
    :hide-double-button="true"
    :hide-single-button="true"
    custom-class="auth-check-dialog"
    :title="title"
    top="30vh"
    width="360px"
    @close-dialog="closeDialog"
  >
    <el-form
      ref="passwordRef"
      :model="passwordData"
      :rules="passwordRules"
      :label-width="80"
      @submit.prevent
    >
      <el-form-item
        :label="$t('tech.password')"
        prop="password"
      >
        <el-input
          v-model="passwordData.password"
          type="password"
          show-password
          clearable
          class="mb-20"
          @keyup.enter="checkPassword(passwordRef)"
        >
          <template #append>
            <el-button @click="checkPassword(passwordRef)">
              <Icon name="line-md:coffee-filled" />
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useLocale()
const { notify } = useAlarm()

const passwordRef = ref<FormInstance>()

withDefaults(
  defineProps<{
    title?: string,
    passwordDialogTrigger?: boolean
  }>(),
  {
    title: '',
    passwordDialogTrigger: false
  }
)

const emits = defineEmits([
  'confirm-password',
  'close-dialog'
])

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

const passwordRules = reactive<FormRules>({
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})

const passwordData = ref({
  password: ''
})

const checkPassword = async (formEl:FormInstance|undefined) => {
  if (!formEl) { return }
  await formEl.validate((valid, _fields) => {
    if (valid) {
      emits('confirm-password', passwordData.value.password)
    } else {
      notify('', 'warning', t('messages.passwordFormat'), true, 3000, 0)
    }
  })
}

const closeDialog = () => {
  passwordData.value.password = ''
  emits('close-dialog')
}

</script>
