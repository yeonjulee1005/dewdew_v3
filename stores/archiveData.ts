import { defineStore } from 'pinia'

export const useArchiveStore = defineStore('archiveData', () => {
  const client = useSupabaseClient()
  /**
   * ! Pinia State !
   *
   * @param archiveData 아카이브 데이터
   * @param thumbImageData 썸네일 이미지 데이터
   *
   */

  const archiveData = ref<SerializeObject[]>([])
  const thumbImageData = ref<SerializeObject[]>([])

  /**
   * ! Pinia Actions !
   */

  const loadArchiveGroup = async () => {
    archiveData.value = []
    const { data: archive }:SerializeObject = await useAsyncData('archiveData', async () => {
      const { data, error } = await client
        .from('archiveIndex')
        .select('index, title, deleted, archiveImage(title, years, url)')
        .eq('deleted', false)

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    archiveData.value = archive.value
    generateThumbImage(archive.value)
  }

  const generateThumbImage = (archiveData:SerializeObject[]) => {
    thumbImageData.value = []
    archiveData.forEach((image:SerializeObject) => {
      if (!image.archiveImage.length) { return }
      const randomNumber = Math.floor(Math.random() * image.archiveImage.length)
      const data:SerializeObject = {
        title: image.title,
        url: image.archiveImage[randomNumber].url,
        route: `/archives/${image.title}`
      }
      thumbImageData.value.push(data)
    })
  }

  return {
    archiveData,
    thumbImageData,
    loadArchiveGroup
  }
}, {
  persist: true
})
