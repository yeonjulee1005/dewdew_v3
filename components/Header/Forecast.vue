<template>
  <Flicking
    style="border: 1px solid red;"
    :plugins="plugin"
    :options="option"
  >
    <div
      v-for="(data, index) in forecast?.items.item"
      :key="index"
      class="weather-pannel"
    >
      {{ data }}
    </div>
  </Flicking>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import { AutoPlay } from '@egjs/flicking-plugins'
import '@egjs/vue3-flicking/dist/flicking.css'

const { geoX, geoY, latitude, longitude } = storeToRefs(useLocWeatherStore())

console.log(latitude.value, longitude.value)

const { weatherQuery } = useQuery()

const { genDateFormat, getMinute } = useUi()

const plugin = [
  new AutoPlay({
    animationDuration: 1000,
    direction: 'NEXT',
    stopOnHover: true
  })
]

const option = {
  inputType: ['touch', 'mouse'],
  circular: true,
  horizontal: false,
  deceleration: 0.004
}

const { data: forecast } = useAsyncData('weather', async () => {
  const data: any = await $fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst${weatherQuery(genDateFormat('YYYYMMDD'), getForecastHour().concat('00'), geoX.value ?? 0, geoY.value ?? 0)}`)
  const responseItem = data.response.body.items.item
  // sky: 하늘상태, pty: 강수형태, rn1: 1시간 강수량, t1h: 1시간 기온, reh: 습도, vec: 풍향, wsd: 풍속

  const skyData = filterLastData(responseItem, 'SKY')
  const ptyData = filterLastData(responseItem, 'PTY')
  const rn1Data = filterLastData(responseItem, 'RN1')
  const t1hData = filterLastData(responseItem, 'T1H')
  const rehData = filterLastData(responseItem, 'REH')
  const vecData = filterLastData(responseItem, 'VEC')
  const wsdData = filterLastData(responseItem, 'WSD')

  console.log(skyData, ptyData, rn1Data, t1hData, rehData, vecData, wsdData)

  return data.response.body
}, {
  immediate: true,
  watch: [geoX, geoY]
})

const filterLastData = (data: any, category: string) => {
  return data.filter((item: any) => item.category === category).at(-1)
}

const getForecastHour = () => {
  return acceptableMinute() ? getLastHour() : genDateFormat('HH')
}

const getLastHour = () => {
  return String(parseInt(genDateFormat('HH')) - 1)
}

const acceptableMinute = () => {
  return parseInt(getMinute('mm')) < 35
}

</script>
