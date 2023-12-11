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
      <client-only>
        <el-select
          v-model="locale"
          class="select-language w-80"
          size="small"
          @change="(locale:string) => setLocaleCookie(locale)"
        >
          <el-option
            :label="$t('localeMenu.korean')"
            value="ko"
          />
          <el-option
            :label="$t('localeMenu.english')"
            value="en"
          />
        </el-select>
        <el-switch
          v-model="darkSwitch"
          class="dark-mode-switch flex-end"
          inline-prompt
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          name="theme-mode"
          label="color-mode"
        />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'

const { locale, setLocaleCookie } = useLocale()
const { width } = useWindowSize()

const darkModeTrigger = useDark()

const { mainMenuData, socialMenuData } = storeToRefs(useMenuStore())
const { url } = useImageStorage()

const darkSwitch = ref(false)

const desktopModeTrigger = computed(() => {
  return width.value > 999
})

watch(() => darkSwitch.value, (value) => {
  darkModeTrigger.value = value
}, { immediate: true })

</script>
