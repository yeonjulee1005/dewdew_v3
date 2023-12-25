<template>
  <span
    class="scroll-down"
    :class="{'activate': scrollDownTrigger}"
  >
    {{ locale === 'ko' ? mainScrollText?.textTitle.ko : mainScrollText?.textTitle.en }}
  </span>
</template>

<script setup lang="ts">

const { locale } = useLocale()

withDefaults(
  defineProps<{
    mainScrollText: SerializeObject,
    scrollDownTrigger?: boolean
  }>(),
  {
    scrollDownTrigger: false
  }
)

</script>
