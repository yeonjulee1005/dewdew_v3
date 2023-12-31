<template>
  <div class="hhkb h-full">
    <p class="hhkb-title">
      HHKB Keyboard
    </p>
    <div class="hhkb-input">
      <DDTextarea
        padded
        color="violet"
        size="lg"
        placeholder="영어로 작성하거나 마우스로 키보드를 클릭하면, 아래의 3D 모델링된 hhkb 키보드가 동작합니다."
        :rows="5"
      />
    </div>
    <canvas
      ref="hhkbRef"
      class="hhkb-canvas"
    />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { Application } from '@splinetool/runtime'

const hhkbRef = ref(null)

const state = reactive({
  spline: {
    scene: 'https://prod.spline.design/drAMoZbfLXDCLqRs/scene.splinecode',
    app: null,
    isLoaded: false
  }
})

onMounted(async () => {
  try {
    const app = new Application(hhkbRef.value, {
      preload: true
    })
    await app.load(state.spline.scene)
    state.spline.app = app
    state.spline.isLoaded = true
  } catch (error) {
    console.error(error)
  }
})

</script>
