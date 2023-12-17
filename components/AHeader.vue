<template>
  <div class="header flex flex-justify-center flex-align-center">
    <div class="header-container flex flex-align-center gap-20">
      <nuxt-link to="/">
        <nuxt-img
          class="logo flex-fixed"
          :src="url('dewdew_logo.webp', 'assets', 'logo')"
          legacy-format="webp"
          loading="lazy"
          :img-attrs="{class: 'dewdew-logo'}"
          alt="logo"
        />
      </nuxt-link>
      <div class="flex-auto" />
      <div
        v-if="isDesktop"
        class="desktop-menu flex flex-fixed gap-40"
      >
        <nuxt-link
          v-for="(menu, index) in mainMenuData"
          :key="index"
          class="menu-links flex-align-center"
          :to="menu.url"
          :aria-label="menu.title"
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
          aria-label="github"
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
      <AButton
        aria-label="theme"
        button-variant="ghost"
        use-icon
        :icon-name="isDark ? 'line-md:moon-filled-loop' : 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'"
        :icon-size="24"
        @click:button="isDark = !isDark"
      />
      <AButton
        v-if="!isDesktop"
        aria-label="mobile-menu"
        button-variant="ghost"
        use-icon
        icon-name="line-md:close-to-menu-transition"
        :icon-size="24"
        @click:button="() => sideMenuTrigger = true"
      />
      <DDSlideover
        v-model="sideMenuTrigger"
        class="mobile-menu"
        label="side-menu"
      >
        <div class="flex flex-align-center flex-space-between p-5">
          <nuxt-img
            class="mobile-logo flex-fixed"
            :src="url('dewdew_logo.webp', 'assets', 'logo')"
            legacy-format="webp"
            loading="lazy"
            :img-attrs="{class: 'dewdew-logo'}"
            alt="logo"
            @click="clickLogo"
          />
          <AButton
            color="violet"
            button-variant="ghost"
            use-icon
            icon-name="line-md:menu-to-close-alt-transition"
            @click="sideMenuTrigger = false"
          />
        </div>
        <nuxt-link
          v-for="(menu, index) in mainMenuData"
          :key="index"
          class="mobile-menu-links flex-align-center p-5"
          :to="menu.url"
          :aria-label="menu.title"
          @click="() => sideMenuTrigger = false"
        >
          <Icon :name="`line-md:${menu.icon}`" />
          <span class="ml-2">
            {{ menu.title }}
          </span>
        </nuxt-link>
      </DDSlideover>
    </div>
  </div>
</template>

<script setup lang="ts">

const { isDesktop } = useDevice()
const colorMode = useColorMode()

const { t, locale, setLocale } = useLocale()
const { width } = useWindowSize()

const { mainMenuData, socialMenuData } = storeToRefs(useMenuStore())
const { url } = useImageStorage()

const desktopModeTrigger = computed(() => {
  return width.value > 999
})
const sideMenuTrigger = ref(false)

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
    useFavicon(colorMode.value !== 'dark' ? 'favicon-32x32.png' : 'favicon-light-32x32.png')
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const clickLogo = () => {
  navigateTo('/')
  sideMenuTrigger.value = false
}

</script>
