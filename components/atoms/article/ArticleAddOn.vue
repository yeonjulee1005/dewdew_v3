<template>
  <div class="article-add-on flex flex-justify-end mt-default mb-default">
    <DDBadge
      class="like"
      color="violet"
      variant="soft"
      size="lg"
      @click="$emit('update-count')"
    >
      {{ `${data.like} ❤️` }}
    </DDBadge>
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
