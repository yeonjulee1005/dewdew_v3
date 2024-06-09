<template>
  <div class="footer-menu-container flex flex-justify-center">
    <nuxt-link
      v-for="menu in mainMenuData"
      :key="menu.title"
      class="footer-links"
      :to="menu.url"
    >
      {{ menu.title }}
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const { mainMenuData } = storeToRefs(useMenuStore())
</script>
