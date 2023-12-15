import { ElTimeline, ElTimelineItem, ElUpload } from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(ElTimeline.name ?? 'el-timeline', ElTimeline)
  nuxtApp.vueApp.component(ElTimelineItem.name ?? 'el-timeline-item', ElTimelineItem)
  nuxtApp.vueApp.component(ElUpload.name ?? 'el-upload', ElUpload)
})
