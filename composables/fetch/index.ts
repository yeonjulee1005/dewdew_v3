export const useFetchComposable = () => {
  const client = useSupabaseClient()

  /**
   * ! Load Data !
   */

  const { mainMenuData, subMenuData, socialMenuData } = storeToRefs(useMenuStore())

  const { stackLogoData } = storeToRefs(useStackStore())
  const { portfolioData, selectedPortfolioData } = storeToRefs(usePortfolioStore())

  const loadMenuData = async (menuType:string) => {
    const { data }: SerializeObject = await useFetch('/api/menu', {
      headers: useRequestHeaders(['cookie']),
      params: {
        menuType
      },
      immediate: true
    })

    replaceMenuData(data.value, menuType)
  }

  const loadStackData = async () => {
    const { data }: SerializeObject = await useFetch('/api/stack', {
      headers: useRequestHeaders(['cookie']),
      immediate: true
    })

    stackLogoData.value = data.value
  }

  const loadPortfolioData = async () => {
    const { data }: SerializeObject = await useFetch('/api/portfolio', {
      headers: useRequestHeaders(['cookie']),
      immediate: true
    })

    portfolioData.value = data.value
    selectedPortfolioData.value = data.value[0]
  }

  const loadArchiveData = async () => {
    const { data }: SerializeObject = await useFetch('/api/archive', {
      headers: useRequestHeaders(['cookie']),
      immediate: true
    })

    return data.value
  }

  const loadTechData = async (page: number, pageCount: number) => {
    const { data } = await useFetch('/api/tech', {
      headers: useRequestHeaders(['cookie']),
      query: {
        page,
        pageCount
      },
      immediate: true
    })

    return data.value
  }

  const countData = async (table: string) => {
    const { count } = await client
      .from(table)
      .select('*', { count: 'exact' })

    return { count }
  }

  const insertData = async (insertData: SerializeObject, table: string) => {
    const { error } = await client
      .from(table)
      .insert(insertData)

    if (error) {
      return error
    }
  }

  const upsertData = async (upsertData: SerializeObject, table: string) => {
    const { error } = await client
      .from(table)
      .upsert(upsertData)

    if (error) {
      return error
    }
  }

  const loadStorage = async (storage: string, imageName: string) => {
    const { data } = await client
      .storage
      .from(storage)
      .getPublicUrl(imageName)

    return data.publicUrl
  }

  const uploadStorage = async (storage: string, path: string, file: File) => {
    const { error } = await client
      .storage
      .from(storage)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })

    return error
  }

  const deleteData = async (deleteId: string, table: string, admin: boolean, matOpt: string, matOptVal: string, subMatOpt: string, subMatOptVal: string) => {
    if (admin) {
      const { error } = await client
        .from(table)
        .delete()
        .eq('id', deleteId)
        .eq(matOpt, matOptVal)

      if (error) {
        return error
      }
    } else if (subMatOpt && subMatOptVal) {
      const { error } = await client
        .from(table)
        .delete()
        .eq('id', deleteId)
        .eq(matOpt, matOptVal)
        .eq(subMatOpt, subMatOptVal)

      if (error) {
        return error
      }
    } else {
      const { error } = await client
        .from(table)
        .delete()
        .eq('id', deleteId)
        .eq(matOpt, matOptVal)

      if (error) {
        return error
      }
    }
  }

  const logout = async () => {
    await client.auth.signOut()
  }

  const replaceMenuData = (menuData:{ orderIndex: { index: number }, title: string, icon: string, menu_type: string, url: string, image_url: string, deleted: boolean }[] | null, menuType:string) => {
    switch (menuType) {
      case 'root' :
        mainMenuData.value = menuData
        break
      case 'sub' :
        subMenuData.value = menuData
        break
      case 'sns' :
        socialMenuData.value = menuData
        break
    }
  }

  return {
    loadMenuData,
    loadStackData,
    loadPortfolioData,
    loadArchiveData,
    loadTechData,
    countData,
    insertData,
    upsertData,
    loadStorage,
    uploadStorage,
    deleteData,
    logout
  }
}
