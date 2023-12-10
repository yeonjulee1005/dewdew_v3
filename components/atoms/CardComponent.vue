<template>
  <el-card class="tech-card">
    <div class="card-header flex flex-row flex-align-center">
      <el-text class="title">
        {{ cardItem.title }}
      </el-text>
      <el-tag
        class="like ml-default"
        type="success"
        effect="light"
      >
        {{ cardItem.like + ' ❤️' }}
      </el-tag>
    </div>
    <el-text
      class="desc"
      line-clamp="3"
    >
      {{ cardItem.raw_article }}
    </el-text>
  </el-card>
</template>

<script setup lang="ts">

defineProps<{
  cardItem: SerializeObject
}>()

</script>
