<template>
  <div class="like-button flex flex-justify-end flex-align-center">
    <AButton
      :custom-class="`fixed-like ${trigger ? 'fixed-like-on' : ''}`"
      round-button
      button-size="lg"
      :button-color="activateLike ? 'rose' : 'violet'"
      :button-text="buttonText"
      @click:button="$emit('click-affix')"
    />
  </div>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    trigger: boolean,
    buttonText?: string,
    activateLike?: boolean
  }>(),
  {
    buttonText: '❤️',
    activateLike: false
  }
)

defineEmits([
  'click-affix'
])

</script>
