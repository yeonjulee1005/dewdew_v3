<template>
  <el-upload
    :drag="props.draggable"
    :file-list="fileList"
    :class="props.customClass"
    action="fileUrl"
    :show-file-list="false"
    :auto-upload="false"
    :multiple="false"
    :on-change="changeBadgeImage"
  >
    <div v-if="previewFile">
      <nuxt-img
        class="image-preview"
        :src="previewFile"
        width="300"
        height="200"
        fit="cover"
        alt="image-prev"
      />
    </div>
    <el-icon
      v-else
      class="el-icon--upload flex-column"
    >
      <Icon name="line-md:cloud-upload-outline-loop" />
      <span class="el-upload__text">
        {{ $t('colorsTranslate.uploadFile') }}
        <span class="accent">
          {{ $t('colorsTranslate.dropperDesc') }}
        </span>
        {{ $t('colorsTranslate.checkDropper') }}
      </span>
    </el-icon>
    <template #tip>
      <span class="el-upload__tip">
        {{ props.fileTypeAlarm.concat(', ', props.fileSizeAlarm) }}
      </span>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadProps } from 'element-plus'

const { notify } = useAlarm()

const fileList = ref<UploadProps[]>([])
const previewFile = ref('')

const limitType = ['image/jpeg', 'image/jpg']

const props = withDefaults(
  defineProps<{
    draggable?: boolean,
    customClass?: string,
    fileTypeAlarm?: string,
    fileSizeAlarm?: string,
    limitWidth?: number,
    limitHeight?: number,
    limitSize?: number
  }>(),
  {
    draggable: true,
    customClass: 'upload-drag-files',
    fileTypeAlarm: '',
    fileSizeAlarm: '',
    limitWidth: 0,
    limitHeight: 0,
    limitSize: 0
  }
)

const changeBadgeImage: UploadProps['onChange'] = (file:any) => {
  let fileType = false
  limitType.includes(file.raw?.type) ? fileType = true : fileType = false
  if (!fileType) {
    notify('', 'warning', props.fileTypeAlarm, true, 3000, 0)
    fileList.value = []
  } else if (file?.size / props.limitHeight / props.limitWidth > props.limitSize) {
    notify('', 'warning', props.fileSizeAlarm, true, 3000, 0)
    fileList.value = []
  } else {
    previewFile.value = URL.createObjectURL(file.raw!)
  }
}

</script>
