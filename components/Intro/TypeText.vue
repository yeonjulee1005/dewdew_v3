<template>
  <div class="title flex flex-column flex-align-center">
    <span id="hello-intro-title" />
  </div>
</template>

<script setup lang="ts">

import TypeIt from 'typeit'

const { typeHello } = useHelloData()

const typeItHello = () => {
  if (process.client) {
    new TypeIt('#hello-intro-title', {
      strings: typeHello,
      lifeLike: true,
      deleteSpeed: 100,
      loop: true
    }).go()
  }
}

onMounted(() => {
  typeItHello()
})

</script>
