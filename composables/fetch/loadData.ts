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
        .select('orderIndex!inner(index), title, menuType, url, imageUrl, deleted')
        .eq('deleted', false)
        .order('orderIndex(index)', { ascending: true })
      console.log(data)
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
        .select('orderIndex!inner(index), textType, category, textTitle(textKo, textEn), textDescription(textKo, textEn)), deleted')
        .eq('deleted', false)
        .order('orderIndex(index)', { ascending: true })

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
