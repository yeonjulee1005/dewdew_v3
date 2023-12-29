<template>
  <div class="like-button flex flex-justify-end flex-align-center">
    <AButton
      :custom-class="`fixed-like ${trigger ? 'fixed-like-on' : ''}`"
      round-button
      button-size="lg"
      use-leading
      icon-name="line-md:heart-filled"
      :button-color="activateLike ? 'rose' : 'violet'"
      @click:button="$emit('click-affix')"
    />
  </div>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    trigger: boolean,
    activateLike?: boolean
  }>(),
  {
    activateLike: false
  }
)

defineEmits([
  'click-affix'
])

</script>
