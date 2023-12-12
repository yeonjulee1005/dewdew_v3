<template>
  <div class="article-header flex flex-column flex-space-between gap-20">
    <nuxt-link
      class="route-back flex flex-row flex-align-center gap-20"
      to="/tech"
    >
      <Icon name="line-md:arrow-small-left" />
      <el-text
        class="ml-8"
        size="large"
      >
        {{ $t('archives.back') }}
      </el-text>
    </nuxt-link>
    <el-text
      v-if="!editTrigger"
      class="title"
    >
      {{ title }}
    </el-text>
    <el-input
      v-else
      v-model="copiedTitle"
      class="title"
      label="title"
      @change="() => $emit('update:title', copiedTitle)"
    />
    <ANuxtTime :date-time="createdAt" />
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    title?: string,
    createdAt?: string,
    editTrigger?: boolean
  }>(),
  {
    title: '',
    createdAt: '',
    editTrigger: false
  }
)

defineEmits([
  'update:title'
])

const copiedTitle = ref(props.title)

</script>
