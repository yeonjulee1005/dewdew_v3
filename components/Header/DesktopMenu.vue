<template>
  <div
    v-if="isDesktop"
    class="flex flex-fixed gap-40"
  >
    <nuxt-link
      v-for="(menu, index) in mainMenuData"
      v-show="index"
      :key="index"
      class="desktop-menu-links flex-align-center"
      :to="menu.url"
      :aria-label="menu.title"
    >
      <span class="text-rose-600 dark:text-rose-400">
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
        class="text-rose-600 dark:text-rose-400"
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
