<template>
  <div
    class="skill-images"
    :class="{'activate': skillsBgTrigger}"
  >
    <nuxt-img
      v-for="image in stackLogoData"
      :key="image?.url ?? ''"
      :class="image.title"
      :src="image.url ?? ''"
      height="400"
      width="400"
      loading="lazy"
      format="webp"
      :alt="image.title ?? 'title'"
    />
  </div>
</template>

<script setup lang="ts">

const { stackLogoData } = storeToRefs(useStackStore())

withDefaults(
  defineProps<{
    skillsBgTrigger?: boolean
  }>(),
  {
    skillsBgTrigger: false
  }
)

</script>
