<template>
  <div class="flex justify-center items-center gap-3">
    <DDButton
      color="orange"
      size="md"
      variant="solid"
      @click="navigateTo('/main')"
    >
      {{ $t('texts.enter') }}
    </DDButton>
    <AThemeChange />
  </div>
</template>
