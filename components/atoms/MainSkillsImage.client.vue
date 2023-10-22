<template>
  <div
    class="skill-images"
    :class="{'activate': skillsBgTrigger}"
  >
    <nuxt-img
      v-for="image in skillsImage"
      :key="image.index"
      :class="image.title"
      :src="image.url"
      height="400"
      width="400"
      loading="lazy"
      format="webp"
      :alt="image.title"
    />
  </div>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    skillsImage: SerializeObject[],
    skillsBgTrigger?: boolean
  }>(),
  {
    skillsBgTrigger: false
  }
)

</script>
