<template>
  <div class="article-add-on flex flex-justify-end mb-default space-x-4">
    <AButton
      :button-color="badgeColor(data.like)"
      button-variant="outline"
      :button-text="data.like + ' ❤️' "
      @click="$emit('update-count')"
    />
    <DDBadge
      :color="badgeColor(data.view_count ?? 0)"
      size="md"
      variant="soft"
    >
      {{ (data.view_count ?? 0) + ' 👀' }}
    </DDBadge>
  </div>
</template>

<script setup lang="ts">

const { badgeColor } = useUi()

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
