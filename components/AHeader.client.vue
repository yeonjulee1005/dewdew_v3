<template>
  <div class="header flex flex-justify-center flex-align-center">
    <div class="header-container flex flex-align-center gap-20">
      <nuxt-link to="/">
        <nuxt-picture
          class="logo flex-fixed"
          :src="url('dewdew_logo.webp', 'assets', 'logo')"
          height="46"
          width="160"
          legacy-format="webp"
          loading="lazy"
          :img-attrs="{class: 'dewdew-logo'}"
          alt="logo"
        />
      </nuxt-link>
      <div class="flex-auto" />
      <div
        class="desktop-menu flex flex-fixed gap-40"
        :class="{'float-mobile-menu flex flex-column': !desktopModeTrigger}"
      >
        <nuxt-link
          v-for="(menu, index) in mainMenuData"
          :key="index"
          class="menu-links flex-align-center"
          :class="{'mobile-menu-links flex flex-justify-center': !desktopModeTrigger}"
          :to="menu.url"
          alt="menu"
        >
          <Icon
            v-if="!desktopModeTrigger"
            :name="`line-md:${menu.icon}`"
          />
          <span v-if="desktopModeTrigger">
            {{ menu.title }}
          </span>
        </nuxt-link>
        <nuxt-link
          v-if="socialMenuData"
          class="github"
          :to="socialMenuData[0].url"
          target="_blank"
          alt="github"
        >
          <nuxt-img
            :src="socialMenuData[0].image_url"
            width="50"
            height="50"
            format="webp"
            loading="lazy"
            :alt="socialMenuData[0].title"
          />
        </nuxt-link>
      </div>
      <DDSelectMenu
        v-model="selectLocale"
        color="violet"
        size="sm"
        variant="outline"
        :options="locales"
        value-attribute="value"
        option-attribute="label"
      >
        <template #label>
          <Icon
            :name="selectLocale === 'ko' ? 'circle-flags:kr' : 'circle-flags:us'"
            :width="24"
            :height="24"
          />
          {{ selectLocale }}
        </template>
      </DDSelectMenu>
      <DDButton
        class="mr-20"
        color="violet"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      >
        <template #leading>
          <Icon
            :name="isDark ? 'line-md:moon-filled-loop' : 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'"
            :width="24"
            :height="24"
          />
        </template>
      </DDButton>
    </div>
  </div>
</template>

<script setup lang="ts">

const colorMode = useColorMode()

const { t, locale, setLocale } = useLocale()
const { width } = useWindowSize()

const { mainMenuData, socialMenuData } = storeToRefs(useMenuStore())
const { url } = useImageStorage()

const desktopModeTrigger = computed(() => {
  return width.value > 999
})

const locales = [
  { label: t('localeMenu.korean'), value: 'ko' },
  { label: t('localeMenu.english'), value: 'en' }
]

const selectLocale = computed({
  get () {
    return locale.value
  },
  set (value) {
    setLocale(value)
  }
})

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    useFavicon(colorMode.value === 'dark' ? 'favicon_black.png' : 'favicon_white.png')
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

</script>
