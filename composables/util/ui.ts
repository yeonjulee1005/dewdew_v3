export const useUi = () => {
  const { commentName } = useCommentName()
  const dayjs = useDayjs()

  const comma = (val:number) => {
    return String(val).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  }

  const uncomma = (val:number) => {
    return String(val).replace(/[^\d]+/g, '')
  }

  const checkHyperLink = (link:string) => {
    const regLink = /(mailto:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|(((?:https?)|(?:ftp)):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm
    let returnValue = false

    !regLink.test(link)
      ? returnValue = false
      : returnValue = true
    return returnValue
  }

  const checkYoutubeLink = (link:string) => {
    const regLink = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&#38;);v=))([a-zA-Z0-9\-_]{11})?(?:(?:\?|&|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?/g
    let returnValue = false

    !regLink.test(link)
      ? returnValue = false
      : returnValue = true
    return returnValue
  }

  const checkEmail = (val:string) => {
    const regEmail = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
    if (!regEmail.test(val)) {
      return false
    } else {
      return true
    }
  }

  const checkPassword = (val:string) => {
    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/
    if (!regPassword.test(val)) {
      return false
    } else {
      return true
    }
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

  return {
    comma,
    uncomma,
    checkHyperLink,
    checkYoutubeLink,
    checkEmail,
    checkPassword,
    copyClipBoard,
    randomOrder,
    removeHtmlTags,
    genUid,
    genFileDate,
    currentDateIosFormat,
    generateCommentName
  }
}
