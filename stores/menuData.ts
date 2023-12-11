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

  const updateMenuData = (data: SerializeObject[], menuType:string) => {
    switch (menuType) {
      case 'root' :
        mainMenuData.value = data
        break
      case 'sub' :
        subMenuData.value = data
        break
      case 'sns' :
        socialMenuData.value = data
        break
    }
  }

  return {
    mainMenuData,
    subMenuData,
    socialMenuData,
    updateMenuData
  }
}, {
  persist: true
})
