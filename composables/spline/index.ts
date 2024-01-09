import { Application } from '@splinetool/runtime'

export const useSpline = () => {
  const spline = ref({
    scene: '',
    app: null as Application | null,
    isLoaded: false
  })

  const loadSpline = async (canvas: Ref<HTMLCanvasElement>, sceneUrl: string) => {
    spline.value.scene = sceneUrl
    const app = new Application(canvas.value)
    await app.load(spline.value.scene)
    spline.value.app = app
    spline.value.isLoaded = true
  }

  return {
    loadSpline
  }
}
