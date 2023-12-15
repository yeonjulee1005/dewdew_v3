<template>
  <div
    class="color-translate flex flex-row flex-justify-center flex-align-center gap-20"
    :style="formData.backgroundColor"
  >
    <div class="flex flex-column gap-20">
      <AButton
        custom-class="eye-dropper flex-justify-center"
        use-icon
        icon-name="wpf:color-dropper"
        :button-text="$t('colorsTranslate.dropper')"
        @click:button="colorPicker"
      />
      <LazyUploadFile
        :file-size-alarm="$t('colorsTranslate.fileSize')"
        :file-type-alarm="$t('colorsTranslate.fileType')"
        :limit-type="['image/jpeg', 'image/png', 'image/gif']"
        :limit-height="2048"
        :limit-width="2048"
        :limit-size="10"
      />
    </div>
    <DDForm
      :state="formData"
      class="color-translate-form ml-6 space-y-4"
      @submit="() => {}"
    >
      <DDFormGroup
        :label="$t('colorsTranslate.hexLabel')"
        name="hex-color"
        required
        :description="$t('colorsTranslate.dropperEnv')"
      >
        <DDInput
          v-model="formData.hexColor"
          color="violet"
          size="lg"
          :placeholder="$t('placeholder.inputContent')"
          aria-label="hex"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <div class="space-x-1">
              <AButton
                v-show="formData.hexColor !== ''"
                button-variant="ghost"
                use-icon
                icon-name="line-md:remove"
                :icon-size="18"
                @click:button="() => formData.hexColor = ''"
              />
              <AButton
                v-if="isSupported"
                button-variant="ghost"
                use-icon
                icon-name="line-md:document-add"
                :icon-size="18"
                @click:button="copy(formData.hexColor)"
              />
            </div>
          </template>
        </DDInput>
      </DDFormGroup>
      <DDFormGroup
        :label="$t('colorsTranslate.rgbLabel')"
        name="rgb-color"
      >
        <DDInput
          v-model="formData.rgbColor"
          disabled
          color="violet"
          size="lg"
          :placeholder="$t('placeholder.inputContent')"
          aria-label="rgb"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <AButton
              v-if="isSupported"
              button-variant="ghost"
              use-icon
              icon-name="line-md:document-add"
              :icon-size="18"
              @click:button="copy(formData.rgbColor)"
            />
          </template>
        </DDInput>
      </DDFormGroup>
      <DDFormGroup
        :label="$t('colorsTranslate.hslLabel')"
        name="hls-color"
      >
        <DDInput
          v-model="formData.hslColor"
          disabled
          color="violet"
          size="lg"
          :placeholder="$t('placeholder.inputContent')"
          aria-label="hsl"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <AButton
              v-if="isSupported"
              button-variant="ghost"
              use-icon
              icon-name="line-md:document-add"
              :icon-size="18"
              @click:button="copy(formData.hslColor)"
            />
          </template>
        </DDInput>
      </DDFormGroup>
      <DDFormGroup
        :label="$t('colorsTranslate.cmykLabel')"
        name="cmyk-color"
      >
        <DDInput
          v-model="formData.cmykColor"
          disabled
          color="violet"
          size="lg"
          :placeholder="$t('placeholder.inputContent')"
          aria-label="cmyk"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <AButton
              v-if="isSupported"
              button-variant="ghost"
              use-icon
              icon-name="line-md:document-add"
              :icon-size="18"
              @click:button="copy(formData.cmykColor)"
            />
          </template>
        </DDInput>
      </DDFormGroup>
      <AButton
        custom-class="submit-button"
        button-size="lg"
        :button-text="$t('texts.regenerate')"
        @click:button="initColorData"
      />
    </DDForm>
  </div>
</template>

<script setup lang="ts">

const { t } = useLocale()
const { width } = useWindowSize()

const { textInclude } = useUi()
const { open } = useEyeDropper()
const { copy, copied, isSupported } = useClipboard()
const { notification } = useDeviceSeparator()

useHead({
  title: t('pageTitle.colorsTranslate'),
  meta: [
    { property: 'description', content: t('openGraph.colorsTranslateDesc') },
    { property: 'og:title', content: t('openGraph.dewdew', { text: t('pageTitle.colorsTranslate') }) },
    { property: 'og:url', content: 'https://www.dewdew.kr/projects/colorTranslate/' },
    { property: 'og:description', content: t('openGraph.colorsTranslateDesc') }
  ]
})

const formData = reactive({
  initColor: '',
  backgroundColor: '',
  hexColor: '',
  rgbColor: '',
  hslColor: '',
  cmykColor: ''
})

watch(() => copied.value, () => {
  if (copied.value) {
    notification(width.value, t('messages.copy'), '', 'success', false, true, 1500, 80)
  }
})

watch(() => formData.hexColor, () => {
  if (['rgb', 'hls', 'cmyk'].some(colorFormat => textInclude(formData.hexColor, colorFormat))) {
    formData.hexColor = ''
    return
  }
  console.log(formData.hexColor)
  if (!formData.hexColor.startsWith('#')) {
    formData.hexColor = '#'.concat(formData.hexColor)
  }
  if (formData.hexColor.length === 7) {
    formData.backgroundColor = `background: ${formData.hexColor}`
    hexToRgb(formData.hexColor)
    hexToHsl(formData.hexColor)
  }
}, { immediate: true })

const initColorData = () => {
  formData.initColor = (Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase())
  formData.backgroundColor = 'background: '.concat('#', String(formData.initColor))
  formData.hexColor = '#'.concat(String(formData.initColor))
}

const colorPicker = () => {
  open().then((res) => {
    if (res) { formData.hexColor = res.sRGBHex }
  })
}

const hexToRgb = (color:string) => {
  const initColor = color.split('#')[1].match(/.{1,2}/g)
  if (!initColor?.length) { return }
  const rgb = 'rgb('.concat(String(parseInt(initColor[0], 16)), ',', String(parseInt(initColor[1], 16)), ',', String(parseInt(initColor[2], 16)), ')')
  rgbToCmyk(parseInt(initColor[0], 16), parseInt(initColor[1], 16), parseInt(initColor[2], 16))
  formData.rgbColor = rgb
}

const hexToHsl = (color:string) => {
  const initColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
  if (!initColor?.length) { return }
  const red = parseInt(initColor[1], 16) / 255
  const green = parseInt(initColor[2], 16) / 255
  const blue = parseInt(initColor[3], 16) / 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)

  let h = (max + min) / 2
  let s = h
  let l = h

  if (max === min) {
    formData.hslColor = 'hsl('.concat('0, 0%,', String(l), '%)')
    return
  }

  const d = max - min
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  switch (max) {
    case red:
      h = (green - blue) / d + (green < blue ? 6 : 0)
      break
    case green:
      h = (blue - red) / d + 2
      break
    case blue:
      h = (red - green) / d + 4
      break
  }

  h /= 6
  s = s * 100
  s = Math.round(s)
  l = l * 100
  l = Math.round(l)
  h = Math.round(360 * h)
  formData.hslColor = 'hsl('.concat(String(h), ',', String(s), '%,', String(l), '%)')
}

const rgbToCmyk = (red:number, green:number, blue:number) => {
  let c = 1 - (red / 255)
  let m = 1 - (green / 255)
  let y = 1 - (blue / 255)
  let k = Math.min(c, Math.min(m, y))

  c = (c - k) / (1 - k)
  m = (m - k) / (1 - k)
  y = (y - k) / (1 - k)

  c = Math.round(c * 10000) / 100
  m = Math.round(m * 10000) / 100
  y = Math.round(y * 10000) / 100
  k = Math.round(k * 10000) / 100

  c = isNaN(c) ? 0 : c
  m = isNaN(m) ? 0 : m
  y = isNaN(y) ? 0 : y
  k = isNaN(k) ? 0 : k

  formData.cmykColor = 'cmyk('.concat(String(c), ',', String(m), ',', String(y), ',', String(k), ')')
}

initColorData()

</script>
