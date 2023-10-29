<template>
  <div class="article-add-on flex flex-justify-end mt-default mb-default">
    <el-tag
      class="like"
      :effect="activateLike ? 'light' : 'plain'"
      @click="$emit('update-count')"
    >
      {{ `${data.like} ❤️` }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    articleId: string,
    data: SerializeObject,
    activateLike?: boolean
  }>(),
  {
    activateLike: false
  }
)

defineEmits([
  'update-count'
])

</script>
