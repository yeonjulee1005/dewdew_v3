<template>
  <div class="header flex flex-column justify-center items-center">
    <div class="header-container flex items-center gap-3">
      <HeaderLogo />
      <div class="flex-auto" />
      <HeaderDesktopMenu v-if="isDesktop" />
      <ALanguageChange v-if="isDesktop" />
      <AThemeChange />
      <HeaderMobileMenu v-if="isMobileOrTablet" />
    </div>
    <LazyHeaderForecast
      v-if="isDesktop"
      class="forecast"
    />
  </div>
</template>

<script setup lang="ts">
const { isDesktop, isMobileOrTablet } = useDevice()
</script>
