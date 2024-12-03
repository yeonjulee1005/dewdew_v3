export const useUi = () => {
  const { commentName } = useCommentName()
  const dayjs = useDayjs()

  const uncommaRegex = /(\d)(?=(?:\d{3})+(?!\d))/g
  const commaRegex = /[^\d]+/g
  const hyperLinkRegex = /(mailto:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|(((?:https?)|(?:ftp)):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&#38;);v=))([a-zA-Z0-9\-_]{11})?(?:(?:\?|&|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?/g
  const emailRegex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/

  const splitByChar = (value: string | number, char: string) => {
    return String(value).split(char)[0]
  }

  const comma = (val: number) => {
    return String(val).replace(uncommaRegex, '$1,')
  }

  const uncomma = (val: number) => {
    return String(val).replace(commaRegex, '')
  }

  const checkHyperLink = (link: string) => {
    return !!hyperLinkRegex.test(link)
  }

  const checkYoutubeLink = (link: string) => {
    return !!youtubeRegex.test(link)
  }

  const checkEmail = (val: string) => {
    return !!emailRegex.test(val)
  }

  const checkPassword = (val: string) => {
    return !!passwordRegex.test(val)
  }

  const textInclude = (text: string, search: string) => {
    return text.toLowerCase().includes(search.toLowerCase())
  }

  const estimateReadingTime = (text: string) => {
    const wpm = 225
    const words = text.trim().split(/\s+/).length
    const time = Math.ceil(words / wpm)
    return time
  }

  const copyClipBoard = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val)
    }
    catch (err) {
      console.error('클립보드 복사에 실패했습니다.', err)
    }
  }

  const randomOrder = (dataValue: number) => {
    return Math.floor(Math.random() * dataValue)
  }

  const removeHtmlTags = (text: string) => {
    return text.replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('<br>', '')
  }

  const genUid = () => {
    return (dayjs(new Date()).format('YYYYMMDD') + '_' + Math.random().toString(36).substring(2, 16))
  }

  const genFileDate = () => {
    return dayjs(new Date()).format('YYYYMMDD_HHmmss')
  }

  const genDateFormat = (format: string) => {
    return dayjs(new Date()).format(format)
  }

  const getLastHour = () => {
    return dayjs(new Date()).subtract(1, 'hour').format('HH')
  }

  const getMinute = (format: string) => {
    return dayjs(new Date()).format(format)
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

  const airDiffusionColor = (airDiffusion: number) => {
    if (airDiffusion === 25) {
      return 'text-rose-600'
    }
    else if (airDiffusion === 50) {
      return 'text-orange-600'
    }
    else if (airDiffusion === 75) {
      return 'text-sky-600'
    }
    else if (airDiffusion === 100) {
      return 'text-emerald-600'
    }
  }

  const uvColor = (uv: number) => {
    if (uv < 3) {
      return 'text-emerald-600'
    }
    else if (uv >= 3 && uv < 6) {
      return 'text-sky-600'
    }
    else if (uv >= 6 && uv < 8) {
      return 'text-orange-600'
    }
    else if (uv >= 8 && uv < 11) {
      return 'text-rose-600'
    }
    else if (uv >= 11) {
      return 'text-red-600'
    }
  }

  const humidityColor = (humidity: number) => {
    if (humidity < 20) {
      return 'text-stone-500'
    }
    else if (humidity >= 20 && humidity < 40) {
      return 'text-emerald-500'
    }
    else if (humidity >= 40 && humidity < 60) {
      return 'text-teal-500'
    }
    else if (humidity >= 60 && humidity < 80) {
      return 'text-sky-500'
    }
    else if (humidity >= 80) {
      return 'text-blue-500'
    }
  }

  const weatherColor = (weather: string) => {
    if (weather === '맑음') {
      return 'text-yellow-600'
    }
    else if (weather === '구름 많음') {
      return 'text-sky-600'
    }
    else if (weather === '흐림') {
      return 'text-yellow-600'
    }
  }

  const temperatureColor = (temperature: string) => {
    const temperture = parseInt(temperature)
    if (temperture >= 30) {
      return 'text-orange-600'
    }
    else if (temperture < 30 && temperture >= 15) {
      return 'text-orange-300'
    }
    else if (temperture < 15 && temperture >= 5) {
      return 'text-sky-600'
    }
    else if (temperture < 5) {
      return 'text-blue-600'
    }
  }

  const badgeColor = (likeCount: number) => {
    if (likeCount === 0) {
      return 'red'
    }
    else if (likeCount > 0 && likeCount < 10) {
      return 'orange'
    }
    else if (likeCount >= 10 && likeCount < 20) {
      return 'yellow'
    }
    else if (likeCount >= 20 && likeCount < 50) {
      return 'emerald'
    }
    else if (likeCount >= 50 && likeCount < 100) {
      return 'teal'
    }
    else if (likeCount >= 100 && likeCount < 250) {
      return 'sky'
    }
    else if (likeCount >= 250 && likeCount < 500) {
      return 'cyan'
    }
    else if (likeCount >= 500 && likeCount < 1000) {
      return 'violet'
    }
    else if (likeCount >= 1000) {
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
    splitByChar,
    comma,
    uncomma,
    checkHyperLink,
    checkYoutubeLink,
    checkEmail,
    checkPassword,
    textInclude,
    estimateReadingTime,
    copyClipBoard,
    randomOrder,
    removeHtmlTags,
    genUid,
    genFileDate,
    genDateFormat,
    getLastHour,
    getMinute,
    currentDateIosFormat,
    generateCommentName,
    airDiffusionColor,
    uvColor,
    humidityColor,
    weatherColor,
    temperatureColor,
    badgeColor,
    progressColor,
  }
}
