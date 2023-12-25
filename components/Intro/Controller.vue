<template>
  <div class="flex flex-justify-center flex-align-center gap-3">
    <DDButton
      color="violet"
      size="md"
      variant="solid"
      @click="navigateTo('/main')"
    >
      {{ $t('texts.enter') }}
    </DDButton>
    <AThemeChange />
  </div>
</template>
