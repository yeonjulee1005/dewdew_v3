<template>
  <div
    v-if="isDesktop"
    class="desktop-menu flex flex-fixed gap-40"
  >
    <nuxt-link
      v-for="(menu, index) in mainMenuData"
      v-show="index"
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
      class="sns flex flex-align-center flex-justify-center"
      :to="socialMenuData[0].url"
      target="_blank"
      aria-label="github"
    >
      <Icon
        :name="`line-md:${socialMenuData[0].icon}`"
        :width="28"
        :height="28"
      />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">

const { isDesktop } = useDevice()

const { mainMenuData, socialMenuData } = useMenuStore()

</script>
