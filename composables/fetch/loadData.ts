export const useLoadComposable = () => {
  /**
   * ! Load Data !
   */
  const client = useSupabaseClient()

  const { mainIntroTitle, mainIntroText, mainIntroScrollText, mainResumeTitle, mainEducatedText, mainCareerText, mainSkillTitle, mainSkillFirstText, mainSkillSecondText, mainSkillThirdText, mainPortfolioTitle, mainPortfolioText, mainPortfolioBackground } = storeToRefs(useMainStore())
  const { mainMenuData, subMenuData, socialMenuData } = storeToRefs(useMenuStore())

  const { leaveColorData } = storeToRefs(useLeaveColorStore())
  const { stackLogoData } = storeToRefs(useStackStore())
  const { portfolioData } = storeToRefs(usePortfolioStore())
  const { archiveData } = storeToRefs(useArchiveStore())

  const { generateThumbImage } = useArchiveStore()

  const loadMenuData = (menuType:string) => {
    const { data } = useAsyncData(`menuData${menuType}`, async () => {
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

    replaceMenuData(data.value, menuType)
  }

  const loadMainData = () => {
    const { data } = useAsyncData('mainData', async () => {
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

    if (!data.value) { return }

    const introData = data.value.filter((item: SerializeObject) => item.category === 'intro')
    const resumeData = data.value.filter((item: SerializeObject) => item.category === 'resume')
    const skillData = data.value.filter((item: SerializeObject) => item.category === 'skills')
    const referenceData = data.value.filter((item: SerializeObject) => item.category === 'reference')

    mainIntroTitle.value = introData.filter((item: SerializeObject) => item.text_type === 'title')[0]
    mainIntroText.value = introData.filter((item: SerializeObject) => item.text_type === 'main')
    mainIntroScrollText.value = introData.filter((item: SerializeObject) => item.text_type === 'scroll')[0]

    mainResumeTitle.value = resumeData.filter((item: SerializeObject) => item.text_type === 'title')[0]
    mainEducatedText.value = resumeData.filter((item: SerializeObject) => item.text_type === 'educate')[0]
    mainCareerText.value = resumeData.filter((item: SerializeObject) => item.text_type === 'career')

    mainSkillTitle.value = skillData.filter((item: SerializeObject) => item.text_type === 'title')
    mainSkillFirstText.value = skillData.filter((item: SerializeObject) => item.text_type === 'first')
    mainSkillSecondText.value = skillData.filter((item: SerializeObject) => item.text_type === 'second')
    mainSkillThirdText.value = skillData.filter((item: SerializeObject) => item.text_type === 'third')

    mainPortfolioTitle.value = referenceData.filter((item: SerializeObject) => item.text_type === 'title')[0]
    mainPortfolioText.value = referenceData.filter((item: SerializeObject) => item.text_type === 'desc')[0]
    mainPortfolioBackground.value = referenceData.filter((item: SerializeObject) => item.text_type === 'background')[0]
  }

  const loadTechBlogCommentData = (techBlogId:string) => {
    const { data, refresh }:SerializeObject = useAsyncData('blogCommentData', async () => {
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
    const { data } = useAsyncData('leaveColorData', async () => {
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

  const loadStackData = () => {
    const { data } = useAsyncData('loadStackData', async () => {
      const { data, error } = await client
        .from('stackLogo')
        .select('orderIndex!inner(index), title, url, deleted')
        .eq('deleted', false)
        .order('orderIndex(index)', { ascending: true })

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    stackLogoData.value = data.value
  }

  const loadPortfolioData = () => {
    const { data } = useAsyncData('loadPortfolioData', async () => {
      const { data, error } = await client
        .from('portfolio')
        .select('orderIndex!inner(index), title, desc, url, image, thumbnail, alt, deleted')
        .eq('deleted', false)
        .order('orderIndex(index)', { ascending: true })

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    portfolioData.value = data.value
  }

  const loadArchiveGroup = () => {
    const { data } = useAsyncData('archiveData', async () => {
      const { data, error } = await client
        .from('archiveIndex')
        .select('index, title, deleted, archiveImage(title, years, url)')
        .eq('deleted', false)

      if (error) {
        throw createError({ statusMessage: error.message })
      }

      return data
    })

    archiveData.value = data.value
    generateThumbImage()
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
    loadMainData,
    loadTechBlogCommentData,
    loadLeaveColorData,
    loadStackData,
    loadPortfolioData,
    loadArchiveGroup
  }
}
