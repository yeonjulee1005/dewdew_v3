import { ElDialog, ElTimeline, ElTimelineItem, ElCard, ElEmpty, ElSpace, ElPagination, ElUpload, ElForm, ElFormItem, ElImage, ElInput } from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(ElDialog.name ?? 'el-dialog', ElDialog)
  nuxtApp.vueApp.component(ElCard.name ?? 'el-card', ElCard)
  nuxtApp.vueApp.component(ElTimeline.name ?? 'el-timeline', ElTimeline)
  nuxtApp.vueApp.component(ElTimelineItem.name ?? 'el-timeline-item', ElTimelineItem)
  nuxtApp.vueApp.component(ElEmpty.name ?? 'el-empty', ElEmpty)
  nuxtApp.vueApp.component(ElSpace.name ?? 'el-space', ElSpace)
  nuxtApp.vueApp.component(ElPagination.name ?? 'el-pagination', ElPagination)
  nuxtApp.vueApp.component(ElUpload.name ?? 'el-upload', ElUpload)
  nuxtApp.vueApp.component(ElForm.name ?? 'el-form', ElForm)
  nuxtApp.vueApp.component(ElFormItem.name ?? 'el-form-item', ElFormItem)
  nuxtApp.vueApp.component(ElImage.name ?? 'el-image', ElImage)
  nuxtApp.vueApp.component(ElInput.name ?? 'el-input', ElInput)
})
