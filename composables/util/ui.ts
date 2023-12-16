export const useUi = () => {
  const { commentName } = useCommentName()
  const dayjs = useDayjs()

  const uncommaRegex = /(\d)(?=(?:\d{3})+(?!\d))/g
  const commaRegex = /[^\d]+/g
  const hyperLinkRegex = /(mailto:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|(((?:https?)|(?:ftp)):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&#38;);v=))([a-zA-Z0-9\-_]{11})?(?:(?:\?|&|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?/g
  const emailRegex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/

  const comma = (val:number) => {
    return String(val).replace(uncommaRegex, '$1,')
  }

  const uncomma = (val:number) => {
    return String(val).replace(commaRegex, '')
  }

  const checkHyperLink = (link:string) => {
    return !!hyperLinkRegex.test(link)
  }

  const checkYoutubeLink = (link:string) => {
    return !!youtubeRegex.test(link)
  }

  const checkEmail = (val:string) => {
    return !!emailRegex.test(val)
  }

  const checkPassword = (val:string) => {
    return !!passwordRegex.test(val)
  }

  const textInclude = (text:string, search:string) => {
    return text.toLowerCase().includes(search.toLowerCase())
  }

  const copyClipBoard = async (val:string) => {
    try {
      await navigator.clipboard.writeText(val)
    } catch (err) {
      console.error('클립보드 복사에 실패했습니다.', err)
    }
  }

  const randomOrder = (dataValue:number) => {
    return Math.floor(Math.random() * dataValue)
  }

  const removeHtmlTags = (text:string) => {
    return text.replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('<br>', '')
  }

  const genUid = () => {
    return (dayjs(new Date()).format('YYYYMMDD') + '_' + Math.random().toString(36).substring(2, 16))
  }

  const genFileDate = () => {
    return dayjs(new Date()).format('YYYYMMDD_HHmmss')
  }

  const currentDateIosFormat = () => {
    return new Date().toISOString().split('T')
  }

  const generateCommentName = () => {
    const frontName = commentName.frontName
    const backName = commentName.backName

    const randomFront = frontName[Math.floor(Math.random() * frontName.length)]
    const randomBack = backName[Math.floor(Math.random() * backName.length)]

    return randomFront.concat(' ', randomBack)
  }

  const badgeColor = (likeCount:number) => {
    if (likeCount === 0) {
      return 'orange'
    } else if (likeCount > 0 && likeCount < 20) {
      return 'yellow'
    } else if (likeCount >= 20 && likeCount < 50) {
      return 'emerald'
    } else if (likeCount >= 50 && likeCount < 100) {
      return 'teal'
    } else if (likeCount >= 100 && likeCount < 250) {
      return 'sky'
    } else if (likeCount >= 250 && likeCount < 500) {
      return 'cyan'
    } else if (likeCount >= 500 && likeCount < 1000) {
      return 'violet'
    } else if (likeCount >= 1000) {
      return 'rose'
    }
  }

  const progressColor = (percent: number) => {
    const colors = ['rose', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'red', 'rose']
    const index = Math.min(Math.floor(percent / 5), colors.length - 1)
    return colors[index]
  }

  return {
    hyperLinkRegex,
    youtubeRegex,
    passwordRegex,
    comma,
    uncomma,
    checkHyperLink,
    checkYoutubeLink,
    checkEmail,
    checkPassword,
    textInclude,
    copyClipBoard,
    randomOrder,
    removeHtmlTags,
    genUid,
    genFileDate,
    currentDateIosFormat,
    generateCommentName,
    badgeColor,
    progressColor
  }
}
