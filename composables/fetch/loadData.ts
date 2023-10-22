export const useLoadComposable = () => {
  /**
   * ! Load Data !
   */
  const client = useSupabaseClient()

  const { updateMenuData } = useMenuStore()
  const { updateMainData } = useMainStore()

  const loadMenuData = async (menuType:string) => {
    const { data: menuData }:SerializeObject = await useAsyncData('menuData', async () => {
      const { data, error } = await client
        .from('pageMenu')
        .select('title, menuType, url, imageUrl')

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    const sortData = menuData.value.filter(
      (item:SerializeObject) => item.menuType === menuType
    )
    updateMenuData(sortData, menuType)
  }

  const loadMainData = async (category:string) => {
    const { data: mainData }:SerializeObject = await useAsyncData('mainData', async () => {
      const { data, error } = await client
        .from('main')
        .select('index, textType, category, textTitle(textKo, textEn), textDescription(textKo, textEn))')
        .order('index', { ascending: true })

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    const sortData = mainData.value.filter(
      (item:SerializeObject) => item.category === category
    )
    updateMainData(sortData, category)
  }

  return {
    loadMenuData,
    loadMainData
  }
}
