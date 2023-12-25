<template>
  <DDCard class="tech-card">
    <template #header>
      <div class="card-title flex flex-row flex-align-center gap-8">
        <span class="title">
          {{ cardItem.title }}
        </span>
      </div>
      <div class="card-sub-head flex flex-justify-end mt-2 space-x-2">
        <DDBadge
          :color="badgeColor(cardItem.like)"
          size="md"
          variant="soft"
        >
          {{ cardItem.like + ' ❤️' }}
        </DDBadge>
        <DDBadge
          :color="badgeColor(cardItem.view_count ?? 0)"
          size="md"
          variant="soft"
        >
          {{ (cardItem.view_count ?? 0) + ' 👀' }}
        </DDBadge>
      </div>
    </template>
    <div class="desc">
      {{ cardItem.raw_article }}
    </div>
  </DDCard>
</template>

<script setup lang="ts">

const { badgeColor } = useUi()

defineProps<{
  cardItem: SerializeObject
}>()

</script>
