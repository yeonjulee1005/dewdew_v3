import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuData', () => {
  /**
   * ! Pinia State !
   *
   * @param mainMenuData 메인메뉴 데이터
   * @param subMenuData 서브메뉴 데이터
   * @param socialMenuData 소셜메뉴 데이터
   *
   */

  const mainMenuData = ref<SerializeObject[]>([])
  const subMenuData = ref<SerializeObject[]>([])
  const socialMenuData = ref<SerializeObject[]>([])

  /**
   * ! Pinia Actions !
   */

  const loadMenuData = async () => {
    mainMenuData.value = []
    subMenuData.value = []
    socialMenuData.value = []
    const { data: menuData, refresh: menuRefresh }:SerializeObject = await useAsyncData('menuData', async () => {
      const { data } = await useFetch('/api/menu', {
        headers: useRequestHeaders(['cookie']),
        method: 'GET'
      })
      return data
    })
    if (!menuData.value) {
      menuRefresh()
      return
    }
    menuData.value?.map((menu:SerializeObject) =>
      separateData(menu)
    )
  }

  const separateData = (data: SerializeObject) => {
    switch (data.menuType) {
      case 'root' :
        mainMenuData.value.push(data)
        break
      case 'sub' :
        subMenuData.value.push(data)
        break
      case 'sns' :
        socialMenuData.value.push(data)
        break
    }
  }

  return {
    mainMenuData,
    subMenuData,
    socialMenuData,
    loadMenuData
  }
}, {
  persist: true
})
