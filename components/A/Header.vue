<template>
  <div class="header flex flex-column flex-justify-center flex-align-center">
    <div class="header-container flex flex-align-center gap-20">
      <HeaderLogo />
      <div class="flex-auto" />
      <HeaderDesktopMenu />
      <AThemeChange />
      <ALanguageChange v-if="isDesktop" />
      <HeaderMobileMenu />
    </div>
    <LazyHeaderForecast
      v-if="isDesktop"
      class="forecast"
    />
  </div>
</template>

<script setup lang="ts">
const { isDesktop } = useDevice()
</script>
