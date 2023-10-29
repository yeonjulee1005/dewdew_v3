<template>
  <div class="like-button flex flex-justify-end flex-align-center">
    <el-button
      class="fixed-like"
      :class="{'fixed-like-on': trigger}"
      circle
      size="large"
      :type="activateLike ? 'danger' : ''"
      @click="$emit('click-affix')"
    >
      {{ buttonText }}
    </el-button>
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
