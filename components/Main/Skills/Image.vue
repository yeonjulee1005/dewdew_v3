<template>
  <div
    class="skill-images"
    :class="{'activate': skillsBgTrigger}"
  >
    <nuxt-img
      v-for="image in skillsImage"
      :key="image.url"
      :class="image.title"
      :src="image.url"
      height="400"
      width="400"
      loading="lazy"
      format="webp"
      :alt="image.title"
      :draggable="false"
      @contextmenu.prevent
    />
  </div>
</template>

<script setup lang="ts">

const skillsBgTrigger = defineModel('skillsBgTrigger', {
  type: Boolean,
  default: false
})

const skillsImage = defineModel('skillsImage', {
  type: Array<SkillsImage>,
  default: []
})

</script>
