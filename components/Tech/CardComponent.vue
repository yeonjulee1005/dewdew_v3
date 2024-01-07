<template>
  <DDCard class="tech-card mt-6 mb-4">
    <template #header>
      <AParagSkeleton
        :pending-text="pendingData"
        :paragraph-text="cardItem.title"
        paragraph-class="title"
      />
      <TechAddOn
        add-on-class="tech-add-on flex flex-wrap flex-align-center flex-justify-end gap-2 mt-8"
        :article-id="cardItem.id"
        :data="cardItem"
        use-nuxt-time
        badge-size="xs"
        :estimate-read-time="estimateReadingTime(cardItem.desc)"
      />
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
