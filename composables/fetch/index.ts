export const useFetchComposable = () => {
  const client = useSupabaseClient()

  /**
   * ! Load Data !
   */

  const { mainIntroTitle, mainIntroText, mainIntroScrollText, mainResumeTitle, mainEducatedText, mainCareerText, mainSkillTitle, mainSkillFirstText, mainSkillSecondText, mainSkillThirdText, mainPortfolioTitle, mainPortfolioText, mainPortfolioBackground } = storeToRefs(useMainStore())
  const { mainMenuData, subMenuData, socialMenuData } = storeToRefs(useMenuStore())

  const { stackLogoData } = storeToRefs(useStackStore())
  const { portfolioData } = storeToRefs(usePortfolioStore())

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

  const loadMainData = async () => {
    const { data }: SerializeObject = await useFetch('/api/main', {
      headers: useRequestHeaders(['cookie']),
      immediate: true
    })

    const introData = mainResponse(data.value, 'intro')
    const resumeData = mainResponse(data.value, 'resume')
    const skillData = mainResponse(data.value, 'skills')
    const referenceData = mainResponse(data.value, 'reference')

    mainIntro(introData)
    mainResume(resumeData)
    mainSkill(skillData)
    mainPortfolio(referenceData)
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
  }

  const loadArchiveData = async () => {
    const { data }: SerializeObject = await useFetch('/api/archive', {
      headers: useRequestHeaders(['cookie']),
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
    } else {
      const { error } = await client
        .from(table)
        .delete()
        .eq('id', deleteId)
        .eq(matOpt, matOptVal)
        .eq(subMatOpt, subMatOptVal)

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

  const mainResponse = (rawData: SerializeObject, category: string) => {
    return rawData.filter((item: SerializeObject) => item.category === category)
  }

  const mainSubResponse = (rawData: SerializeObject, subCategory: string, single: boolean) => {
    return single
      ? rawData.filter((item: SerializeObject) => item.text_type === subCategory)[0]
      : rawData.filter((item: SerializeObject) => item.text_type === subCategory)
  }

  const mainIntro = (introData: SerializeObject) => {
    mainIntroTitle.value = mainSubResponse(introData, 'title', true)
    mainIntroText.value = mainSubResponse(introData, 'main', false)
    mainIntroScrollText.value = mainSubResponse(introData, 'scroll', true)
  }

  const mainResume = (resumeData: SerializeObject) => {
    mainResumeTitle.value = mainSubResponse(resumeData, 'title', true)
    mainEducatedText.value = mainSubResponse(resumeData, 'educate', true)
    mainCareerText.value = mainSubResponse(resumeData, 'career', false)
  }

  const mainSkill = (skillData: SerializeObject) => {
    mainSkillTitle.value = mainSubResponse(skillData, 'title', false)
    mainSkillFirstText.value = mainSubResponse(skillData, 'first', false)
    mainSkillSecondText.value = mainSubResponse(skillData, 'second', false)
    mainSkillThirdText.value = mainSubResponse(skillData, 'third', false)
  }

  const mainPortfolio = (referenceData: SerializeObject) => {
    mainPortfolioTitle.value = mainSubResponse(referenceData, 'title', true)
    mainPortfolioText.value = mainSubResponse(referenceData, 'desc', true)
    mainPortfolioBackground.value = mainSubResponse(referenceData, 'background', true)
  }

  return {
    loadMenuData,
    loadMainData,
    loadStackData,
    loadPortfolioData,
    loadArchiveData,
    countData,
    insertData,
    upsertData,
    loadStorage,
    uploadStorage,
    deleteData,
    logout
  }
}