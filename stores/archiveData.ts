import { defineStore } from 'pinia'

export const useArchiveStore = defineStore('archiveData', () => {
  const { randomOrder } = useUi()
  /**
   * ! Pinia State !
   *
   * @param archiveData 아카이브 데이터
   * @param thumbImageData 썸네일 이미지 데이터
   *
   */

  const archiveData = ref<{index: string | null; title: string | null; archiveImage: {title: string | null; url: string | null; years: string | null;}[] | null; deleted: boolean | null;}[] | null | undefined>([])
  const thumbImageData = ref<{title: string | null; url: string | null; route: string | null;}[]>([])

  /**
   * ! Pinia Actions !
   */

  const generateThumbImage = () => {
    if (!archiveData.value) { return }
    thumbImageData.value = []
    archiveData.value.forEach((image:{index: string | null; title: string | null; archiveImage: {title: string | null; url: string | null; years: string | null;}[] | null; deleted: boolean | null;}) => {
      if (!image.archiveImage) { return }

      const data:{title: string | null; url: string | null; route: string | null;} = {
        title: image.title,
        url: image.archiveImage[randomOrder(image.archiveImage.length)].url,
        route: `/archives/${image.title}`
      }

      thumbImageData.value.push(data)
    })
  }

  return {
    archiveData,
    thumbImageData,
    generateThumbImage
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
