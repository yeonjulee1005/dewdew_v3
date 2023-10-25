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
        .select('orderIndex!inner(index), title, menu_type, url, image_url, deleted')
        .eq('deleted', false)
        .order('orderIndex(index)', { ascending: true })

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    const sortData = menuData.value.filter(
      (item:SerializeObject) => item.menu_type === menuType
    )
    updateMenuData(sortData, menuType)
  }

  const loadMainData = async (category:string) => {
    const { data: mainData }:SerializeObject = await useAsyncData('mainData', async () => {
      const { data, error } = await client
        .from('main')
        .select('orderIndex!inner(index), text_type, category, textTitle(ko, en), textDescription(ko, en)), deleted')
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

  const loadBlogData = async (blogId:string) => {
    const { data, refresh }:SerializeObject = await useAsyncData('mainData', async () => {
      if (blogId) {
        const { data, error } = await client
          .from('blog')
          .select('id, title, desc, raw_article, like, update_user_id, created_at, updated_at, deleted')
          .eq('id', blogId)
          .eq('deleted', false)
          .single()

        if (error) {
          throw createError({ statusMessage: error.message })
        }

        return data
      } else {
        const { data, error } = await client
          .from('blog')
          .select('id, title, desc, raw_article, like, update_user_id, created_at, updated_at, deleted')
          .eq('deleted', false)
          .order('created_at', { ascending: false })

        if (error) {
          throw createError({ statusMessage: error.message })
        }

        return data
      }
    })
    return { data, refresh }
  }

  return {
    loadMenuData,
    loadMainData,
    loadBlogData
  }
}
