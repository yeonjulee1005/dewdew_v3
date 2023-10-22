<template>
  <div class="not-found">
    <div class="desc abs-middle">
      <h1> {{ staticTexts.title }} </h1>
      <p> {{ staticTexts.description }} </p>
      <nuxt-link to="/">
        {{ staticTexts.button }}
      </nuxt-link>
    </div>
    <div class="page-404">
      {{ staticTexts.largeText }}
    </div>
  </div>
</template>

<script setup lang="ts">

const staticTexts = reactive({
  title: 'Not Found!',
  description: '페이지를 찾을 수 없어요:(',
  button: 'Home',
  largeText: '404'
})

</script>
