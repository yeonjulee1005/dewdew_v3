<template>
  <nuxt-link to="/main">
    <nuxt-img
      class="logo flex-fixed"
      :src="url('dewdew_logo.webp', 'assets', 'logo')"
      legacy-format="webp"
      loading="lazy"
      :width="isDesktop ? 160 : 100"
      :height="isDesktop ? 46 : 28"
      :img-attrs="{ class: 'dewdew-logo' }"
      alt="logo"
    />
  </nuxt-link>
</template>

<script setup lang="ts">

const { isDesktop } = useDevice()
const { url } = useImageStorage()

</script>
