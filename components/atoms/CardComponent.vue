<template>
  <el-card class="tech-card">
    <div class="card-header flex flex-row flex-align-center">
      <span class="title">
        {{ cardItem.title }}
      </span>
      <el-tag
        class="like ml-default"
        type="success"
        effect="light"
      >
        {{ cardItem.like + ' ❤️' }}
      </el-tag>
    </div>
    <div class="desc mt-default">
      {{ cardItem.raw_article }}
    </div>
  </el-card>
</template>

<script setup lang="ts">

defineProps<{
  cardItem: SerializeObject
}>()

</script>
