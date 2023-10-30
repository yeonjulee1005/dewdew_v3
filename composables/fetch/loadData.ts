export const useLoadComposable = () => {
  /**
   * ! Load Data !
   */
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  const { updateMenuData } = useMenuStore()
  const { updateMainData } = useMainStore()

  const loadAdminData = async () => {
    const { data }:SerializeObject = await useAsyncData('AdminData', async () => {
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('id', String(user.value?.id))
        .single()

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    return { data }
  }

  const loadMenuData = async (menuType:string) => {
    const { data: menuData }:SerializeObject = await useAsyncData(`menuData${menuType}`, async () => {
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

  const loadBlogData = async (blogId:string) => {
    const { data, refresh }:SerializeObject = await useAsyncData('blogData', async () => {
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

  const loadBlogCommentData = async (blogId:string) => {
    const { data, refresh }:SerializeObject = await useAsyncData('blogCommentData', async () => {
      const { data, error } = await client
        .from('blogComment')
        .select('id, blog_id, message, name, password, deleted, created_at, updated_at')
        .eq('blog_id', blogId)
        .eq('deleted', false)
        .order('created_at', { ascending: false })

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })
    return { data, refresh }
  }

  return {
    loadAdminData,
    loadMenuData,
    loadMainData,
    loadBlogData,
    loadBlogCommentData
  }
}
