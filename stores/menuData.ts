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

  const mainMenuData = ref<Tables<'main'>[] | {orderIndex: {index: number | null} | null; title: string | null; icon: string | null; menu_type: string | null; url: string | null; image_url: string | null; deleted: boolean | null}[] | null>()
  const subMenuData = ref<Tables<'main'>[] | {orderIndex: {index: number | null} | null; title: string | null; icon: string | null; menu_type: string | null; url: string | null; image_url: string | null; deleted: boolean | null}[] | null>()
  const socialMenuData = ref<Tables<'main'>[] | {orderIndex: {index: number | null} | null; title: string | null; icon: string | null; menu_type: string | null; url: string | null; image_url: string | null; deleted: boolean | null}[] | null>()

  return {
    mainMenuData,
    subMenuData,
    socialMenuData
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
