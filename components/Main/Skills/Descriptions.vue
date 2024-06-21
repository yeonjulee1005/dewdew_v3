<template>
  <div
    class="skills-descriptions flex flex-column"
    :class="{ activate: skillsTextTrigger, reverse: toggleTrigger }"
    @click="() => toggleTrigger = !toggleTrigger"
  >
    <p
      v-for="(title, index) in toggleTrigger ? $tm('main.skills.frontDescription.title') : $tm('main.skills.backDescription.title')"
      :key="index"
      class="skills-title"
    >
      {{ $rt(title) }}
    </p>
    <p
      v-for="(first, index) in toggleTrigger ? $tm('main.skills.frontDescription.first') : $tm('main.skills.backDescription.first')"
      :key="index"
      class="skills-text"
    >
      {{ $rt(first) }}
    </p>
    <p
      v-for="(second, index) in toggleTrigger ? $tm('main.skills.frontDescription.second') : $tm('main.skills.backDescription.second')"
      :key="index"
      class="skills-text"
    >
      {{ $rt(second) }}
    </p>
    <p
      v-for="(third, index) in toggleTrigger ? $tm('main.skills.frontDescription.third') : $tm('main.skills.backDescription.third')"
      :key="index"
      class="skills-text"
    >
      {{ $rt(third) }}
    </p>
    <div
      class="skills-title-box flex flex-column justify-end items-end"
      :class="{ reverse: toggleTrigger }"
    >
      <Icon
        class="reverse-icon"
        name="line-md:round-360"
        :width="30"
        :height="30"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const skillsTextTrigger = defineModel('skillsTextTrigger', {
  type: Boolean,
  default: false,
})

const toggleTrigger = ref(true)
</script>
