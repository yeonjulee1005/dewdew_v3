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

  const archiveData = ref<{ index: number, title: string, deleted: boolean, archiveImage: { title: string, years: string, url: string}[] }[] | null>()
  const thumbImageData = ref<{ title: string, url: string, route: string }[]>([])

  /**
   * ! Pinia Actions !
   */

  const generateThumbImage = () => {
    thumbImageData.value = []

    if (!archiveData.value) { return }

    archiveData.value.forEach((image:{ index: number, title: string, deleted: boolean, archiveImage: { title: string, years: string, url: string}[] }) => {
      if (!image.archiveImage) { return }

      const data:{ title: string, url: string, route: string } = {
        title: image.title,
        url: image.archiveImage[randomOrder(image.archiveImage.length)]?.url,
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
