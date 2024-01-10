<template>
  <DDCard class="tech-card mt-6 mb-4">
    <template #header>
      <div class="flex flex-col gap-6">
        <AParagSkeleton
          :pending-text="pendingData"
          :paragraph-text="cardItem.title"
          paragraph-class="title"
        />
        <TechBadge
          :tags="cardItem.tags"
          badge-size="lg"
        />
        <TechAddOn
          add-on-class="tech-add-on flex flex-wrap flex-align-center flex-justify-end gap-4"
          :article-id="cardItem.id"
          :data="cardItem"
          tag-size="lg"
          use-nuxt-time
          :estimate-read-time="estimateReadingTime(cardItem.desc)"
        />
      </div>
    </template>
    <AParagSkeleton
      :pending-text="pendingData"
      :paragraph-text="cardItem.raw_article"
      skeleton-class="h-[100px]"
      paragraph-class="desc"
    />
  </DDCard>
</template>

<script setup lang="ts">

const { estimateReadingTime } = useUi()

withDefaults(
  defineProps<{
    cardItem: SerializeObject,
    pendingData?: boolean
  }>(),
  {
    pendingData: true
  }
)

</script>
