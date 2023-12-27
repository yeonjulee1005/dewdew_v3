<template>
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
        :draggable="false"
        @contextmenu.prevent
      />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">

const { isDesktop } = useDevice()

const { mainMenuData, socialMenuData } = useMenuStore()

</script>
