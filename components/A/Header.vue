<template>
  <div class="header flex flex-justify-center flex-align-center">
    <div class="header-container flex flex-align-center gap-20">
      <nuxt-link to="/main">
        <nuxt-img
          class="logo flex-fixed"
          :src="url('dewdew_logo.webp', 'assets', 'logo')"
          legacy-format="webp"
          loading="lazy"
          :width="isDesktop ? 160 : 100"
          :height="isDesktop ? 46 : 28"
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
          <span>
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
      <ALanguageChange />
      <AThemeChange />
      <DDButton
        v-if="!isDesktop"
        aria-label="mobile-menu"
        color="violet"
        size="sm"
        variant="ghost"
        @click="() => sideMenuTrigger = true"
      >
        <template #leading>
          <Icon
            name="line-md:close-to-menu-transition"
            :width="24"
            :height="24"
          />
        </template>
      </DDButton>
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
          <DDButton
            variant="ghost"
            color="violet"
            size="sm"
            @click="() => sideMenuTrigger = false"
          >
            <template #leading>
              <Icon
                name="line-md:menu-to-close-alt-transition"
                :width="24"
                :height="24"
              />
            </template>
          </DDButton>
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

const { mainMenuData, socialMenuData } = useMenuStore()
const { url } = useImageStorage()

const sideMenuTrigger = ref(false)

const clickLogo = () => {
  navigateTo('/main')
  sideMenuTrigger.value = false
}

</script>
