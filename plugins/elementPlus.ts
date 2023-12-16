import { ElUpload } from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(ElUpload.name ?? 'el-upload', ElUpload)
})
