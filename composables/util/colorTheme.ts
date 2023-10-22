import { useDark } from '@vueuse/core'

export const isDarkTrigger = useDark({
  onChanged (dark:boolean) {
    useFavicon(dark ? 'favicon_black.png' : 'favicon_white.png')
    return dark
  }
})
