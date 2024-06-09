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

  const mainMenuData = ref<{ orderIndex: { index: number }, title: string, icon: string, menu_type: string, url: string, image_url: string, deleted: boolean }[] | null>()
  const subMenuData = ref<{ orderIndex: { index: number }, title: string, icon: string, menu_type: string, url: string, image_url: string, deleted: boolean }[] | null>()
  const socialMenuData = ref<{ orderIndex: { index: number }, title: string, icon: string, menu_type: string, url: string, image_url: string, deleted: boolean }[] | null>()

  return {
    mainMenuData,
    subMenuData,
    socialMenuData,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})
