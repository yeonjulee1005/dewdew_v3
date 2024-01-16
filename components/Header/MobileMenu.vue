<template>
  <div>
    <DDButton
      v-if="!isDesktop"
      aria-label="mobile-menu"
      color="rose"
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
          :img-attrs="{ class: 'dewdew-logo' }"
          alt="logo"
          :draggable="false"
          @contextmenu.prevent
          @click="clickLogo"
        />
        <DDButton
          variant="ghost"
          color="rose"
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
        class="mobile-menu-links flex-align-center p-3"
        :to="menu.url"
        :aria-label="menu.title"
        @click="() => sideMenuTrigger = false"
      >
        <Icon :name="`line-md:${menu.icon}`" />
        <span class="ml-2">
          {{ menu.title }}
        </span>
      </nuxt-link>
      <nuxt-link
        v-for="(sns, index) in socialMenuData"
        v-show="index < 2"
        :key="index"
        class="sns flex flex-align-center gap-2 p-3"
        :to="sns.url"
        target="_blank"
        aria-label="github"
      >
        <Icon
          :name="`line-md:${sns.icon}`"
          :width="22"
          :height="22"
        />
        <span>
          {{ sns.title }}
        </span>
      </nuxt-link>
      <LazyHeaderForecast class="forecast m-3" />
    </DDSlideover>
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
