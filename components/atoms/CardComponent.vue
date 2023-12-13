<template>
  <el-card class="tech-card">
    <div class="card-header flex flex-row flex-align-center gap-2">
      <span class="title">
        {{ cardItem.title }}
      </span>
      <DDBadge
        color="violet"
        variant="soft"
      >
        {{ cardItem.like + ' ❤️' }}
      </DDBadge>
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
