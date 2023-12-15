<template>
  <ADialog
    :dialog-trigger="dialogTrigger"
    :title="$t('tiptap.dialog.imageUploadTitle')"
    :double-first-text="$t('texts.save')"
    :double-second-text="$t('texts.close')"
    @click-first-button="submitImage"
    @click-second-button="closeDialog(false)"
    @close-dialog="closeDialog(false)"
  >
    <el-upload
      ref="imageUpload"
      class="upload-component flex flex-column"
      action="#"
      :limit="1"
      list-type="picture"
      :on-exceed="handleExceed"
      :http-request="changeImage"
    >
      <template #trigger>
        <DDTooltip :text="$t('texts.upload')">
          <Icon
            class="save-icon"
            name="ri:upload-cloud-2-line"
          />
        </DDTooltip>
      </template>
      <template #file="{ file }">
        <div class="upload-file-information">
          <nuxt-img
            class="upload-thumbnail"
            :src="file.url"
            loading="lazy"
            alt="avatar"
          />
        </div>
      </template>
    </el-upload>
    <DDInput
      v-if="imageHyperLinkTrigger"
      v-model="hyperLink"
      :placeholder="$t('placeholder.inputLink')"
      color="violet"
      size="xl"
      aria-label="link"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <AButton
          v-show="hyperLink !== ''"
          button-variant="ghost"
          use-icon
          icon-name="line-md:remove"
          :icon-size="18"
          @click:button="() => hyperLink = ''"
        />
      </template>
    </DDInput>
    <DDCheckbox
      v-model="imageHyperLinkTrigger"
      color="violet"
      :label="imageHyperLinkTrigger ? $t('texts.noUse') : $t('texts.insertLink')"
    />
  </ADialog>
</template>

<script setup lang="ts">
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'

const imageUpload = ref<UploadInstance>()

const client = useSupabaseClient<SupabaseDataBase>()

const { t } = useLocale()

const { notify } = useAlarm()

withDefaults(
  defineProps<{
    dialogTrigger?: boolean
  }>(),
  {
    dialogTrigger: false
  }
)

const emits = defineEmits([
  'close:dialog',
  'submit:image'
])

const exportUrl = ref('')
const hyperLink = ref('')
const imageHyperLinkTrigger = ref(false)

const genUid = () => {
  return (new Date().getTime() + Math.random().toString(36).substring(2, 16))
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  fileValidation(files[0].size, files[0].type)
  imageUpload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  imageUpload.value!.handleStart(file)
}

const changeImage = async (evt:any) => {
  if (!fileValidation(evt.file.size, evt.file.type)) {
    imageUpload.value!.clearFiles()
    return
  }
  await uploadImage(evt.file)
}

const fileValidation = (size:number, type:string) => {
  let fileType = false
  type === 'image/jpeg' || type === 'image/png' || type === 'image/webp' || type === 'image/svg+xml' ? fileType = true : fileType = false
  if (!fileType) {
    return fileFailedProcess(t('messages.imageUploadFormat'))
  } else if (size / 1024 / 1024 > 5) {
    return fileFailedProcess(t('messages.imageUploadSmallSize'))
  } else {
    return true
  }
}

const fileFailedProcess = (message:string) => {
  imageUpload.value!.clearFiles()
  notify('', 'error', message, true, 3000, 0)
  return false
}

const uploadImage = async (file:File) => {
  const fileExt = file.name.split('.').pop()
  const filePath = `${genUid()}.${fileExt}`
  const { error: uploadError } = await client.storage
    .from('tech')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })
  console.log(filePath)
  if (uploadError) {
    notify('', 'error', String(uploadError), true, 3000, 0)
  }
  notify('', 'success', t('messages.successImageUpload'), true, 3000, 0)
  await downloadImage(filePath)
}

const downloadImage = async (imageName:string) => {
  if (!imageName) { return }
  const { data } = await client.storage
    .from('tech')
    .getPublicUrl(imageName)

  exportUrl.value = data.publicUrl
}

const submitImage = () => {
  if (!exportUrl.value) {
    notify('', 'error', t('messages.imageRequire'), true, 3000, 0)
    return
  }
  emits('submit:image', exportUrl.value, imageHyperLinkTrigger.value ? hyperLink.value : '')
  notify('', 'success', t('messages.successImageUpload'), true, 3000, 0)
  closeDialog(false)
}

const closeDialog = (trigger:boolean) => {
  emits('close:dialog', trigger)
}

</script>
