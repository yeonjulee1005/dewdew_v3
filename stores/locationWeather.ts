import { defineStore } from 'pinia'

export const useLocWeatherStore = defineStore('locationWeather', () => {
  /**
   * ! Pinia State !
   *
   * @param geoX 기상청 격자 X
   * @param geoY 기상청 격자 Y
   * @param latitude 위도
   * @param longitude 경도
   *
   */

  const geoX = ref<number | undefined>(undefined)
  const geoY = ref<number | undefined>(undefined)
  const latitude = ref<number | undefined>(undefined)
  const longitude = ref<number | undefined>(undefined)

  return {
    geoX,
    geoY,
    latitude,
    longitude
  }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})
