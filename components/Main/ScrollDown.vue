<template>
  <span
    class="scroll-down"
    :class="{'activate': scrollDownTrigger}"
  >
    {{ $t('main.intro.scroll') }}
  </span>
</template>

<script setup lang="ts">

const scrollDownTrigger = defineModel('scrollDownTrigger', {
  type: Boolean,
  default: false
})

</script>
