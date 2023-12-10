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
      @change="() => emits('update:title', copiedTitle)"
    />
    <el-text class="time flex flex-justify-end gap-10">
      {{ dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss') }}
    </el-text>
  </div>
</template>

<script setup lang="ts">

const dayjs = useDayjs()

const props = withDefaults(
  defineProps<{
    title: string,
    createdAt: string,
    editTrigger?: boolean
  }>(),
  {
    editTrigger: false
  }
)

const emits = defineEmits([
  'update:title'
])

const copiedTitle = ref(props.title)

</script>
