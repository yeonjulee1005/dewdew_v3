<template>
  <DDButton
    color="orange"
    variant="ghost"
    aria-label="theme"
    @click="isDark = !isDark"
  >
    <template #leading>
      <Icon
        :name="isDark ? 'line-md:moon-filled-loop' : 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'"
        :width="isDesktop ? 24 : 20"
        :height="isDesktop ? 24 : 20"
      />
    </template>
  </DDButton>
</template>

<script setup lang="ts">

const { isDesktop } = useDevice()
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    useFavicon(colorMode.value !== 'dark' ? '/favicon-32x32.png' : '/favicon-light-32x32.png')
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

</script>
