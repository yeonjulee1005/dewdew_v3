<template>
  <span
    class="scroll-down"
    :class="{'activate': scrollDownTrigger}"
  >
    {{ $t('main.intro.scroll') }}
  </span>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    scrollDownTrigger?: boolean
  }>(),
  {
    scrollDownTrigger: false
  }
)

</script>
