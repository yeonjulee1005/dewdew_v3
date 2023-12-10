import { injectSpeedInsights } from '@vercel/speed-insights'

export default defineNuxtPlugin(() => {
  injectSpeedInsights({
    framework: 'nuxt'
  })
})
