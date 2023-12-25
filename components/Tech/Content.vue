<template>
  <div class="article-body gap-10">
    <div
      v-if="!editTrigger"
      v-dompurify-html="techBlogDetailData.desc"
    />
    <TiptapEditor
      v-else
      :text-data="techBlogDetailData.desc ?? ''"
      :text-limit="300000"
      full-option
      @update:model-value="(text:string, rawText:string) => $emit('update:article-content', text, rawText)"
    />
  </div>
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    techBlogDetailData: SerializeObject,
    editTrigger?: boolean
  }>(),
  {
    editTrigger: false
  }
)

defineEmits([
  'update:article-content'
])

</script>
