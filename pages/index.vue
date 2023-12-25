<template>
  <div class="intro">
    <!-- <TresCanvas :clear-color="'white'">
      <OrbitControls />
      <TresPerspectiveCamera />
      <TresMesh>
        <TresCylinderGeometry
          ref="geometry"
          :args="[1, 1, 3, 6]"
          :color="color"
        />
        <TresMeshStandardMaterial :color="color" />
      </TresMesh>
      <TresDirectionalLight
        :color="color"
        :intensity="1.0"
        :position="{ x: 0, y: 0, z: 1 }"
      />
      <TresGridHelper />
    </TresCanvas> -->
    <div class="intro-component abs-middle flex flex-column flex-align-center gap-8">
      <Transition
        name="intro"
        mode="out-in"
      >
        <span
          :key="state.currentHelloIndex"
          class="hello"
        >
          {{ $rt(state.currentHello) }}
        </span>
      </Transition>
      <div class="title flex flex-column flex-align-center">
        <span id="hello-intro-title" />
      </div>
      <div class="flex flex-justify-center flex-align-center gap-3">
        <DDButton
          color="violet"
          size="md"
          variant="solid"
          @click="navigateTo('/main')"
        >
          {{ $t('texts.enter') }}
        </DDButton>
        <AThemeChange />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Color } from 'three'

import TypeIt from 'typeit'

const { helloList, typeHello } = useHelloData()

const { t } = useLocale()

useHead({
  meta: [
    { property: 'og:title', content: t('openGraph.dewdew', { text: 'dewdew' }) }
  ]
})

definePageMeta({
  layout: 'raw'
})

if (process.client) {
  new TypeIt('#hello-intro-title', {
    strings: typeHello,
    lifeLike: true,
    deleteSpeed: 100,
    loop: true
  }).go()
}

const state = reactive({
  currentHelloIndex: 0,
  currentHello: helloList[0]
})

let timeoutId: number | undefined

const updateHello = () => {
  state.currentHelloIndex = (state.currentHelloIndex + 1) % helloList.length
  timeoutId = window.setTimeout(updateHello, 5000)
}

onMounted(() => {
  updateHello()
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

watch(() => state.currentHelloIndex, (newIndex) => {
  state.currentHello = helloList[newIndex]
})

// const color = ref(new Color('#50C878')) // 에메랄드 색상
// const geometry = ref(new CylinderGeometry(1, 1, 1, 6)) // 육각 자수정 모양
// const material = ref(new MeshStandardMaterial({ color: color.value }))

</script>
