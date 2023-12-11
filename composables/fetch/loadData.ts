export const useLoadComposable = () => {
  /**
   * ! Load Data !
   */
  const client = useSupabaseClient()

  const { leaveColorData } = storeToRefs(useLeaveColorStore())

  const { updateMenuData } = useMenuStore()
  const { updateMainData } = useMainStore()

  const loadMenuData = async (menuType:string) => {
    const { data: menuData }:SerializeObject = await useAsyncData(`menuData${menuType}`, async () => {
      const { data, error } = await client
        .from('pageMenu')
        .select('orderIndex!inner(index), title, icon, menu_type, url, image_url, deleted')
        .eq('menu_type', menuType)
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

  const loadMainData = async () => {
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

    updateMainData(mainData)
  }

  const loadTechBlogDetailData = async (techBlogId:string) => {
    const { data, refresh }:SerializeObject = await useAsyncData('blogDetailData', async () => {
      const { data, error } = await client
        .from('tech')
        .select('id, title, desc, raw_article, like, update_user_id, created_at, updated_at, deleted')
        .eq('id', techBlogId)
        .eq('deleted', false)
        .single()

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    return { data, refresh }
  }

  const loadTechBlogCommentData = async (techBlogId:string) => {
    const { data, refresh }:SerializeObject = await useAsyncData('blogCommentData', async () => {
      const { data, error } = await client
        .from('techComment')
        .select('id, tech_id, message, name, password, deleted, created_at, updated_at')
        .eq('tech_id', techBlogId)
        .eq('deleted', false)
        .order('created_at', { ascending: false })

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })
    return { data, refresh }
  }

  const loadLeaveColorData = () => {
    const { data } = useAsyncData('loadLeaveColorData', async () => {
      const { data, error } = await client
        .from('leaveCounterColor')
        .select('color, percentage, deleted')
        .eq('deleted', false)

      if (error) {
        throw createError({ statusMessage: error.message })
      }
      return data
    })

    leaveColorData.value = data.value
  }

  return {
    loadMenuData,
    loadMainData,
    loadTechBlogDetailData,
    loadTechBlogCommentData,
    loadLeaveColorData
  }
}
