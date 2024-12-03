<template>
  <div class="footer-sns-container flex justify-center">
    <nuxt-link
      v-for="image in socialMenuData"
      :key="image.title"
      class="sns-links flex justify-center"
      :to="image.url"
      target="_blank"
    >
      <Icon
        :name="`line-md:${image.icon}`"
        :width="28"
        :height="28"
      />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const { socialMenuData } = storeToRefs(useMenuStore())
</script>
