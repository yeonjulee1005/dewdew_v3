<template>
  <div class="flex flex-column flex-align-center gap-6">
    <DDFormGroup
      :label="$t('colorsTranslate.uploadFile')"
      :help="props.fileTypeAlarm.concat(', ', props.fileSizeAlarm)"
    >
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
      v-if="previewFile"
      class="image-preview"
      :src="previewFile"
      width="300"
      height="200"
      fit="cover"
      alt="image-prev"
      :draggable="false"
      @contextmenu.prevent
    />
  </div>
</template>

<script setup lang="ts">

const toast = useToast()

const props = withDefaults(
  defineProps<{
    draggable?: boolean,
    customClass?: string,
    fileTypeAlarm?: string,
    fileSizeAlarm?: string,
    limitType?: string[],
    limitWidth?: number,
    limitHeight?: number,
    limitSize?: number
  }>(),
  {
    draggable: true,
    customClass: 'upload-drag-files',
    fileTypeAlarm: '',
    fileSizeAlarm: '',
    limitType: () => [],
    limitWidth: 0,
    limitHeight: 0,
    limitSize: 0
  }
)

const previewFile = ref('')

const uploadFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target && target.files && target.files[0]) {
    const file = target.files[0]
    if (!props.limitType.includes(file.type)) {
      toast.add({ title: props.fileTypeAlarm, color: 'violet', timeout: 3000 })
    } else if (file.size / props.limitHeight / props.limitWidth > props.limitSize) {
      toast.add({ title: props.fileSizeAlarm, color: 'violet', timeout: 3000 })
    } else {
      previewFile.value = URL.createObjectURL(file)
    }
  }
}

</script>
