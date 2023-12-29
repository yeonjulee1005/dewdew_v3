<template>
  <div class="article-header flex flex-column flex-space-between gap-20 mb-default">
    <nuxt-link
      class="route-back flex flex-row flex-align-center gap-20"
      to="/tech"
    >
      <Icon name="line-md:arrow-small-left" />
      <span class="ml-8">
        {{ $t('archives.back') }}
      </span>
    </nuxt-link>
    <span
      v-if="!editTrigger"
      class="title"
    >
      {{ title }}
    </span>
    <DDInput
      v-else
      v-model="copiedTitle"
      color="violet"
      size="xl"
      aria-label="title"
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
