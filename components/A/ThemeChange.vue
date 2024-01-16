<template>
  <DDButton
    color="rose"
    variant="ghost"
    aria-label="theme"
    @click="isDark = !isDark"
  >
    <template #leading>
      <Icon
        :name="isDark ? 'line-md:moon-filled-loop' : 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'"
        :width="24"
        :height="24"
      />
    </template>
  </DDButton>
</template>

<script setup lang="ts">

const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    useFavicon(colorMode.value !== 'dark' ? 'favicon-32x32.png' : 'favicon-light-32x32.png')
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

</script>
