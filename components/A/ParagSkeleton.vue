<template>
  <div>
    <DDSkeleton
      v-if="pendingText"
      :class="skeletonClass"
      class="w-full"
    />
    <p
      v-else
      :class="paragraphClass"
    >
      {{ paragraphText }}
    </p>
  </div>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    pendingText?: boolean,
    paragraphText?: string,
    skeletonClass?: string,
    paragraphClass?: string
  }>(),
  {
    pendingText: true,
    paragraphText: '',
    skeletonClass: 'h-8',
    paragraphClass: ''
  }
)

</script>
