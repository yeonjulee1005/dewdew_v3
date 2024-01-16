<template>
  <div class="article-header flex flex-column flex-space-between gap-6 mb-default">
    <AButton
      custom-class="w-[fit-content]"
      button-size="lg"
      use-leading
      icon-name="line-md:arrow-small-left"
      :button-text="$t('archives.back')"
      @click:button="router.back()"
    />
    <p
      v-if="!editTrigger"
      class="title"
    >
      {{ title }}
    </p>
    <TechBadge
      v-if="!editTrigger"
      :tags="tags"
    />
    <DDInput
      v-if="editTrigger"
      v-model="copiedTitle"
      color="rose"
      size="xl"
      aria-label="title"
      @change="() => $emit('update:title', copiedTitle)"
    />
    <DDInput
      v-if="editTrigger"
      v-model="copiedTags"
      color="rose"
      size="xl"
      aria-label="title"
      @change="() => $emit('update:tags', copiedTags)"
    />
    <ANuxtTime :date-time="createdAt" />
  </div>
</template>

<script setup lang="ts">

const router = useRouter()

const props = withDefaults(
  defineProps<{
    title?: string,
    tags?: string,
    createdAt?: string,
    editTrigger?: boolean
  }>(),
  {
    title: '',
    tags: '',
    createdAt: '',
    editTrigger: false
  }
)

defineEmits([
  'update:title',
  'update:tags'
])

const copiedTitle = ref(props.title)
const copiedTags = ref(props.tags)

</script>
