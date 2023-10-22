import ElementPlus from 'element-plus'
import ko from 'element-plus/es/locale/lang/ko'

export default defineNuxtPlugin((nuxtApp) => {
  // ElementPlus
  nuxtApp.vueApp.use(ElementPlus, {
    locale: ko
    // size: 'small',
    // zIndex: 3000
  })
})
