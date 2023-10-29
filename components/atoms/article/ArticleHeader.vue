<template>
  <div class="article-header flex flex-column flex-space-between gap-20">
    <nuxt-link
      class="route-back flex flex-row flex-align-center gap-20"
      to="/blog"
    >
      <Icon name="line-md:arrow-small-left" />
      <el-text class="ml-8" size="large">
        {{ $t('archives.back') }}
      </el-text>
    </nuxt-link>
    <el-text class="title">
      {{ data.title }}
    </el-text>
    <el-text class="time flex flex-justify-end gap-10">
      {{ data.createdAt }}
    </el-text>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  data: SerializeObject
}>()

</script>
