<template>
  <div class="article-add-on flex flex-justify-end mt-default mb-default">
    <el-tag
      class="like"
      :size="tagSize"
      :effect="activateLike ? 'light' : 'plain'"
      @click="$emit('update-count')"
    >
      {{ `${data.like} ❤️` }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import type { EpPropMergeType } from 'element-plus/es/utils/vue/props/types'

withDefaults(
  defineProps<{
    articleId: string,
    tagSize?: EpPropMergeType<StringConstructor, '' | 'default' | 'large' | 'small', unknown>,
    data: SerializeObject,
    activateLike?: boolean
  }>(),
  {
    tagSize: 'large',
    activateLike: false
  }
)

defineEmits([
  'update-count'
])

</script>
