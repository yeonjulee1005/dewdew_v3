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
          v-for="(menu, index) in menuData"
          :key="index"
          class="menu-links"
          :class="{'mobile-menu-links flex flex-justify-center': !desktopModeTrigger}"
          :to="menu.url"
        >
          <Icon
            v-if="!desktopModeTrigger"
            :name="`ep:${menu.icon}`"
          />
          <span v-if="desktopModeTrigger">
            {{ menu.title }}
          </span>
        </nuxt-link>
        <nuxt-link
          class="github"
          :to="socialMenuData[0].url"
          target="_blank"
        >
          <nuxt-img
            :src="socialMenuData[0].imageUrl"
            width="50"
            height="50"
            format="webp"
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
          <el-option :label="$t('localeMenu.korean')" value="ko" />
          <el-option :label="$t('localeMenu.english')" value="en" />
        </el-select>
        <el-switch
          v-model="darkModeTrigger"
          class="dark-mode-switch flex-end"
          inline-prompt
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          name="theme-mode"
        />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'

const { locale, setLocaleCookie } = useLocale()
const { width } = useWindowSize()

const { url } = useImageStorage()
const darkModeTrigger = useDark()

const { mainMenuData, socialMenuData } = useMenuStore()

const menuData = ref<Menu[]>([])
const desktopModeTrigger = computed(() => { return !(width.value < 1000) })
const iconList = reactive<IndexSignature>({
  Home: 'home-filled',
  Blog: 'notebook',
  Projects: 'opportunity',
  Archives: 'picture-filled'
})

const addMenuIcon = () => {
  mainMenuData.map((menu:Menu) =>
    menuData.value.push({
      ...menu,
      icon: iconList[menu.title]
    })
  )
}

console.log(mainMenuData)

addMenuIcon()

</script>
