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
    <div class="flex flex-column gap-6">
      <DDFormGroup :label="$t('texts.upload')">
        <DDInput
          type="file"
          @change="uploadFile"
        >
          <template #trailing>
            <Icon name="line-md:cloud-upload-outline-loop" />
          </template>
        </DDInput>
      </DDFormGroup>
      <nuxt-img
        v-if="exportUrl"
        class="image-preview"
        :src="exportUrl"
        width="300"
        height="200"
        fit="cover"
        alt="image-prev"
        :draggable="false"
        @contextmenu.prevent
      />
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
            use-leading
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
    </div>
  </ADialog>
</template>

<script setup lang="ts">

const { t } = useLocale()

const { loadStorage, uploadStorage } = useFetchComposable()

const toast = useToast()

const dialogTrigger = defineModel('dialogTrigger', {
  type: Boolean,
  default: false
})

const emits = defineEmits([
  'close:dialog',
  'submit:image'
])

const exportUrl = ref('')
const hyperLink = ref('')
const imageHyperLinkTrigger = ref(false)
const limitType = ['image/jpeg', 'image/jpg', 'image/webp', 'image/png', 'image/svg+xml']

const genUid = () => {
  return (new Date().getTime() + Math.random().toString(36).substring(2, 16))
}

const uploadFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target && target.files && target.files[0]) {
    const file = target.files[0]
    if (!limitType.includes(file.type)) {
      toast.add({ title: t('messages.imageUploadFormat'), color: 'violet', timeout: 3000 })
    } else if (file.size / 1024 / 1024 > 5) {
      toast.add({ title: t('messages.imageUploadSmallSize'), color: 'violet', timeout: 3000 })
    } else {
      uploadImage(file)
    }
  }
}

const uploadImage = async (file:File) => {
  const fileExt = file.name.split('.').pop()
  const filePath = `${genUid()}.${fileExt}`

  const uploadError = await uploadStorage('tech', filePath, file)

  if (uploadError) {
    toast.add({ title: String(uploadError), color: 'rose', timeout: 3000 })
  }
  toast.add({ title: t('messages.successImageUpload'), color: 'emerald', timeout: 3000 })
  await downloadImage(filePath)
}

const downloadImage = async (imageName:string) => {
  if (!imageName) { return }

  exportUrl.value = await loadStorage('tech', imageName)
}

const submitImage = () => {
  if (!exportUrl.value) {
    toast.add({ title: t('messages.imageRequire'), color: 'rose', timeout: 3000 })
    return
  }
  emits('submit:image', exportUrl.value, imageHyperLinkTrigger.value ? hyperLink.value : '')
  toast.add({ title: t('messages.successImageUpload'), color: 'emerald', timeout: 3000 })
  closeDialog(false)
}

const closeDialog = (trigger:boolean) => {
  emits('close:dialog', trigger)
}

</script>
