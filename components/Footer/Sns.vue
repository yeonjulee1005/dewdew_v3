<template>
  <div class="footer-sns-container flex flex-justify-center">
    <nuxt-link
      v-for="image in socialMenuData"
      :key="image.title"
      class="sns-links flex flex-justify-center"
      :to="image.url"
      target="_blank"
    >
      <nuxt-img
        :src="image.image_url"
        width="50"
        height="50"
        format="webp"
        loading="lazy"
        :alt="image.title"
        :draggable="false"
        @contextmenu.prevent
      />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">

const { socialMenuData } = storeToRefs(useMenuStore())

</script>
