import { defineStore } from 'pinia'

export const useArchiveStore = defineStore('archiveData', () => {
  const client = useSupabaseClient()
  /**
   * ! Pinia State !
   *
   * @param archiveData 아카이브 데이터
   *
   */

  const archiveData = ref<SerializeObject[]>([])

  /**
   * ! Pinia Actions !
   */

  const loadArchiveData = async () => {
    archiveData.value = []
    const { data: archive }:SerializeObject = await useAsyncData('archiveData', async () => {
      const { data, error } = await client
        .from('archiveImage')
        .select('id, title, url, years')

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    archiveData.value = archive.value
  }

  return {
    archiveData,
    loadArchiveData
  }
}, {
  persist: true
})
