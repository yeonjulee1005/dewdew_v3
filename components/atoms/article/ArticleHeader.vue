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
      @change="() => emits('update:title', copiedTitle)"
    />
    <NuxtTime
      :datetime="createdAt"
      :locale="locale"
      class="time flex flex-justify-end"
      year="numeric"
      month="long"
      day="numeric"
      hour="numeric"
      minute="numeric"
      second="numeric"
    />
  </div>
</template>

<script setup lang="ts">

const { locale } = useLocale()

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

const emits = defineEmits([
  'update:title'
])

const copiedTitle = ref(props.title)

</script>
