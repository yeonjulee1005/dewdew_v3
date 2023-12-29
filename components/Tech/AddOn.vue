<template>
  <div class="article-add-on flex flex-justify-end mb-default space-x-4">
    <AButton
      :button-color="badgeColor(data.like)"
      button-variant="outline"
      use-leading
      icon-name="line-md:heart"
      :button-text="data.like"
      @click="$emit('update-count')"
    />
    <DDBadge
      class="flex gap-2"
      :color="badgeColor(data.view_count ?? 0)"
      size="md"
      variant="soft"
    >
      <Icon
        name="line-md:watch-loop"
        :width="22"
        :height="22"
      />
      <span>
        {{ (data.view_count ?? 0) }}
      </span>
    </DDBadge>
    <DDBadge
      class="flex gap-1"
      color="rose"
      size="md"
      variant="outline"
    >
      <Icon
        name="line-md:text-box-multiple-twotone-to-text-box-twotone-transition"
        :width="22"
        :height="22"
      />
      <span>
        {{ $t('tech.estimateReadTime', { time: estimateReadTime }) }}
      </span>
    </DDBadge>
  </div>
</template>

<script setup lang="ts">

const { badgeColor } = useUi()

withDefaults(
  defineProps<{
    articleId: string,
    data: SerializeObject,
    estimateReadTime?: number,
    activateLike?: boolean
  }>(),
  {
    estimateReadTime: 0,
    activateLike: false
  }
)

defineEmits([
  'update-count'
])

</script>
