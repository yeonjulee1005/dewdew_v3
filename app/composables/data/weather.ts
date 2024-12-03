export const useWeatherMapData = () => {
  const weatherMapData: WeatherDataMapType = {
    sky: {
      1: '맑음,wi:solar-eclipse',
      3: '구름많음,wi:day-cloudy-windy',
      4: '흐림,wi:cloudy-windy',
    },
    t1h: (value: number | string) => `${value}`,
    vec: {
      0: '북,wi:wind-direction-n',
      1: '북동,wi:wind-direction-ne',
      2: '북동,wi:wind-direction-ne',
      3: '북동,wi:wind-direction-ne',
      4: '동,wi:wind-direction-e',
      5: '남동,wi:wind-direction-se',
      6: '남동,wi:wind-direction-se',
      7: '남동,wi:wind-direction-se',
      8: '남,wi:wind-direction-s',
      9: '남서,wi:wind-direction-sw',
      10: '남서,wi:wind-direction-sw',
      11: '남서,wi:wind-direction-sw',
      12: '서,wi:wind-direction-w',
      13: '서북,wi:wind-direction-nw',
      14: '서북,wi:wind-direction-nw',
      15: '서북,wi:wind-direction-nw',
      16: '북,wi:wind-direction-n',
    },
    wsd: (value: number | string) => `${value}m/s`,
    pty: {
      0: '없음,wi:day-sunny',
      1: '비,wi:rain',
      2: '비/눈,wi:day-rain-mix',
      3: '눈,wi:snow',
      5: '빗방울,wi:rain-wind',
      6: '빗방울/눈날림,wi:rain-mix',
      7: '눈날림,wi:snow-wind',
    },
    r1n: (value: number | string) => `${value}`,
    reh: (value: number | string) => `${value}`,
  }

  const airDiffusionMapData: LivingDataMapType = {
    25: '매우높음,streamline:smiley-emoji-terrified',
    50: '높음,streamline:smiley-grumpy',
    75: '보통,streamline:smiley-kiss',
    100: '낮음,streamline:smiley-sparks',
  }

  const uvMapData: LivingDataMapType = {
    0: '낮음,streamline:smiley-sparks',
    1: '낮음,streamline:smiley-sparks',
    2: '낮음,streamline:smiley-sparks',
    3: '보통,streamline:smiley-kiss',
    4: '보통,streamline:smiley-kiss',
    5: '보통,streamline:smiley-kiss',
    6: '높음,streamline:smiley-grumpy',
    7: '높음,streamline:smiley-grumpy',
    8: '매우높음,streamline:smiley-emoji-terrified',
    9: '매우높음,streamline:smiley-emoji-terrified',
    10: '매우높음,streamline:smiley-emoji-terrified',
    11: '위험,streamline:skull-1',
    12: '위험,streamline:skull-1',
  }

  const loadLivingData = (index: number, type: string) => {
    if (type === 'uv') {
      return uvMapData[index] as string
    }
    else {
      return airDiffusionMapData[index] as string
    }
  }

  return {
    weatherMapData,
    loadLivingData,
  }
}
